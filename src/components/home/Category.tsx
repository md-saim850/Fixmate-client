import Link from "next/link";
import {
  ArrowRight,
  Smartphone,
  Laptop,
  Snowflake,
  Refrigerator,
  Tv,
  WashingMachine,
  Zap,
} from "lucide-react";

const categories = [
  { name: "Smartphone", icon: Smartphone },
  { name: "Laptop & PC", icon: Laptop },
  { name: "AC", icon: Snowflake },
  { name: "Refrigerator", icon: Refrigerator },
  { name: "TV", icon: Tv },
  { name: "Washing Machine", icon: WashingMachine },
  { name: "Electrical", icon: Zap },
];

export default function Category() {
  return (
    <section className="container-shell section-space">

      <div className="mb-9 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-green-700">
            Browse by category
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            What needs fixing?
          </h2>
        </div>

        <Link
          href="/services"
          className="hidden text-sm font-bold text-green-700 sm:block"
        >
          All services <ArrowRight className="ml-1 inline" size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {categories.map(({ name, icon: Icon }) => (
          <Link
            key={name}
            href={`/services?category=${encodeURIComponent(name)}`}
            className="group rounded-2xl border border-slate-200 p-4 text-center transition hover:border-green-300 hover:bg-green-50"
          >
            <span className="mx-auto grid size-12 place-items-center rounded-xl bg-green-50 text-green-700 group-hover:bg-white">
              <Icon size={22} />
            </span>

            <span className="mt-3 block text-xs font-bold text-slate-700">
              {name}
            </span>
            
          </Link>
        ))}
      </div>

    </section>
  );
}
