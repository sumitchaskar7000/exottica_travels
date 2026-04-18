export default function BranchesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container-page py-10 md:py-14">
        <h1 className="text-3xl font-semibold text-slate-900">Branches</h1>
        <p className="mt-2 text-sm text-slate-600 max-w-2xl">
          Contact your nearest branch for assistance with bookings, visas, and travel planning.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-card">
            <h2 className="text-lg font-semibold text-slate-900">Johannesburg</h2>
            <p className="mt-2 text-sm text-slate-600">
              1 Sample Street, Rosebank
              <br />
              Johannesburg, South Africa
            </p>
            <p className="mt-3 text-sm text-slate-700">
              <span className="font-medium">Phone:</span> +27 (0)11 000 0000
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-card">
            <h2 className="text-lg font-semibold text-slate-900">Cape Town</h2>
            <p className="mt-2 text-sm text-slate-600">
              22 Sample Avenue, Gardens
              <br />
              Cape Town, South Africa
            </p>
            <p className="mt-3 text-sm text-slate-700">
              <span className="font-medium">Phone:</span> +27 (0)21 000 0000
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

