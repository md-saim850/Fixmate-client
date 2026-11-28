import Link from "next/link";
import { Wrench } from "lucide-react";
export default function NotFound() {
  return (
    <div className="container-shell grid min-h-[65vh] place-items-center py-16 text-center">
      <div>
        <div className="mx-auto grid size-20 place-items-center rounded-3xl bg-green-50 text-green-700">
          <Wrench size={38} />
        </div>
        <p className="mt-8 text-sm font-black tracking-widest text-green-700">
          404 · PAGE NOT FOUND
        </p>
        <h1 className="mt-3 text-4xl font-black">
          Looks like this repair went missing.
        </h1>
        <p className="mt-4 text-slate-500">
          The page may have moved or the link may be incorrect.
        </p>
        <Link
          href="/"
          className="mt-7 inline-block rounded-xl bg-green-600 px-6 py-3 font-bold text-white"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
