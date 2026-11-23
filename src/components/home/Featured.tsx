import Link from "next/link";
import { ArrowRight, ClipboardCheck } from "lucide-react";
import { ServiceCard, type Service } from "@/components/home/service-card";

async function getFeatured(): Promise<Service[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api"}/services?limit=6&sort=newest`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.services ?? [];
  } catch {
    return [];
  }
}

export default async function Featured() {
  const services = await getFeatured();

  return (
    <section className="bg-slate-50 py-20">
      <div className="container-shell">

        <div className="mb-9 flex items-end justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-green-700">
              Handpicked help
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Featured repair services
            </h2>
          </div>
          <Link href="/services" className="text-sm font-bold text-green-700">
            Browse all <ArrowRight className="ml-1 inline" size={16} />
          </Link>
        </div>

        {services.length ? (

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>

        ) : (

          <div className="rounded-2xl border border-dashed border-green-200 bg-white p-12 text-center">
            <ClipboardCheck className="mx-auto text-green-600" size={32} />

            <h3 className="mt-4 text-lg font-bold">
              New services are on the way
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Browse the service directory or check back soon.
            </p>

            <Link
              href="/services"
              className="mt-5 inline-flex rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white"
            >
              Explore services
            </Link>

          </div>
        )}
      </div>
    </section>
  );
}
