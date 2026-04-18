/**
 * Single source of truth for travel services
 * Includes: Flight Ticketing, Medical Evacuation, Corporate, Leisure, Group, Packages
 */

export interface ServiceOffering {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  icon: string;
  category: 'flight' | 'medical' | 'corporate' | 'leisure' | 'group' | 'packages';
  description: string;
  shortDescription: string;
  image: string;
  fullContent: string;
  offerings: ServiceOffering[];
  benefits: string[];
  idealFor: string[];
  cta: string;
}

export const SERVICES: Service[] = [
  // ============================================
  // FLIGHT TICKETING & BOOKING SERVICES
  // ============================================
  {
    slug: 'flight-ticketing',
    title: 'Flight Ticketing & Booking Services',
    shortTitle: 'Flight Ticketing',
    icon: '✈️',
    category: 'flight',
    description: 'Complete air travel solutions with competitive pricing and 24/7 support for all your flight booking needs.',
    shortDescription: 'One-way, round trip, multi-city routing and corporate fare agreements.',
    image: 'https://images.pexels.com/photos/3803571/pexels-photo-3803571.jpeg?auto=compress&cs=tinysrgb&w=1200',
    fullContent: `
      <h2>Flight Ticketing & Booking Services</h2>
      <p>Exottica Travels offers comprehensive flight booking solutions tailored to meet diverse travel needs. 
      Whether you're booking a simple round trip or managing complex multi-city itineraries, our experienced team 
      ensures quick, hassle-free bookings at the best available rates.</p>
      
      <h3>Our Services Include:</h3>
      <ul>
        <li><strong>One-Way & Round Trip Tickets</strong> - Flexible booking options</li>
        <li><strong>Multi-City Routing</strong> - Complex itineraries with multiple stops</li>
        <li><strong>Group Fare Booking</strong> - Special rates for groups of 10+</li>
        <li><strong>Corporate Fare Agreements</strong> - Negotiated rates for businesses</li>
        <li><strong>Student Fare Assistance</strong> - Discounted rates for students</li>
        <li><strong>Flexible Date Options</strong> - Modify your travel dates easily</li>
        <li><strong>Refund & Rescheduling Support</strong> - Complete flexibility</li>
      </ul>
    `,
    offerings: [
      { title: 'One-Way & Round Trip Tickets', description: 'Flexible booking options for all routes' },
      { title: 'Multi-City Routing', description: 'Complex itineraries with multiple stops' },
      { title: 'Group Fare Booking', description: 'Special rates for groups of 10+' },
      { title: 'Corporate Fare Agreements', description: 'Negotiated rates for businesses' },
      { title: 'Student Fare Assistance', description: 'Discounted rates for students' },
      { title: 'Flexible Date Options', description: 'Modify your travel dates easily' },
      { title: 'Refund & Rescheduling Support', description: 'Complete flexibility' }
    ],
    benefits: [
      'Competitive Pricing - Get the best rates in the market',
      'Quick Ticket Issuance - Instant confirmation and tickets',
      '24/7 Support - Round-the-clock customer assistance',
      'Emergency Rebooking - Immediate alternative flights on disruptions',
      'Corporate Billing Options - Flexible payment terms'
    ],
    idealFor: ['Business Travelers', 'Groups', 'Students', 'Corporate Companies', 'Large Families'],
    cta: 'Book Your Flight'
  },

  // ============================================
  // MEDICAL EVACUATION & AIR AMBULANCE SERVICES
  // ============================================
  {
    slug: 'medical-evacuation',
    title: 'Medical Evacuation & Air Ambulance Services',
    shortTitle: 'Medical Evacuation',
    icon: '🚑',
    category: 'medical',
    description: '24/7 Emergency air medical transport for critical patients requiring urgent domestic or international relocation.',
    shortDescription: 'ICU-equipped aircraft with comprehensive medical support and coordination.',
    image: 'https://images.pexels.com/photos/87651/pexels-photo-87651.jpeg?auto=compress&cs=tinysrgb&w=1200',
    fullContent: `
      <h2>Medical Evacuation & Air Ambulance Services</h2>
      <p><strong>24/7 Emergency Air Medical Transport</strong></p>
      <p>Exottica Travels provides domestic and international medical evacuation services for critical patients 
      requiring urgent relocation. Our specialized team ensures safe, rapid transport with complete medical support 
      throughout the journey.</p>
      
      <h3>Services Offered:</h3>
      <ul>
        <li><strong>Air Ambulance (ICU Equipped Aircraft)</strong> - Fully equipped for critical patients</li>
        <li><strong>International Medical Transfer</strong> - Cross-border emergency relocations</li>
        <li><strong>Domestic Medical Transfer</strong> - Within-country patient transport</li>
        <li><strong>Bed-to-Bed Patient Transfer</strong> - Complete coordination from origin to destination</li>
        <li><strong>Ground Ambulance Coordination</strong> - Integrated ground and air transport</li>
        <li><strong>Medical Escort on Commercial Flights</strong> - Support for stable patients</li>
      </ul>
      
      <h3>Onboard Medical Equipment:</h3>
      <ul>
        <li>ICU Setup - Intensive care capability</li>
        <li>Ventilator Support - Respiratory assistance</li>
        <li>Cardiac Monitor - Heart rhythm monitoring</li>
        <li>Oxygen Supply - Continuous supply management</li>
        <li>Emergency Medication - Full pharmaceutical support</li>
      </ul>
    `,
    offerings: [
      { title: 'Air Ambulance (ICU Equipped Aircraft)', description: 'Fully equipped for critical patients' },
      { title: 'International Medical Transfer', description: 'Cross-border emergency relocations' },
      { title: 'Domestic Medical Transfer', description: 'Within-country patient transport' },
      { title: 'Bed-to-Bed Patient Transfer', description: 'Complete coordination from origin to destination' },
      { title: 'Ground Ambulance Coordination', description: 'Integrated ground and air transport' },
      { title: 'Medical Escort on Commercial Flights', description: 'Support for stable patients' }
    ],
    benefits: [
      'ICU Setup - Intensive care capability onboard',
      'Ventilator Support - Respiratory assistance',
      'Cardiac Monitor - Heart rhythm monitoring',
      'Oxygen Supply - Continuous supply management',
      'Emergency Medication - Full pharmaceutical support'
    ],
    idealFor: ['Critical Care Patients', 'Accident Victims', 'Organ Transplant Cases', 'Post-Surgery Transfers', 'International Medical Relocation'],
    cta: 'Request Emergency Transport'
  },

  // ============================================
  // CORPORATE TRAVEL MANAGEMENT
  // ============================================
  {
    slug: 'corporate-travel',
    title: 'Corporate Travel Management',
    shortTitle: 'Corporate Travel',
    icon: '💼',
    category: 'corporate',
    description: 'Policy-friendly business trips with negotiated fares, compliance workflows, and comprehensive employee travel support.',
    shortDescription: 'Travel policies, approval workflows, and reporting for your business.',
    image: 'https://images.pexels.com/photos/3944387/pexels-photo-3944387.jpeg?auto=compress&cs=tinysrgb&w=1200',
    fullContent: `
      <h2>Corporate Travel Management</h2>
      <p>Exottica Travels provides end-to-end corporate travel solutions designed to streamline business travel 
      while maintaining compliance and controlling costs. Our experienced team works with your organization to 
      implement policies that work for your business.</p>
      
      <h3>Services Include:</h3>
      <ul>
        <li>Custom Travel Policy Development</li>
        <li>Travel Approval Workflows</li>
        <li>Negotiated Corporate Rates</li>
        <li>24/7 Duty-of-Care Support</li>
        <li>Travel Expense Tracking & Reporting</li>
        <li>Emergency Travel Assistance</li>
      </ul>
    `,
    offerings: [
      { title: 'Custom Travel Policy Development', description: 'Tailored policies for your organization' },
      { title: 'Travel Approval Workflows', description: 'Streamlined authorization processes' },
      { title: 'Negotiated Corporate Rates', description: 'Best rates for bulk bookings' },
      { title: '24/7 Duty-of-Care Support', description: 'Employee safety and support' },
      { title: 'Travel Expense Tracking & Reporting', description: 'Complete financial visibility' },
      { title: 'Emergency Travel Assistance', description: 'Support when things go wrong' }
    ],
    benefits: [
      'Cost Control - Negotiate better rates for large volumes',
      'Compliance - Meet regulatory and policy requirements',
      'Duty of Care - Protect your traveling employees',
      'Reporting - Track spend and manage budgets',
      'Support - 24/7 assistance when travel issues arise'
    ],
    idealFor: ['Large Corporations', 'SMEs', 'Financial Institutions', 'Consulting Firms', 'Tech Companies'],
    cta: 'Set Up Corporate Account'
  },

  // ============================================
  // LEISURE TRAVEL & HOLIDAYS
  // ============================================
  {
    slug: 'leisure-travel',
    title: 'Leisure Travel & Holiday Packages',
    shortTitle: 'Leisure Holidays',
    icon: '🏖️',
    category: 'leisure',
    description: 'Carefully curated holiday experiences including beach escapes, city breaks, honeymoons, and family vacations.',
    shortDescription: 'Beach, city, cruise and safari escapes tailored to your style.',
    image: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=1200',
    fullContent: `
      <h2>Leisure Travel & Holiday Packages</h2>
      <p>Create unforgettable memories with our curated leisure travel packages. Whether you're dreaming of tropical 
      beaches, vibrant cities, romantic getaways, or family adventures, our travel experts design the perfect itinerary 
      for you.</p>
      
      <h3>Holiday Categories:</h3>
      <ul>
        <li><strong>Beach Escapes</strong> - Tropical paradise destinations</li>
        <li><strong>City Breaks</strong> - Cultural exploration and urban experiences</li>
        <li><strong>Honeymoon Packages</strong> - Romantic destinations for couples</li>
        <li><strong>Family Vacations</strong> - Fun-filled trips for all ages</li>
        <li><strong>Group Tours</strong> - Adventures with friends and family</li>
        <li><strong>Cruise Holidays</strong> - Luxury ocean voyages</li>
        <li><strong>Adventure Trips</strong> - Thrilling experiences and activities</li>
      </ul>
    `,
    offerings: [
      { title: 'Beach Escapes', description: 'Tropical paradise destinations' },
      { title: 'City Breaks', description: 'Cultural exploration and urban experiences' },
      { title: 'Honeymoon Packages', description: 'Romantic destinations for couples' },
      { title: 'Family Vacations', description: 'Fun-filled trips for all ages' },
      { title: 'Group Tours', description: 'Adventures with friends and family' },
      { title: 'Cruise Holidays', description: 'Luxury ocean voyages' },
      { title: 'Adventure Trips', description: 'Thrilling experiences and activities' }
    ],
    benefits: [
      'Custom Itineraries - Tailored to your interests',
      'All-Inclusive Options - Simplify your planning',
      'Expert Guides - Local insights and knowledge',
      'Safety & Support - 24/7 assistance while traveling',
      'Value for Money - Best rates on hotels and activities'
    ],
    idealFor: ['Couples', 'Families', 'Solo Travelers', 'Groups', 'Adventure Seekers'],
    cta: 'Explore Holiday Packages'
  },

  // ============================================
  // GROUP & INCENTIVE TRAVEL
  // ============================================
  {
    slug: 'group-travel',
    title: 'Group & Incentive Travel',
    shortTitle: 'Group Travel',
    icon: '🧑‍🤝‍🧑',
    category: 'group',
    description: 'Specialized group travel management for corporate incentives, sports tours, conferences, and large family getaways.',
    shortDescription: 'Incentive trips, sports tours and large family getaways.',
    image: 'https://images.pexels.com/photos/1181482/pexels-photo-1181482.jpeg?auto=compress&cs=tinysrgb&w=1200',
    fullContent: `
      <h2>Group & Incentive Travel</h2>
      <p>Exottica Travels specializes in managing complex group travel logistics for corporations, associations, 
      and families. From 20-person team outings to 500+ delegate conferences, we handle every detail with precision.</p>
      
      <h3>Group Travel Services:</h3>
      <ul>
        <li><strong>Corporate Incentive Programs</strong> - Reward top performers</li>
        <li><strong>Conference & Event Travel</strong> - Manage multi-city delegations</li>
        <li><strong>Sports Tours</strong> - Team travel and tournaments</li>
        <li><strong>Educational Groups</strong> - Student and academic group travel</li>
        <li><strong>Family Reunions</strong> - Coordinate large family trips</li>
        <li><strong>Association Tours</strong> - Group itineraries for organizations</li>
      </ul>
    `,
    offerings: [
      { title: 'Corporate Incentive Programs', description: 'Reward top performers' },
      { title: 'Conference & Event Travel', description: 'Manage multi-city delegations' },
      { title: 'Sports Tours', description: 'Team travel and tournaments' },
      { title: 'Educational Groups', description: 'Student and academic group travel' },
      { title: 'Family Reunions', description: 'Coordinate large family trips' },
      { title: 'Association Tours', description: 'Group itineraries for organizations' }
    ],
    benefits: [
      'Group Discounts - Better rates for larger groups',
      'Dedicated Account Manager - Single point of contact',
      'Logistics Management - All coordination handled',
      'Risk Management - Travel insurance and support',
      'Shared Experiences - Team building and bonding'
    ],
    idealFor: ['Corporations', 'Sports Teams', 'Educational Institutions', 'Associations', 'Large Families'],
    cta: 'Plan Your Group Trip'
  },

  // ============================================
  // TAILOR-MADE PACKAGES
  // ============================================
  {
    slug: 'tailor-made-packages',
    title: 'Tailor-Made Custom Packages',
    shortTitle: 'Custom Packages',
    icon: '🧭',
    category: 'packages',
    description: 'Fully customized travel itineraries built from scratch with flights, accommodations, activities, and local experiences.',
    shortDescription: 'Built-from-scratch itineraries with flights, hotels and activities.',
    image: 'https://images.pexels.com/photos/1631278/pexels-photo-1631278.jpeg?auto=compress&cs=tinysrgb&w=1200',
    fullContent: `
      <h2>Tailor-Made Custom Packages</h2>
      <p>Exottica Travels' flagship service: completely customized travel experiences designed exclusively for you. 
      Our travel consultants work closely with you to understand your vision and bring it to life with every detail 
      perfectly arranged.</p>
      
      <h3>What We Include:</h3>
      <ul>
        <li><strong>Flights</strong> - Best routes and timings for your needs</li>
        <li><strong>Accommodations</strong> - Hotels, resorts, or unique stays</li>
        <li><strong>Transfers</strong> - Airport and ground transportation</li>
        <li><strong>Activities & Experiences</strong> - Curated based on your interests</li>
        <li><strong>Dining Arrangements</strong> - Restaurant reservations at top venues</li>
        <li><strong>Travel Insurance</strong> - Complete coverage and protection</li>
        <li><strong>24/7 On-Trip Support</strong> - Assistance during your journey</li>
      </ul>
    `,
    offerings: [
      { title: 'Flights', description: 'Best routes and timings for your needs' },
      { title: 'Accommodations', description: 'Hotels, resorts, or unique stays' },
      { title: 'Transfers', description: 'Airport and ground transportation' },
      { title: 'Activities & Experiences', description: 'Curated based on your interests' },
      { title: 'Dining Arrangements', description: 'Restaurant reservations at top venues' },
      { title: 'Travel Insurance', description: 'Complete coverage and protection' },
      { title: '24/7 On-Trip Support', description: 'Assistance during your journey' }
    ],
    benefits: [
      'Completely Personalized - Built to your exact preferences',
      'Expert Planning - 20+ years of travel expertise',
      'Hassle-Free - We handle all arrangements',
      'Value Optimization - Best rates for your budget',
      'Flexibility - Easy modifications before or during travel'
    ],
    idealFor: ['Honeymooners', 'Adventure Seekers', 'Luxury Travelers', 'Families', 'Corporate Groups'],
    cta: 'Request Custom Quote'
  }
];

// Helper functions
export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find(service => service.slug === slug);
}

export function getServicesByCategory(category: Service['category']): Service[] {
  return SERVICES.filter(service => service.category === category);
}

export function searchServices(query: string): Service[] {
  if (!query || typeof query !== 'string') {
    return SERVICES;
  }
  const lowercaseQuery = query.toLowerCase().trim();
  if (lowercaseQuery === '') {
    return SERVICES;
  }
  return SERVICES.filter(service =>
    service.title.toLowerCase().includes(lowercaseQuery) ||
    service.shortDescription.toLowerCase().includes(lowercaseQuery) ||
    service.description.toLowerCase().includes(lowercaseQuery)
  );
}
