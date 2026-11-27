"use client";

import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);

    try {
      const { error } = await signIn.email({email, password});

      if (error) throw new Error("Email or password is incorrect");

      toast.success("Signed in successfully");
      router.push('/');
      router.refresh();

    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unable to sign in");

    } finally {
      setBusy(false);

    }
  }
  return (
    <div className="container-shell grid min-h-[70vh] place-items-center py-14">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-soft"
      >
        <p className="text-sm font-bold text-green-700">WELCOME BACK</p>
        <h1 className="mt-2 text-3xl font-black">Sign in to FixMate</h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage your repairs and bookings.
        </p>

        <label className="mt-7 block text-sm font-semibold">
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-green-500"
          />
        </label>

        <label className="mt-4 block text-sm font-semibold">
          Password
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-green-500"
          />
        </label>

        <button
          disabled={busy}
          className="mt-7 w-full rounded-xl bg-green-600 py-3.5 font-bold text-white disabled:opacity-60"
        >
          {busy ? "Signing in..." : "Sign in"}
        </button>

        <p className="mt-6 text-center text-sm text-slate-500">
          New to FixMate?{" "}
          <Link className="font-bold text-green-700" href="/sign-up">
            Create an account
          </Link>
        </p>

      </form>
    </div>
  );
}
