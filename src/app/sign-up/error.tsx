"use client";
import { useEffect } from "react";
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => console.error(error), [error]);
  return (
    <div className="container-shell grid min-h-[60vh] place-items-center text-center">
      <div>
        <h1 className="text-3xl font-black">Something went wrong</h1>
        <p className="mt-3 text-slate-500">
          We couldn’t load this page. Please try again.
        </p>
        <button
          onClick={reset}
          className="mt-6 rounded-xl bg-green-600 px-6 py-3 font-bold text-white"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
