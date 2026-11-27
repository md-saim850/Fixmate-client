export const dynamic = "force-dynamic";

import Link from "next/link";
import { Wrench, User } from "lucide-react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "How it works" },
];

export async function Navbar() {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  return (
    <header className="sticky top-0 z-40 border-b border-green-100 bg-white/90 backdrop-blur-xl">
      <div className="container-shell flex h-[76px] items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid size-10 place-items-center rounded-xl bg-green-600 text-white">
            <Wrench size={21} />
          </span>

          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            fix<span className="text-green-600">mate</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-green-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Section */}
        <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <Link href={`/dashboard/${user.role}`} className="relative">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name || "Profile"}
                      className="size-10 rounded-full border border-green-100 object-cover"
                    />
                  ) : (
                    <span className="grid size-10 place-items-center rounded-full bg-green-100 text-green-700">
                      <User size={20} />
                    </span>
                  )}

                  <span className="max-w-28 truncate text-sm font-semibold text-slate-700">
                    {user.name || "My Account"}
                  </span>
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-green-50"
                >
                  Sign in
                </Link>

                <Link
                  href="/sign-up"
                  className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
                >
                  Get started
                </Link>
              </>
            )} 
        </div>
      </div>

      {/* Mobile Navigation */}
        <nav className="container-shell grid gap-1 border-t border-green-100 py-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-green-50"
            >
              {link.label}
            </Link>
          ))}

            {user ? (
              <>
                <Link href={"/dashboard"} className="my-2 flex items-center gap-3 border-t border-green-100 pt-4">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "Profile"}
                      className="size-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="grid size-10 place-items-center rounded-full bg-green-100 text-green-700">
                      <User size={20} />
                    </span>
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {user.name || "My Account"}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {user.email}
                    </p>
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="px-3 py-2.5 text-sm font-semibold text-green-700"
                >
                  Sign in
                </Link>

                <Link
                  href="/sign-up"
                  className="px-3 py-2.5 text-sm font-semibold text-green-700"
                >
                  Get started
                </Link>
              </>
            )}
        </nav>
    </header>
  );
}
