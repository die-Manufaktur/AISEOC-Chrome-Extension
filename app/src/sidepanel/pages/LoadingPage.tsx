import { Loader2 } from "lucide-react";

export function LoadingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <Loader2 className="h-12 w-12 animate-spin text-accent-blue" />
      <div className="text-center">
        <h2 className="text-h2 text-text-primary">Analyzing your page</h2>
        <p className="mt-2 text-body-16 text-text-secondary">
          Extracting SEO data and running checks...
        </p>
      </div>
      <div className="w-full max-w-xs">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-500">
          <div className="h-full animate-pulse rounded-full bg-accent-blue" style={{ width: "60%" }} />
        </div>
      </div>
    </div>
  );
}
