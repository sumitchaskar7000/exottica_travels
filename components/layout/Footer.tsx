"use client";

import Link from "next/link";

export default function MegaFooter() {
  return (
    <footer className="w-full text-white">

      {/* ================= IMAGE SECTION ================= */}
      <div className="relative w-full h-[420px] overflow-hidden">

        {/* Background Image */}
        <img
          src="/images/footer.png"
          alt="Exottica Travels"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Top Blend */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent" />

        {/* Bottom Blend */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#1f6f9f] to-transparent" />

      </div>

      {/* ================= MAIN FOOTER ================= */}
      <div className="bg-[#1f6f9f]">

        <div className="container mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 border-b border-white/20">

          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6">
              Exottica Travels
            </h3>
            <p className="text-white/90 text-sm leading-7">
              We specialize in luxury holidays, honeymoon packages,
              group tours, and customized international travel experiences.
              Your journey begins with us.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-white/90">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/packages">Holiday Packages</Link></li>
              <li><Link href="/international">International Tours</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-6">
              Popular Destinations
            </h3>
            <ul className="space-y-3 text-sm text-white/90">
              <li>Dubai</li>
              <li>Maldives</li>
              <li>Mauritius</li>
              <li>Thailand</li>
              <li>Bali</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">
              Contact Information
            </h3>
            <p className="text-white/90 text-sm leading-7">
              Pune, Maharashtra, India <br /><br />
              
              📞 +91 7378460207 <br />
              📞 +91 7385459671 <br /><br />
              
              ✉️ info@exottica-travels.com <br />
              ✉️ sales@exottica-travels.com
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-white/80 text-sm">
          
          <div className="flex flex-wrap gap-6">
            <Link href="/terms">Terms & Conditions</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/sitemap">Sitemap</Link>
          </div>

          <div>
            © {new Date().getFullYear()} Exottica Travels. All Rights Reserved.
          </div>

        </div>

      </div>

    </footer>
  );
}