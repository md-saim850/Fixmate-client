
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />

        <div className="text-center">
          <h2 className="text-lg font-semibold">
            Loading dashboard...
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Please wait while we fetch your data.
          </p>
        </div>
      </div>
    </div>
  );
}
