"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Wrench, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { useSession, signOut} from "@/lib/auth-client";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "How it works" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: session, isPending } = useSession();

  const user = session?.user;

  const handleSignOut = async () => {
    setLoading(true);
    try{
      await signOut();
      setProfileOpen(false);
      setOpen(false);

    }catch(error){
      console.log(error);

    }finally{
      setLoading(false)
      
    }
  };

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
          {!isPending && (
            user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-green-50"
                  aria-label="Open profile menu"
                  aria-expanded={profileOpen}
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
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
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-14 w-52 rounded-xl border border-green-100 bg-white p-2 shadow-lg">
                                       
                    <Link
                      href={`/dashboard/${
                        user?.role === "customer"
                          ? "customer"
                          : user?.role === "technician"
                            ? "technician"
                            : "admin"
                      }`}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-green-50"
                    >
                      <LayoutDashboard size={17} />
                      Dashboard
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={17} />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
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
            )
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-slate-700 md:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <nav className="container-shell grid gap-1 border-t border-green-100 py-4 md:hidden">

          {links.map((link) => (
            <Link
              onClick={() => setOpen(false)}
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-green-50"
            >
              {link.label}
            </Link>
          ))}

          {!isPending && (
            user ? (
              <>
                <div className="my-2 flex items-center gap-3 border-t border-green-100 pt-4">
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
                </div>

                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-green-700 hover:bg-green-50"
                >
                  <LayoutDashboard size={17} />
                  Dashboard
                </Link>

                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  <LogOut size={17} />
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 text-sm font-semibold text-green-700"
                >
                  Sign in
                </Link>

                <Link
                  href="/sign-up"
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 text-sm font-semibold text-green-700"
                >
                  Get started
                </Link>
              </>
            )
          )}
        </nav>
      )}
    </header>
  );
}
