import { ServiceCard, type Service } from "@/components/home/service-card";
import { Search } from "lucide-react";

type Props = {searchParams: Promise<{
    q?: string;
    category?: string;
    mode?: string;
    sort?: string;
  }>;
};

const categories = [
  "Smartphone",
  "Laptop & PC",
  "AC",
  "Refrigerator",
  "TV",
  "Washing Machine",
  "Electrical",
];

async function getServices(params: Record<string, string>) {

  const query = new URLSearchParams(params);

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services?${query}`,
      { cache: "no-store" },
    );

    if (!response.ok) return [];
    return ((await response.json()).services ?? []) as Service[];
    
  } catch {
    return [];

  }
}

export default async function ServicesPage({ searchParams }: Props) {

  const params = await searchParams;

  const services = await getServices({
    q: params.q ?? "",
    category: params.category ?? "",
    mode: params.mode ?? "",
    sort: params.sort ?? "newest",
  });

  return (
    <section className="container-shell min-h-[70vh] py-14">

      <div className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-widest text-green-700">
          The service directory
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">
          Find the right repair expert.
        </h1>
        <p className="mt-3 leading-7 text-slate-600">
          Browse approved services from technicians serving your area.
        </p>
      </div>

      <form className="mt-9 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
        <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3">
          <Search className="text-slate-400" size={18} />
          <input
            name="q"
            defaultValue={params.q}
            placeholder="Search repairs..."
            className="min-w-0 flex-1 py-3 text-sm outline-none"
          />
        </label>

        <select
          name="category"
          defaultValue={params.category ?? ""}
          className="rounded-xl border border-slate-200 px-3 py-3 text-sm"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          name="mode"
          defaultValue={params.mode ?? ""}
          className="rounded-xl border border-slate-200 px-3 py-3 text-sm"
        >
          <option value="">Any service mode</option>
          <option>Home Visit</option>
          <option>Shop Drop-off</option>
        </select>

        <select
          name="sort"
          defaultValue={params.sort ?? "newest"}
          className="rounded-xl border border-slate-200 px-3 py-3 text-sm"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>

        <button className="rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white hover:bg-green-700">
          Search
        </button>
      </form>

      <div className="mb-5 mt-8 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {services.length} services found
        </p>

        <p className="text-xs text-slate-400">
          Results are filtered on the server
        </p>
      </div>

      {services.length ? (

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>

      ) : (

        <div className="rounded-2xl border border-dashed border-slate-300 py-20 text-center">
          <span className="text-4xl">🔎</span>

          <h2 className="mt-4 text-xl font-bold">No matching services yet</h2>

          <p className="mt-2 text-sm text-slate-500">
            Try another keyword or clear your filters.
          </p>

          <a
            href="/services"
            className="mt-5 inline-block rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white"
          >
            Clear filters
          </a>
        </div>

      )}
    </section>
  );
}
