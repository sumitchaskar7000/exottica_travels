export default function PackageDetailLoading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <div className="w-full aspect-[21/9] bg-slate-200" />
      <div className="container-page py-8">
        <div className="h-8 w-3/4 bg-slate-200 rounded mb-4" />
        <div className="h-4 w-full max-w-2xl bg-slate-100 rounded mb-2" />
        <div className="h-4 w-full max-w-xl bg-slate-100 rounded mb-6" />
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-4 bg-slate-100 rounded" style={{ width: `${80 + i * 4}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
