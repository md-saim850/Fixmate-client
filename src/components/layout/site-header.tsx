'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, Wrench, X } from 'lucide-react';

const links = [{ href: '/', label: 'Home' }, { href: '/services', label: 'Services' }, { href: '/about', label: 'How it works' }];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-green-100 bg-white/90 backdrop-blur-xl">
      <div className="container-shell flex h-[76px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid size-10 place-items-center rounded-xl bg-green-600 text-white"><Wrench size={21} /></span>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">fix<span className="text-green-600">mate</span></span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map(link => <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-600 transition hover:text-green-700">{link.label}</Link>)}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/sign-in" className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-green-50">Sign in</Link>
          <Link href="/sign-up" className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700">Get started</Link>
        </div>
        <button aria-label="Toggle navigation" onClick={() => setOpen(!open)} className="rounded-lg p-2 text-slate-700 md:hidden">{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="container-shell grid gap-1 border-t border-green-100 py-4 md:hidden">{links.map(link => <Link onClick={() => setOpen(false)} key={link.href} href={link.href} className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-green-50">{link.label}</Link>)}<Link href="/sign-in" className="px-3 py-2.5 text-sm font-semibold text-green-700">Sign in</Link></nav>}
    </header>
  );
}
