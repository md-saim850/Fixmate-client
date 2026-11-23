import React from "react";

const steps = [
  {
    n: "01",
    title: "Find a service",
    body: "Explore approved local repair specialists.",
  },
  {
    n: "02",
    title: "Send a request",
    body: "Tell us what is wrong and choose a date.",
  },
  {
    n: "03",
    title: "Get it fixed",
    body: "Follow each update as your technician works.",
  },
  {
    n: "04",
    title: "Pay after completion",
    body: "Review the final amount and pay securely.",
  },
];

export default function How_it_work() {
  return (
    <section className="container-shell section-space">

      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-green-700">
          Simple from start to finish
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-tight">
          A better way to get things working
        </h2>
        <p className="mt-3 text-slate-600">
          No uncertainty. Just a clear process and control over your repair.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <div
            key={step.n}
            className="rounded-2xl border border-slate-200 bg-white p-6"
          >
            <span className="text-sm font-black text-green-600">{step.n}</span>
            <h3 className="mt-5 font-bold text-slate-900">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">{step.body}</p>
          </div>
        ))}
      </div>
      
    </section>
  );
}
