
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ServiceGallery } from "@/components/services/ServiceGallery";
import { ServiceInfo } from "@/components/services/ServiceInfo";
import { BookingCard } from "@/components/services/BookingCard";
import { TechnicianCard } from "@/components/services/TechnicianCard";
import { ServiceFeatures } from "@/components/services/ServiceFeatures";

import { Service } from "@/types/service";

type Props = {
  params: Promise<{ id: string }>;
};

const getService = async (id: string): Promise<Service | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/${id}`,{
        cache: "no-store",
      }
    );

    if (!response.ok) return null;

    const data = await response.json();

    return data.service ?? null;
  } catch (error) {
    console.error("Failed to fetch service:", error);
    return null;
  }
};

export default async function ServiceDetailsPage({ params }: Props) {
  const { id } = await params;

  const service = await getService(id);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f8faf9]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/services"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-green-600"
        >
          <ArrowLeft size={17} />
          Back to services
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Main content */}
          <div className="min-w-0 space-y-8">
            <ServiceGallery
              image={service.image[0]}
              title={service.title}
            />

            <ServiceInfo service={service} />

            <div className="rounded-2xl border border-gray-100 bg-white p-6">
              <ServiceFeatures service={service} />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <BookingCard service={service} />
            <TechnicianCard technician={service.technician} />
          </aside>
        </div>
      </div>
    </main>
  );
}
