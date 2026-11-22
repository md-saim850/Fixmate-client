import Link from "next/link";
import {
  Search,
  ClipboardList,
  Wrench,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
const steps = [
  {
    icon: Search,
    title: "Discover",
    text: "Search repair services by device, category, price, or service mode.",
  },
  {
    icon: ClipboardList,
    title: "Request",
    text: "Share your issue, contact details, address, and preferred date.",
  },
  {
    icon: Wrench,
    title: "Repair",
    text: "Your technician accepts the request and keeps the job status updated.",
  },
  {
    icon: CreditCard,
    title: "Pay after completion",
    text: "Pay securely through Stripe only after the repair is marked complete.",
  },
];
export default function AboutPage() {
  return (
    <section className="container-shell py-16">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-xs font-bold text-green-800">
          <ShieldCheck size={15} /> Trust built into every step
        </span>
        <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
          Repair service, without the guesswork.
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          FixMate connects customers with technicians and makes the repair
          journey transparent—from the first request to the final payment.
        </p>
      </div>
      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ icon: Icon, title, text }, i) => (
          <article
            key={title}
            className="rounded-2xl border border-slate-200 p-6"
          >
            <span className="grid size-12 place-items-center rounded-xl bg-green-50 text-green-700">
              <Icon />
            </span>
            <p className="mt-6 text-xs font-black text-green-600">
              STEP 0{i + 1}
            </p>
            <h2 className="mt-2 text-lg font-bold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
          </article>
        ))}
      </div>
      <div className="mt-16 rounded-3xl bg-green-900 px-8 py-10 text-center text-white">
        <h2 className="text-3xl font-black">Ready to get it fixed?</h2>
        <p className="mt-3 text-green-100">
          Explore services from technicians in your area.
        </p>
        <Link
          href="/services"
          className="mt-6 inline-block rounded-xl bg-white px-6 py-3 font-bold text-green-900"
        >
          Browse services
        </Link>
      </div>
    </section>
  );
}
