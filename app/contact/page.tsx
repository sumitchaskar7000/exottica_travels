import { ContactForm } from "@/components/forms/ContactForm";

export default function ContactPage() {
  return (
    <div className="container-page py-12 md:py-16 grid gap-8 md:grid-cols-[3fr,2fr]">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Contact us</h1>
        <p className="mt-3 text-sm text-slate-600 max-w-xl">
          Share a few details about your trip or question and a travel
          consultant will respond with ideas, availability and pricing.
        </p>
        <div className="mt-6">
          <ContactForm />
        </div>
      </div>
      <aside className="space-y-4 text-sm text-slate-700">
        <div className="rounded-2xl bg-white p-4 shadow-card">
          <h2 className="font-semibold text-slate-900 mb-1">Call us</h2>
          <p>+27 (0)11 000 0000</p>
          <p className="mt-1 text-xs text-slate-500">
            Mon–Fri 08:00 – 17:00 (SAST)
          </p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-card">
          <h2 className="font-semibold text-slate-900 mb-1">Email</h2>
          <p>hello@travelwebsitepro.test</p>
        </div>
      </aside>
    </div>
  );
}

