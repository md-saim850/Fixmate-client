import Link from "next/link";
import { Wrench } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-green-100 bg-green-50/70">
      <div className="container-shell grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-extrabold"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-green-600 text-white">
              <Wrench size={19} />
            </span>
            fix<span className="-ml-2 text-green-600">mate</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
            Reliable repair help, clear job updates, and payment only after the
            work is done.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-slate-900">Explore</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-600">
            <Link href="/services">Browse services</Link>
            <Link href="/about">How it works</Link>
            <Link href="/sign-up">Become a technician</Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-slate-900">Get in touch</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-600">
            <a href="mailto:hello@fixmate.example">hello@fixmate.example</a>
            <span>Dhaka, Bangladesh</span>
            <span>Support: Sat–Thu, 9am–6pm</span>
          </div>
        </div>
      </div>
      <div className="border-t border-green-100 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} FixMate. Built for repairs that feel
        reliable.
      </div>
    </footer>
  );
}
