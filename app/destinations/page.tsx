// Update the destinations/page.tsx to include all 6 regions with proper order

import Link from "next/link";
import Image from "next/image";
import { getUniqueDestinations } from "@/lib/packages-data";

interface Destination {
  name: string;
  slug: string;
  image: string;
  region: string;
}

export default function DestinationsPage() {
  const destinations = getUniqueDestinations();
  
  // Group destinations by region
  const groupedDestinations = destinations.reduce((groups, destination) => {
    const region = destination.region || 'Other';
    if (!groups[region]) {
      groups[region] = [];
    }
    groups[region].push(destination);
    return groups;
  }, {} as Record<string, Destination[]>);

  // Order of regions to display
  const regions = ['Asia', 'Indian Ocean', 'Middle East', 'Africa', 'Europe', 'Americas', 'Other'];

  // Region descriptions and icons
  const regionInfo: Record<string, { description: string; gradient: string }> = {
    'Asia': {
      description: 'Ancient temples, modern metropolises, and diverse cultures across the largest continent',
      gradient: 'from-orange-500 to-red-500'
    },
    'Indian Ocean': {
      description: 'Paradise beaches, crystal clear waters, and luxury island escapes',
      gradient: 'from-blue-500 to-teal-500'
    },
    'Middle East': {
      description: 'Rich heritage, desert adventures, and architectural marvels',
      gradient: 'from-yellow-600 to-orange-600'
    },
    'Africa': {
      description: 'Wildlife safaris, majestic landscapes, and vibrant cultures',
      gradient: 'from-green-600 to-emerald-600'
    },
    'Europe': {
      description: 'Historic cities, art masterpieces, and culinary delights',
      gradient: 'from-purple-600 to-pink-600'
    },
    'Americas': {
      description: 'Iconic landmarks, natural wonders, and diverse experiences across two continents',
      gradient: 'from-red-600 to-blue-600'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Our Destinations
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Discover curated travel experiences across six continents. From wildlife safaris to cultural journeys, 
            find your perfect adventure with Exottica Travels.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {regions.filter(r => r !== 'Other').map(region => (
              <a
                key={region}
                href={`#region-${region.toLowerCase().replace(' ', '-')}`}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition-all"
              >
                {region}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {regions.map(region => {
          const regionDestinations = groupedDestinations[region];
          if (!regionDestinations || regionDestinations.length === 0) return null;
          
          const info = regionInfo[region];
          
          return (
            <div 
              key={region} 
              id={`region-${region.toLowerCase().replace(' ', '-')}`}
              className="mb-16 scroll-mt-24"
            >
              <div className={`mb-8 border-l-4 border-${region === 'Asia' ? 'orange' : region === 'Indian Ocean' ? 'blue' : region === 'Middle East' ? 'yellow' : region === 'Africa' ? 'green' : region === 'Europe' ? 'purple' : 'red'}-500 pl-4`}>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                  {region}
                </h2>
                {info && (
                  <p className="text-slate-600">{info.description}</p>
                )}
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {regionDestinations.map((d: Destination) => (
                  <Link
                    key={d.slug}
                    href={`/destinations/${d.slug}`}
                    className="group rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-56 bg-slate-100 overflow-hidden">
                      <Image
                        src={d.image}
                        alt={d.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-4 left-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-slate-800`}>
                          {region}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h2 className="text-xl font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {d.name}
                      </h2>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm text-slate-500">View Packages</span>
                        <span className="text-blue-700 group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-900">6</div>
              <div className="text-sm text-slate-600 mt-1">Continents</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-900">30+</div>
              <div className="text-sm text-slate-600 mt-1">Destinations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-900">50+</div>
              <div className="text-sm text-slate-600 mt-1">Tour Packages</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-900">10K+</div>
              <div className="text-sm text-slate-600 mt-1">Happy Travelers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}