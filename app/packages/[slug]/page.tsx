import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPackageBySlug } from "@/lib/packages-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { PACKAGES } = await import("@/lib/packages-data");
  return PACKAGES.map((p) => ({ slug: p.slug }));
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) notFound();

  return (
    <div className="min-h-screen bg-white">
      {/* Full-width hero image - no truncation */}
      <div className="relative w-full aspect-[21/9] md:aspect-[3/1] bg-slate-200">
        <Image
          src={pkg.image}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 container-page">
          <span className="text-brand-600 font-semibold text-sm">{pkg.destination}</span>
          <h1 className="text-2xl md:text-4xl font-bold text-white mt-1">{pkg.title}</h1>
          <p className="text-white/90 text-sm mt-1">{pkg.duration} • From ₹{pkg.price} pp</p>
        </div>
      </div>

      {/* Full content area - ensure nothing is cut off */}
      <div className="container-page py-8 md:py-12">
        <div className="max-w-3xl">
          <p className="text-slate-700 text-lg leading-relaxed">{pkg.description}</p>

          {pkg.highlights && pkg.highlights.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Highlights</h2>
              <ul className="list-disc list-inside space-y-2 text-slate-700">
                {pkg.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Full content block - full HTML content displayed */}
          <div
            className="mt-8 prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-li:text-slate-700"
            dangerouslySetInnerHTML={{ __html: pkg.description.trim() }}
          />
        </div>

        <div className="mt-10 pt-8 border-t border-slate-200 flex flex-wrap gap-4">
          <Link
            href="/request-quote"
            className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-6 py-3 text-white font-semibold hover:bg-brand-700 transition-colors"
          >
            Request a quote
          </Link>
          <Link
            href="/packages"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-6 py-3 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
          >
            ← Back to all packages
          </Link>
        </div>
      </div>
    </div>
  );
}
