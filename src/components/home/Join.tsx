import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Join() {
  return (
    <section className="container-shell pb-20">

      <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-green-900 px-8 py-10 text-white sm:flex-row sm:items-center sm:px-12">
        
        <div>
          <p className="text-sm font-bold text-green-200">
            Skilled with repairs?
          </p>
          <h2 className="mt-2 text-3xl font-black">
            Grow your repair business with FixMate.
          </h2>
          <p className="mt-2 text-sm text-green-100">
            Showcase your skills and manage every job in one place.
          </p>
        </div>

        <Link
          href="/sign-up"
          className="shrink-0 rounded-xl bg-white px-6 py-3.5 font-bold text-green-900 hover:bg-green-50"
        >
          Join as a technician <ArrowRight className="ml-2 inline" size={17} />
        </Link>
        
      </div>

    </section>
  );
}
