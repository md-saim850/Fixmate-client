import Link from 'next/link';
import { MapPin, Clock3, ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export type Service = {
  _id: string; title: string; category: string; description?: string; image?: string;
  basePrice: number; estimatedDuration?: string; serviceMode: string; serviceArea: string; technicianName: string;
};

export function ServiceCard({ service }: { service: Service }) {
  return <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-soft">
    <div className="relative aspect-[16/10] overflow-hidden bg-green-50">
      {service.image ? <img src={service.image} alt={service.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/> : <div className="grid h-full place-items-center text-green-700"><span className="text-5xl">🛠️</span></div>}
      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-green-800">{service.category}</span>
    </div>
    <div className="flex flex-1 flex-col p-5">
      <div className="flex items-start justify-between gap-3"><h3 className="font-bold leading-6 text-slate-900">{service.title}</h3><span className="shrink-0 text-sm font-extrabold text-green-700">{formatCurrency(service.basePrice)}</span></div>
      <div className="mt-3 grid gap-2 text-xs text-slate-500"><span className="flex items-center gap-2"><MapPin size={14}/>{service.serviceArea}</span><span className="flex items-center gap-2"><Clock3 size={14}/>{service.estimatedDuration || 'Duration confirmed after inspection'} · {service.serviceMode}</span></div>
      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 mt-5"><span className="text-xs text-slate-500">By <strong className="text-slate-700">{service.technicianName}</strong></span><Link href={`/services/${service._id}`} className="inline-flex items-center gap-1 text-sm font-bold text-green-700 hover:text-green-800">Details <ArrowUpRight size={15}/></Link></div>
    </div>
  </article>;
}
