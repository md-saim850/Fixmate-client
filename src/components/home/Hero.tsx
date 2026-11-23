import Link from "next/link";
import { ArrowRight, ShieldCheck, Wallet } from "lucide-react";

export default function Hero() {
  return (
    <section className="overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_#dcfce7,_transparent_48%),linear-gradient(120deg,#f0fdf4_0%,#ffffff_55%)]">
      
      <div className="container-shell grid min-h-[610px] items-center gap-12 py-16 lg:grid-cols-[1.05fr_.95fr]">
        
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[.14em] text-green-800">
            <ShieldCheck size={15} /> Repair support you can trust
          </div>

          <h1 className="max-w-2xl text-5xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-6xl">
            Broken device?{" "}
            <span className="text-green-600">We’ll make it right.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Find skilled local technicians for your devices and home appliances.
            Track every step, then pay only when the job is complete.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-green-600/20 hover:bg-green-700"
            >
              Explore services <ArrowRight size={18} />
            </Link>
            <Link
              href="/about"
              className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-bold text-slate-700 hover:border-green-300"
            >
              How it works
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <ShieldCheck className="text-green-600" size={17} /> Reviewed
              service listings
            </span>
            <span className="flex items-center gap-2">
              <Wallet className="text-green-600" size={17} /> Pay after the
              repair
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[540px]">
          
          <div className="absolute -inset-5 rounded-[2.5rem] bg-green-200/50 blur-2xl" />
          
          <div className="relative rounded-[2rem] border border-white bg-white p-4 shadow-2xl shadow-green-900/10">
            
            <div className="rounded-[1.5rem] bg-gradient-to-br from-green-700 to-green-950 p-8 text-white">
              
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                  Repair in progress
                </span>
                <span className="text-sm text-green-100">#FM-2048</span>
              </div>

              <div className="py-12 text-center">
                <div className="mx-auto grid size-28 place-items-center rounded-3xl border border-white/20 bg-white/10 text-6xl">
                  🔧
                </div>
                <h2 className="mt-6 text-2xl font-bold">
                  Your repair, in safe hands.
                </h2>
                <p className="mt-2 text-sm text-green-100">
                  A clear update at every step.
                </p>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-semibold">
                <span className="rounded-lg bg-white/15 p-2">Requested</span>
                <span className="rounded-lg bg-white/15 p-2">Accepted</span>
                <span className="rounded-lg bg-white/15 p-2">In progress</span>
                <span className="rounded-lg bg-white/10 p-2 text-green-200">
                  Complete
                </span>
              </div>

            </div>

            <div className="flex items-center justify-between px-3 py-4">
              <div>
                <p className="text-xs text-slate-500">Payment protection</p>
                <p className="mt-1 font-bold text-slate-900">
                  Pay only when complete
                </p>
              </div>
              <div className="grid size-11 place-items-center rounded-xl bg-green-50 text-green-700">
                <ShieldCheck />
              </div>
            </div>
            
          </div>

        </div>

      </div>

    </section>
  );
}
