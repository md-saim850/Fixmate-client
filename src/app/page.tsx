import Link from 'next/link';
import { ArrowRight, ShieldCheck, Wallet, ClipboardCheck, Smartphone, Laptop, Snowflake, Refrigerator, Tv, WashingMachine, Zap } from 'lucide-react';
import { ServiceCard, type Service } from '@/components/service-card';

const categories = [
  { name: 'Smartphone', icon: Smartphone }, { name: 'Laptop & PC', icon: Laptop }, { name: 'AC', icon: Snowflake },
  { name: 'Refrigerator', icon: Refrigerator }, { name: 'TV', icon: Tv }, { name: 'Washing Machine', icon: WashingMachine }, { name: 'Electrical', icon: Zap }
];
const steps = [{ n: '01', title: 'Find a service', body: 'Explore approved local repair specialists.' }, { n: '02', title: 'Send a request', body: 'Tell us what is wrong and choose a date.' }, { n: '03', title: 'Get it fixed', body: 'Follow each update as your technician works.' }, { n: '04', title: 'Pay after completion', body: 'Review the final amount and pay securely.' }];

async function getFeatured(): Promise<Service[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api'}/services?limit=6&sort=newest`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.services ?? [];
  } catch { return []; }
}

export default async function HomePage() {
  const services = await getFeatured();
  return <>
    <section className="overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_#dcfce7,_transparent_48%),linear-gradient(120deg,#f0fdf4_0%,#ffffff_55%)]">
      <div className="container-shell grid min-h-[610px] items-center gap-12 py-16 lg:grid-cols-[1.05fr_.95fr]">
        <div><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[.14em] text-green-800"><ShieldCheck size={15}/> Repair support you can trust</div>
          <h1 className="max-w-2xl text-5xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-6xl">Broken device? <span className="text-green-600">We’ll make it right.</span></h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Find skilled local technicians for your devices and home appliances. Track every step, then pay only when the job is complete.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link href="/services" className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-green-600/20 hover:bg-green-700">Explore services <ArrowRight size={18}/></Link><Link href="/about" className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-bold text-slate-700 hover:border-green-300">How it works</Link></div>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-600"><span className="flex items-center gap-2"><ShieldCheck className="text-green-600" size={17}/> Reviewed service listings</span><span className="flex items-center gap-2"><Wallet className="text-green-600" size={17}/> Pay after the repair</span></div>
        </div>
        <div className="relative mx-auto w-full max-w-[540px]">
          <div className="absolute -inset-5 rounded-[2.5rem] bg-green-200/50 blur-2xl"/>
          <div className="relative rounded-[2rem] border border-white bg-white p-4 shadow-2xl shadow-green-900/10">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-green-700 to-green-950 p-8 text-white">
              <div className="flex items-center justify-between"><span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">Repair in progress</span><span className="text-sm text-green-100">#FM-2048</span></div>
              <div className="py-12 text-center"><div className="mx-auto grid size-28 place-items-center rounded-3xl border border-white/20 bg-white/10 text-6xl">🔧</div><h2 className="mt-6 text-2xl font-bold">Your repair, in safe hands.</h2><p className="mt-2 text-sm text-green-100">A clear update at every step.</p></div>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-semibold"><span className="rounded-lg bg-white/15 p-2">Requested</span><span className="rounded-lg bg-white/15 p-2">Accepted</span><span className="rounded-lg bg-white/15 p-2">In progress</span><span className="rounded-lg bg-white/10 p-2 text-green-200">Complete</span></div>
            </div>
            <div className="flex items-center justify-between px-3 py-4"><div><p className="text-xs text-slate-500">Payment protection</p><p className="mt-1 font-bold text-slate-900">Pay only when complete</p></div><div className="grid size-11 place-items-center rounded-xl bg-green-50 text-green-700"><ShieldCheck/></div></div>
          </div>
        </div>
      </div>
    </section>
    <section className="container-shell section-space">
      <div className="mb-9 flex items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-widest text-green-700">Browse by category</p><h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">What needs fixing?</h2></div><Link href="/services" className="hidden text-sm font-bold text-green-700 sm:block">All services <ArrowRight className="ml-1 inline" size={16}/></Link></div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">{categories.map(({name,icon:Icon})=><Link key={name} href={`/services?category=${encodeURIComponent(name)}`} className="group rounded-2xl border border-slate-200 p-4 text-center transition hover:border-green-300 hover:bg-green-50"><span className="mx-auto grid size-12 place-items-center rounded-xl bg-green-50 text-green-700 group-hover:bg-white"><Icon size={22}/></span><span className="mt-3 block text-xs font-bold text-slate-700">{name}</span></Link>)}</div>
    </section>
    <section className="bg-slate-50 py-20"><div className="container-shell"><div className="mb-9 flex items-end justify-between"><div><p className="text-sm font-bold uppercase tracking-widest text-green-700">Handpicked help</p><h2 className="mt-2 text-3xl font-black tracking-tight">Featured repair services</h2></div><Link href="/services" className="text-sm font-bold text-green-700">Browse all <ArrowRight className="ml-1 inline" size={16}/></Link></div>
      {services.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{services.map(service=><ServiceCard key={service._id} service={service}/>)}</div> : <div className="rounded-2xl border border-dashed border-green-200 bg-white p-12 text-center"><ClipboardCheck className="mx-auto text-green-600" size={32}/><h3 className="mt-4 text-lg font-bold">New services are on the way</h3><p className="mt-2 text-sm text-slate-500">Browse the service directory or check back soon.</p><Link href="/services" className="mt-5 inline-flex rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white">Explore services</Link></div>}
    </div></section>
    <section className="container-shell section-space"><div className="mx-auto max-w-2xl text-center"><p className="text-sm font-bold uppercase tracking-widest text-green-700">Simple from start to finish</p><h2 className="mt-2 text-3xl font-black tracking-tight">A better way to get things working</h2><p className="mt-3 text-slate-600">No uncertainty. Just a clear process and control over your repair.</p></div><div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{steps.map((step,i)=><div key={step.n} className="rounded-2xl border border-slate-200 bg-white p-6"><span className="text-sm font-black text-green-600">{step.n}</span><h3 className="mt-5 font-bold text-slate-900">{step.title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{step.body}</p></div>)}</div></section>
    <section className="container-shell pb-20"><div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-green-900 px-8 py-10 text-white sm:flex-row sm:items-center sm:px-12"><div><p className="text-sm font-bold text-green-200">Skilled with repairs?</p><h2 className="mt-2 text-3xl font-black">Grow your repair business with FixMate.</h2><p className="mt-2 text-sm text-green-100">Showcase your skills and manage every job in one place.</p></div><Link href="/sign-up" className="shrink-0 rounded-xl bg-white px-6 py-3.5 font-bold text-green-900 hover:bg-green-50">Join as a technician <ArrowRight className="ml-2 inline" size={17}/></Link></div></section>
  </>;
}
