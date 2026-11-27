export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getToken } from "@/lib/getToken";
import { getSession } from "@/lib/server";

export async function POST(request: Request) {
try {
    const text = await request.text();
    console.log("Raw body text:", text);

    if (!text) {
      return NextResponse.json(
        { error: "Empty request body" },
        { status: 400 }
      );
    }

    let body;
    try {
      body = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    console.log("Parsed body:", body);

    const { bookingId } = body;

    if (!bookingId) {
      return NextResponse.json(
        { error: "Booking ID is required", received: body },
        { status: 400 }
      );
    }

    // Fetch booking from your backend
    const token = await getToken();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookingId}`,
      {
        cache: "no-store",
        headers:{
          "Authorization": `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    const data = await response.json();
    const booking = data.booking;


    // Validate booking
    if (booking.status !== "completed") {
      return NextResponse.json(
        { error: "Booking is not completed" },
        { status: 400 }
      );
    }

    if (booking.paymentStatus === "paid") {
      return NextResponse.json(
        { error: "Booking already paid" },
        { status: 400 }
      );
    }

    const amount = Number(booking.finalAmount);

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid booking price" },
        { status: 400 }
      );
    }

    const headersList = await headers();
    const origin = headersList.get("origin");

    if (!origin) {
      throw new Error("Origin header missing");
    }

    const userSession = await getSession();

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: userSession?.user.email,

      line_items: [
        {
          price_data: {
            currency: "BDT",
            product_data: {
              name: "FixMate Service Payment",
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],

      metadata: {
        bookingId: bookingId.toString(),
        userId: userSession?.user.id as string,
      },

      success_url: `${process.env.CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/dashboard/customer/bookings`,
    });

    return NextResponse.json({
      url: session.url,
    });

  } catch (error) {
    console.error("Stripe checkout error:", error);

    return NextResponse.json(
      { error: "Unable to create checkout session" },
      { status: 500 }
    );
  }
}
