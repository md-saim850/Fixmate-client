
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getToken } from "@/lib/getToken";

export async function POST(request: Request) {
try {
    console.log("=== DEBUG ===");
    console.log("Method:", request.method);
    console.log("Content-Type:", request.headers.get("content-type"));
    console.log("Content-Length:", request.headers.get("content-length"));

    // Read as text first (safer)
    const text = await request.text();
    console.log("Raw body text:", text);          // ← this will show if body is empty

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

    console.log(booking);

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

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "bdt",
            product_data: {
              name: "FixMate Service Booking",
              description: `Booking ID: ${bookingId}`,
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],

      mode: "payment",

      metadata: {
        bookingId: bookingId,
      },

      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${origin}/checkout?bookingId=${bookingId}&canceled=true`,
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
