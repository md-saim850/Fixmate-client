
"use client";

import { authClient } from "@/lib/auth-client";
import { uploadImage } from "@/lib/uploadImage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

type UserRole = "customer" | "technician";

export default function SignUpPage() {
  const [busy, setBusy] = useState(false);
  const [role, setRole] = useState<UserRole>("customer");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (busy) return;

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const phone = formData.get("phone")?.toString().trim() || "";
    const bio = formData.get("bio")?.toString().trim() || "";
    const area = formData.get("area")?.toString().trim() || "";
    const password = formData.get("password")?.toString() || "";
    const confirmPassword = formData.get("confirm_password")?.toString() || "";

    let avatar = "";

    if (profileImage) {
      avatar = await uploadImage(profileImage);
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const validPassword = password.length >= 6 &&/[A-Z]/.test(password) && /[a-z]/.test(password);

    if (!validPassword) {
      toast.error("Password needs 6+ characters, one uppercase and one lowercase letter.");
      return;
    }

    setBusy(true);

    try {
      const { error } = await authClient.signUp.email({name, email, bio, phone, area, avatar, role, password});

      if (error) {
        throw new Error(error.message || "Could not create your account.");
      }

      toast.success("Account created successfully!");

      router.push("/sign-in");
      router.refresh();

    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Signup failed. Please try again.");

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
        {/* Heading */}
        <p className="text-sm font-bold text-green-700">
          GET STARTED
        </p>

        <h1 className="mt-2 text-3xl font-black text-slate-900">
          Create your account
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Join customers and skilled technicians on FixMate.
        </p>

        {/* Full Name */}
        <label className="mt-7 block text-sm font-semibold text-slate-700">
          Full name

          <input
            required
            type="text"
            name="name"
            placeholder="Enter your full name"
            autoComplete="name"
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
          />
        </label>

        {/* Email */}
        <label className="mt-4 block text-sm font-semibold text-slate-700">
          Email

          <input
            required
            type="email"
            name="email"
            placeholder="example@email.com"
            autoComplete="email"
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
          />
        </label>

        {/* Phone */}
        <label className="mt-4 block text-sm font-semibold text-slate-700">
          Phone

          <input
            required
            type="tel"
            name="phone"
            placeholder="+8801XXXXXXXXX"
            autoComplete="tel"
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
          />
        </label>

        {/* Bio */}
        <label className="mt-4 block text-sm font-semibold text-slate-700">
          Bio

          <textarea
            required
            name="bio"
            rows={3}
            placeholder="Tell us a little about yourself..."
            className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
          />
        </label>

        {/* Area */}
        <label className="mt-4 block text-sm font-semibold text-slate-700">
          Area

          <input
            required
            type="text"
            name="area"
            placeholder="e.g. Dhanmondi, Dhaka"
            autoComplete="address-level3"
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
          />
        </label>

        {/* Profile Image */}
        <label className="block w-full max-w-sm mt-5">
          <span className="block text-sm font-medium text-green-800 mb-1.5">
            Profile Image
          </span>

          <div className="relative flex items-center gap-3 w-full px-3 py-2.5 
                          bg-white border border-slate-200 rounded-lg 
                          shadow-sm transition-all
                          focus-within:border-green-400 
                          focus-within:ring-2 focus-within:ring-green-100">
            
            {/* Preview / Placeholder */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden 
                            bg-green-50 border border-green-100 flex items-center justify-center">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              )}
            </div>

            {/* Text area */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-green-900 truncate">
                {preview ? "Photo selected" : "No file chosen"}
              </p>
              <p className="text-xs text-green-600/70">
                {preview ? "Click to change" : "PNG, JPG up to 5MB"}
              </p>
            </div>

            {/* Choose file button */}
            <span className="flex-shrink-0 px-3 py-1.5 text-sm font-medium 
                            text-green-700 bg-green-50 border border-green-200 
                            rounded-md hover:bg-green-100 transition-colors">
              Choose file
            </span>

            {/* Hidden real input */}
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setProfileImage(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />
          </div>
        </label>

        {/* Role */}
        <fieldset className="mt-5">
          <legend className="text-sm font-semibold text-slate-700">
            I want to join as
          </legend>

          <div className="mt-2 grid grid-cols-2 gap-3">
            {(["customer", "technician"] as const).map((item) => (
              <label
                key={item}
                className={`cursor-pointer rounded-xl border p-3 text-center text-sm font-semibold capitalize transition ${
                  role === item
                    ? "border-green-500 bg-green-50 text-green-800"
                    : "border-slate-200 text-slate-600 hover:border-green-300"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={item}
                  className="sr-only"
                  checked={role === item}
                  onChange={() => setRole(item)}
                />

                {item}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Password */}
        <label className="mt-5 block text-sm font-semibold text-slate-700">
          Password

          <input
            required
            type="password"
            name="password"
            placeholder="Create a password"
            autoComplete="new-password"
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
          />

          <span className="mt-2 block text-xs font-normal text-slate-500">
            At least 6 characters, one uppercase and one lowercase letter.
          </span>
        </label>

        {/* Confirm Password */}
        <label className="mt-4 block text-sm font-semibold text-slate-700">
          Confirm password

          <input
            required
            type="password"
            name="confirm_password"
            placeholder="Confirm your password"
            autoComplete="new-password"
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
          />
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={busy}
          className="mt-7 w-full rounded-xl bg-green-600 py-3.5 font-bold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? "Creating account..." : "Create account"}
        </button>

        {/* Sign In */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Already registered?{" "}

          <Link
            className="font-bold text-green-700 hover:text-green-800"
            href="/sign-in"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
