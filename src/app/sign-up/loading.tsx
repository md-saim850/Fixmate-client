export default function Loading() {
  return (
    <div className="container-shell animate-pulse py-16">
      <div className="h-10 w-64 rounded-lg bg-green-100" />
      <div className="mt-4 h-5 w-96 max-w-full rounded bg-slate-100" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="overflow-hidden rounded-2xl border p-4">
            <div className="aspect-[16/10] rounded-xl bg-green-50" />
            <div className="mt-5 h-5 w-3/4 rounded bg-slate-100" />
            <div className="mt-3 h-4 w-1/2 rounded bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
