"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"customer" | "technician">("customer");
  const [busy, setBusy] = useState(false);
  const valid =
    password.length >= 6 && /[A-Z]/.test(password) && /[a-z]/.test(password);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) {
      toast.error(
        "Password needs 6+ characters, uppercase and lowercase letters.",
      );
      return;
    }
    setBusy(true);
    try {
      const r = await fetch("/api/auth/sign-up/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      if (!r.ok)
        throw new Error(
          "Could not create account. Check whether this email is already registered.",
        );
      toast.success("Account created. Please sign in.");
      window.location.href = "/sign-in";
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="container-shell grid min-h-[70vh] place-items-center py-14">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-soft"
      >
        <p className="text-sm font-bold text-green-700">GET STARTED</p>
        <h1 className="mt-2 text-3xl font-black">Create your account</h1>
        <p className="mt-2 text-sm text-slate-500">
          Join customers and skilled technicians on FixMate.
        </p>
        <label className="mt-7 block text-sm font-semibold">
          Full name
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="mt-4 block text-sm font-semibold">
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="mt-4 block text-sm font-semibold">
          Password
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
          />
          <span className="mt-2 block text-xs text-slate-500">
            At least 6 characters, one uppercase and one lowercase letter.
          </span>
        </label>
        <fieldset className="mt-5">
          <legend className="text-sm font-semibold">I want to join as</legend>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {(["customer", "technician"] as const).map((item) => (
              <label
                key={item}
                className={`cursor-pointer rounded-xl border p-3 text-center text-sm font-semibold capitalize ${role === item ? "border-green-500 bg-green-50 text-green-800" : "border-slate-200"}`}
              >
                <input
                  type="radio"
                  className="sr-only"
                  checked={role === item}
                  onChange={() => setRole(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </fieldset>
        <button
          disabled={busy}
          className="mt-7 w-full rounded-xl bg-green-600 py-3.5 font-bold text-white disabled:opacity-60"
        >
          {busy ? "Creating account..." : "Create account"}
        </button>
        <p className="mt-6 text-center text-sm text-slate-500">
          Already registered?{" "}
          <Link className="font-bold text-green-700" href="/sign-in">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
