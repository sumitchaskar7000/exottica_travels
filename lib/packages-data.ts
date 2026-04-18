export interface TourPackage {
  id: string;
  slug: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  highlights: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  inclusions: string[];
  exclusions: string[];
  bestSeason: string;
  groupSize: string;
  transportation: string;
  accommodation: string;
}

export const PACKAGES: TourPackage[] = [
  // ASIA PACKAGES
  {
    id: "asia-bali-indonesia",
    slug: "bali-indonesia",
    title: "Bali Paradise Escape",
    destination: "Bali, Indonesia • Asia",
    duration: "6 Days / 5 Nights",
    price: 74617,
    originalPrice: 107817,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3",
    description: "Experience the magic of Bali with its stunning beaches, ancient temples, and vibrant culture. This package covers the best of the Island of Gods.",
    highlights: [
      "Visit Uluwatu Temple and watch Kecak dance",
      "Explore Ubud's rice terraces and monkey forest",
      "Sunset dinner at Jimbaran Bay",
      "Snorkeling at Blue Lagoon",
      "Traditional Balinese spa treatment"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Bali",
        description: "Arrive at Ngurah Rai International Airport, transfer to hotel, and enjoy a relaxing evening."
      },
      {
        day: 2,
        title: "Ubud Cultural Tour",
        description: "Visit Tegalalang Rice Terraces, Ubud Monkey Forest, and traditional markets."
      },
      {
        day: 3,
        title: "South Bali Exploration",
        description: "Explore Uluwatu Temple, enjoy Kecak dance performance, and dine at Jimbaran Bay."
      },
      {
        day: 4,
        title: "Nusa Penida Adventure",
        description: "Full-day excursion to Nusa Penida with visits to Kelingking Beach and Angel's Billabong."
      },
      {
        day: 5,
        title: "Water Sports & Relaxation",
        description: "Enjoy water sports activities or relax with a traditional Balinese spa treatment."
      },
      {
        day: 6,
        title: "Departure",
        description: "Transfer to airport for departure."
      }
    ],
    inclusions: [
      "5 nights accommodation in 4-star hotels",
      "Daily breakfast",
      "Private airport transfers",
      "Full-day tours with private guide",
      "Entrance fees to all attractions",
      "Traditional Balinese massage (1 session)"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Lunch and dinner (except where mentioned)",
      "Personal expenses"
    ],
    bestSeason: "April to October",
    groupSize: "2-12 people",
    transportation: "Private AC vehicle",
    accommodation: "4-star beachfront resorts"
  },
  {
    id: "asia-thailand-bangkok-phuket",
    slug: "thailand-bangkok-phuket",
    title: "Thailand Explorer",
    destination: "Bangkok, Thailand • Asia",
    duration: "8 Days / 7 Nights",
    price: 99517,
    originalPrice: 132717,
    image: "https://images.unsplash.com/photo-1537956965359-7573183d1f57?ixlib=rb-4.0.3",
    description: "Discover the vibrant culture, stunning temples, and beautiful beaches of Thailand.",
    highlights: [
      "Visit the Grand Palace and Wat Phra Kaew",
      "Floating market experience",
      "Phi Phi Islands tour",
      "Thai cooking class",
      "Traditional Thai massage"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Bangkok",
        description: "Arrive in Bangkok, transfer to hotel, and welcome dinner."
      },
      {
        day: 2,
        title: "Bangkok City Tour",
        description: "Visit Grand Palace, Wat Pho, and take a long-tail boat tour through canals."
      },
      {
        day: 3,
        title: "Ayutthaya Historical Park",
        description: "Day trip to the ancient capital of Ayutthaya, a UNESCO World Heritage site."
      },
      {
        day: 4,
        title: "Flight to Phuket",
        description: "Morning flight to Phuket, transfer to beach resort, and free time."
      },
      {
        day: 5,
        title: "Phi Phi Islands Tour",
        description: "Full-day speedboat tour to Phi Phi Islands with snorkeling and lunch."
      },
      {
        day: 6,
        title: "Phuket City Tour",
        description: "Explore Phuket Old Town, Big Buddha, and enjoy sunset at Promthep Cape."
      },
      {
        day: 7,
        title: "Free Day",
        description: "Free day for relaxation or optional activities like scuba diving or spa."
      },
      {
        day: 8,
        title: "Departure",
        description: "Transfer to airport for departure."
      }
    ],
    inclusions: [
      "7 nights accommodation in 4-star hotels",
      "Daily breakfast",
      "Internal flights (Bangkok-Phuket)",
      "Private tours with English-speaking guides",
      "Entrance fees",
      "Thai cooking class",
      "Traditional Thai massage (1 session)"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Some meals",
      "Personal expenses"
    ],
    bestSeason: "November to February",
    groupSize: "2-15 people",
    transportation: "Private AC vehicle, speedboat",
    accommodation: "4-star city hotels and beach resorts"
  },
  {
    id: "asia-vietnam-hanoi-ha-long",
    slug: "vietnam-hanoi-ha-long",
    title: "Vietnam Heritage Journey",
    destination: "Hanoi, Vietnam • Asia",
    duration: "7 Days / 6 Nights",
    price: 82917,
    originalPrice: 116117,
    image: "https://images.unsplash.com/photo-1557750255-c76d4b5f0f6e?ixlib=rb-4.0.3",
    description: "Experience the rich culture, stunning landscapes, and delicious cuisine of Vietnam.",
    highlights: [
      "Hanoi Old Quarter walking tour",
      "Ha Long Bay overnight cruise",
      "Hoa Lu and Tam Coc visit",
      "Water puppet show",
      "Vietnamese cooking class"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Hanoi",
        description: "Arrive in Hanoi, transfer to hotel, and evening food tour."
      },
      {
        day: 2,
        title: "Hanoi City Tour",
        description: "Visit Ho Chi Minh Mausoleum, Temple of Literature, and enjoy water puppet show."
      },
      {
        day: 3,
        title: "Ha Long Bay Cruise",
        description: "Transfer to Ha Long Bay, board luxury cruise with lunch and activities."
      },
      {
        day: 4,
        title: "Ha Long Bay - Hanoi",
        description: "Morning tai chi, cave exploration, and return to Hanoi."
      },
      {
        day: 5,
        title: "Ninh Binh Excursion",
        description: "Visit Hoa Lu Ancient Capital and take a boat ride in Tam Coc."
      },
      {
        day: 6,
        title: "Free Day & Cooking Class",
        description: "Free morning, afternoon Vietnamese cooking class."
      },
      {
        day: 7,
        title: "Departure",
        description: "Transfer to airport for departure."
      }
    ],
    inclusions: [
      "6 nights accommodation in 4-star hotels",
      "Daily breakfast, 3 lunches, 2 dinners",
      "Ha Long Bay overnight cruise",
      "Private tours with guide",
      "Entrance fees",
      "Cooking class",
      "Water puppet show tickets"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Beverages",
      "Personal expenses"
    ],
    bestSeason: "September to November, March to May",
    groupSize: "2-12 people",
    transportation: "Private AC vehicle, cruise ship",
    accommodation: "4-star hotels and luxury cruise"
  },
  {
    id: "asia-japan-tokyo-kyoto",
    slug: "japan-tokyo-kyoto",
    title: "Japan Cultural Discovery",
    destination: "Tokyo, Japan • Asia",
    duration: "10 Days / 9 Nights",
    price: 248917,
    originalPrice: 298717,
    image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-4.0.3",
    description: "Immerse yourself in the unique blend of ancient traditions and modern technology in Japan.",
    highlights: [
      "Tokyo city exploration",
      "Mt. Fuji day trip",
      "Kyoto's temples and gardens",
      "Osaka food tour",
      "Traditional tea ceremony"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Tokyo",
        description: "Arrive at Narita/Haneda Airport, transfer to hotel, and welcome dinner."
      },
      {
        day: 2,
        title: "Tokyo City Tour",
        description: "Visit Asakusa Temple, Meiji Shrine, and explore Shibuya Crossing."
      },
      {
        day: 3,
        title: "Mt. Fuji & Hakone",
        description: "Day trip to Mt. Fuji with Lake Ashi cruise and cable car ride."
      },
      {
        day: 4,
        title: "Bullet Train to Kyoto",
        description: "Take Shinkansen to Kyoto, visit Kinkaku-ji (Golden Pavilion)."
      },
      {
        day: 5,
        title: "Kyoto Cultural Tour",
        description: "Visit Fushimi Inari Shrine, Gion district, and traditional tea ceremony."
      },
      {
        day: 6,
        title: "Arashiyama & Nara",
        description: "Visit Arashiyama Bamboo Grove and day trip to Nara Park."
      },
      {
        day: 7,
        title: "Osaka Food Tour",
        description: "Day trip to Osaka with Dotonbori food tour and Osaka Castle visit."
      },
      {
        day: 8,
        title: "Free Day in Kyoto",
        description: "Free day to explore Kyoto at your own pace or optional activities."
      },
      {
        day: 9,
        title: "Return to Tokyo",
        description: "Return to Tokyo by bullet train, free afternoon for shopping."
      },
      {
        day: 10,
        title: "Departure",
        description: "Transfer to airport for departure."
      }
    ],
    inclusions: [
      "9 nights accommodation in 4-star hotels",
      "Daily breakfast, 2 dinners",
      "7-day Japan Rail Pass",
      "Private tours with English-speaking guides",
      "Entrance fees",
      "Traditional tea ceremony",
      "Welcome and farewell dinners"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Some meals",
      "Personal expenses"
    ],
    bestSeason: "March to May, September to November",
    groupSize: "2-10 people",
    transportation: "Shinkansen (bullet train), private vehicles",
    accommodation: "4-star hotels and traditional ryokan"
  },
  {
    id: "asia-singapore-malaysia",
    slug: "singapore-malaysia",
    title: "Singapore & Malaysia Discovery",
    destination: "Singapore • Asia",
    duration: "8 Days / 7 Nights",
    price: 132717,
    originalPrice: 165917,
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3",
    description: "Explore the modern marvels of Singapore and the cultural richness of Malaysia.",
    highlights: [
      "Marina Bay Sands and Gardens by the Bay",
      "Sentosa Island adventure",
      "Kuala Lumpur Petronas Towers",
      "Penang street food tour",
      "Cameron Highlands tea plantations"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Singapore",
        description: "Arrive at Changi Airport, transfer to hotel, and evening light show at Marina Bay."
      },
      {
        day: 2,
        title: "Singapore City Tour",
        description: "Visit Gardens by the Bay, Merlion Park, and explore Chinatown."
      },
      {
        day: 3,
        title: "Sentosa Island",
        description: "Full day at Sentosa Island with Universal Studios or beach activities."
      },
      {
        day: 4,
        title: "Flight to Kuala Lumpur",
        description: "Morning flight to Kuala Lumpur, visit Petronas Towers and KL Tower."
      },
      {
        day: 5,
        title: "Batu Caves & Cultural Tour",
        description: "Visit Batu Caves, explore Little India and Central Market."
      },
      {
        day: 6,
        title: "Cameron Highlands",
        description: "Drive to Cameron Highlands, visit tea plantations and strawberry farms."
      },
      {
        day: 7,
        title: "Penang Heritage Tour",
        description: "Drive to Penang, explore George Town UNESCO site and street art."
      },
      {
        day: 8,
        title: "Departure",
        description: "Transfer to Penang Airport for departure."
      }
    ],
    inclusions: [
      "7 nights accommodation in 4-star hotels",
      "Daily breakfast",
      "Internal flights (Singapore-Kuala Lumpur)",
      "Private transfers and tours",
      "Entrance fees",
      "Penang street food tour"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Some meals",
      "Personal expenses"
    ],
    bestSeason: "February to April, June to September",
    groupSize: "2-12 people",
    transportation: "Private vehicle, flights",
    accommodation: "4-star city and resort hotels"
  },

  // INDIAN OCEAN PACKAGES
  {
    id: "indian-ocean-maldives",
    slug: "maldives",
    title: "Maldives Overwater Paradise",
    destination: "Maldives • Indian Ocean",
    duration: "5 Days / 4 Nights",
    price: 182517,
    originalPrice: 232317,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3",
    description: "Experience luxury in paradise with overwater villas, crystal clear waters, and pristine beaches.",
    highlights: [
      "Stay in overwater villa",
      "Snorkeling with sea turtles",
      "Sunset dolphin cruise",
      "Private beach dinner",
      "Underwater restaurant experience"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Maldives",
        description: "Arrive at Malé International Airport, speedboat transfer to resort, and welcome drink."
      },
      {
        day: 2,
        title: "Snorkeling & Water Sports",
        description: "Morning snorkeling tour to nearby reefs, afternoon water sports activities."
      },
      {
        day: 3,
        title: "Island Exploration",
        description: "Visit local island to experience Maldivian culture and lifestyle."
      },
      {
        day: 4,
        title: "Sunset Cruise & Dinner",
        description: "Sunset dolphin cruise followed by romantic private beach dinner."
      },
      {
        day: 5,
        title: "Departure",
        description: "Morning relaxation, transfer to airport for departure."
      }
    ],
    inclusions: [
      "4 nights overwater villa accommodation",
      "Daily breakfast and dinner",
      "Speedboat transfers",
      "Snorkeling equipment",
      "Sunset dolphin cruise",
      "Private beach dinner",
      "Underwater restaurant experience"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Lunch",
      "Alcoholic beverages",
      "Spa treatments"
    ],
    bestSeason: "November to April",
    groupSize: "2-8 people",
    transportation: "Speedboat, seaplane",
    accommodation: "5-star overwater villas"
  },
  {
    id: "indian-ocean-mauritius",
    slug: "mauritius",
    title: "Mauritius Romance & Adventure",
    destination: "Mauritius • Indian Ocean",
    duration: "7 Days / 6 Nights",
    price: 132717,
    originalPrice: 165917,
    image: "https://images.unsplash.com/photo-1539981681805-6c03b3a24f3a?ixlib=rb-4.0.3",
    description: "Discover the diverse beauty of Mauritius with its beaches, mountains, and rich culture.",
    highlights: [
      "Chamarel Seven Colored Earth",
      "Ile aux Cerfs island tour",
      "Port Louis capital tour",
      "Underwater waterfall viewing",
      "Catamaran cruise"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Mauritius",
        description: "Arrive at Sir Seewoosagur Ramgoolam Airport, transfer to hotel, and relaxing evening."
      },
      {
        day: 2,
        title: "North Island Tour",
        description: "Visit Port Louis, Pamplemousses Botanical Garden, and local markets."
      },
      {
        day: 3,
        title: "South Island Adventure",
        description: "Visit Chamarel Waterfall, Seven Colored Earth, and Grand Bassin."
      },
      {
        day: 4,
        title: "Ile aux Cerfs Excursion",
        description: "Full-day catamaran cruise to Ile aux Cerfs with BBQ lunch."
      },
      {
        day: 5,
        title: "Underwater Falls & Helicopter",
        description: "Optional helicopter tour to see underwater waterfall, beach relaxation."
      },
      {
        day: 6,
        title: "Free Day",
        description: "Free day for water sports, spa, or exploring at your own pace."
      },
      {
        day: 7,
        title: "Departure",
        description: "Transfer to airport for departure."
      }
    ],
    inclusions: [
      "6 nights accommodation in 4-star beach resorts",
      "Daily breakfast, 3 dinners",
      "Private airport transfers",
      "Full-day tours with guide",
      "Catamaran cruise with lunch",
      "Entrance fees"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Helicopter tour",
      "Some meals",
      "Personal expenses"
    ],
    bestSeason: "May to December",
    groupSize: "2-12 people",
    transportation: "Private AC vehicle, catamaran",
    accommodation: "4-star beach resorts"
  },
  {
    id: "indian-ocean-seychelles",
    slug: "seychelles",
    title: "Seychelles Island Hopping",
    destination: "Seychelles • Indian Ocean",
    duration: "8 Days / 7 Nights",
    price: 207417,
    originalPrice: 248917,
    image: "https://images.unsplash.com/photo-1548011292-cddc9c51a545?ixlib=rb-4.0.3",
    description: "Experience the pristine beauty of Seychelles with its unique granite boulders and turquoise waters.",
    highlights: [
      "Visit Vallée de Mai Nature Reserve",
      "Anse Source d'Argent beach",
      "Island hopping between Mahe, Praslin, and La Digue",
      "Snorkeling with whale sharks",
      "Giant tortoise sanctuary"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Mahe",
        description: "Arrive at Seychelles International Airport, transfer to hotel, and beach relaxation."
      },
      {
        day: 2,
        title: "Mahe Island Tour",
        description: "Visit Victoria Market, Mission Lodge, and beautiful beaches of Mahe."
      },
      {
        day: 3,
        title: "Ferry to Praslin",
        description: "Take ferry to Praslin, visit Vallée de Mai Nature Reserve."
      },
      {
        day: 4,
        title: "Praslin Beaches",
        description: "Visit Anse Lazio and Anse Georgette beaches, considered among world's best."
      },
      {
        day: 5,
        title: "La Digue Exploration",
        description: "Day trip to La Digue by boat, explore Anse Source d'Argent."
      },
      {
        day: 6,
        title: "Snorkeling Excursion",
        description: "Boat tour to St. Pierre Island for snorkeling with sea turtles."
      },
      {
        day: 7,
        title: "Return to Mahe",
        description: "Return to Mahe, free afternoon for shopping and relaxation."
      },
      {
        day: 8,
        title: "Departure",
        description: "Transfer to airport for departure."
      }
    ],
    inclusions: [
      "7 nights accommodation in 4-star hotels",
      "Daily breakfast",
      "Inter-island ferry transfers",
      "Private tours with guide",
      "Snorkeling equipment",
      "Entrance fees"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Some meals",
      "Personal expenses",
      "Optional activities"
    ],
    bestSeason: "April to October",
    groupSize: "2-10 people",
    transportation: "Private vehicle, ferry, boat",
    accommodation: "4-star beachfront hotels"
  },

  // MIDDLE EAST PACKAGES
  {
    id: "middle-east-uae-dubai",
    slug: "dubai-uae",
    title: "Dubai Luxury Experience",
    destination: "Dubai, UAE • Middle East",
    duration: "5 Days / 4 Nights",
    price: 107817,
    originalPrice: 141017,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3",
    description: "Experience the epitome of luxury in Dubai with its modern architecture, shopping, and desert adventures.",
    highlights: [
      "Burj Khalifa observation deck",
      "Desert safari with dune bashing",
      "Dubai Mall and Fountain Show",
      "Abra ride in Dubai Creek",
      "Atlantis Aquaventure Waterpark"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Dubai",
        description: "Arrive at Dubai International Airport, transfer to hotel, and welcome dinner."
      },
      {
        day: 2,
        title: "Dubai City Tour",
        description: "Visit Burj Khalifa, Dubai Mall, Dubai Fountain, and Gold Souk."
      },
      {
        day: 3,
        title: "Desert Safari",
        description: "Afternoon desert safari with dune bashing, camel ride, and BBQ dinner."
      },
      {
        day: 4,
        title: "Palm Jumeirah & Atlantis",
        description: "Visit Palm Jumeirah, Atlantis Aquaventure, and Dubai Marina."
      },
      {
        day: 5,
        title: "Departure",
        description: "Transfer to airport for departure."
      }
    ],
    inclusions: [
      "4 nights accommodation in 5-star hotels",
      "Daily breakfast",
      "Private airport transfers",
      "Full-day city tour",
      "Desert safari with dinner",
      "Burj Khalifa tickets",
      "Aquaventure Waterpark entry"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Lunch and dinner (except where mentioned)",
      "Personal expenses"
    ],
    bestSeason: "November to March",
    groupSize: "2-15 people",
    transportation: "Private AC vehicle, 4x4 for desert",
    accommodation: "5-star luxury hotels"
  },
  {
    id: "middle-east-uae-abu-dhabi",
    slug: "abu-dhabi-uae",
    title: "Abu Dhabi Grandeur",
    destination: "Abu Dhabi, UAE • Middle East",
    duration: "4 Days / 3 Nights",
    price: 82917,
    originalPrice: 107817,
    image: "https://images.unsplash.com/photo-1555675433-62b872d7c9fa?ixlib=rb-4.0.3",
    description: "Discover the cultural capital of UAE with its magnificent mosques and world-class attractions.",
    highlights: [
      "Sheikh Zayed Grand Mosque",
      "Louvre Abu Dhabi Museum",
      "Ferrari World theme park",
      "Qasr Al Watan palace",
      "Corniche beach"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Abu Dhabi",
        description: "Arrive at Abu Dhabi Airport, transfer to hotel, and evening Corniche walk."
      },
      {
        day: 2,
        title: "Cultural Tour",
        description: "Visit Sheikh Zayed Grand Mosque, Qasr Al Watan, and Heritage Village."
      },
      {
        day: 3,
        title: "Theme Park & Museum",
        description: "Visit Ferrari World and Louvre Abu Dhabi Museum."
      },
      {
        day: 4,
        title: "Departure",
        description: "Transfer to airport for departure."
      }
    ],
    inclusions: [
      "3 nights accommodation in 5-star hotels",
      "Daily breakfast",
      "Private airport transfers",
      "City tour with guide",
      "Entrance fees to attractions",
      "Ferrari World tickets"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Some meals",
      "Personal expenses"
    ],
    bestSeason: "November to March",
    groupSize: "2-12 people",
    transportation: "Private AC vehicle",
    accommodation: "5-star hotels"
  },
  {
    id: "middle-east-oman-muscat",
    slug: "oman-muscat",
    title: "Oman Heritage & Nature",
    destination: "Muscat, Oman • Middle East",
    duration: "6 Days / 5 Nights",
    price: 91217,
    originalPrice: 116117,
    image: "https://images.unsplash.com/photo-1584927348757-97e3a680b11b?ixlib=rb-4.0.3",
    description: "Experience the authentic Arabian culture and stunning natural landscapes of Oman.",
    highlights: [
      "Sultan Qaboos Grand Mosque",
      "Mutrah Souq exploration",
      "Wadi Shab adventure",
      "Wahiba Sands desert camp",
      "Nizwa Fort visit"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Muscat",
        description: "Arrive at Muscat International Airport, transfer to hotel, and welcome dinner."
      },
      {
        day: 2,
        title: "Muscat City Tour",
        description: "Visit Sultan Qaboos Grand Mosque, Royal Opera House, and Mutrah Souq."
      },
      {
        day: 3,
        title: "Wadi Shab & Bimmah Sinkhole",
        description: "Day trip to Wadi Shab for hiking and swimming, visit Bimmah Sinkhole."
      },
      {
        day: 4,
        title: "Nizwa & Wahiba Sands",
        description: "Visit Nizwa Fort and market, drive to Wahiba Sands for desert camp."
      },
      {
        day: 5,
        title: "Wadi Bani Khalid",
        description: "Visit Wadi Bani Khalid, return to Muscat, free evening."
      },
      {
        day: 6,
        title: "Departure",
        description: "Transfer to airport for departure."
      }
    ],
    inclusions: [
      "4 nights hotel + 1 night desert camp",
      "Daily breakfast, 2 dinners",
      "Private airport transfers",
      "4x4 vehicle for desert tours",
      "English-speaking guide",
      "Entrance fees"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Some meals",
      "Personal expenses"
    ],
    bestSeason: "October to April",
    groupSize: "2-10 people",
    transportation: "4x4 vehicles, private car",
    accommodation: "4-star hotels and desert camp"
  },
  {
    id: "middle-east-jordan-petra",
    slug: "jordan-petra",
    title: "Jordan Ancient Wonders",
    destination: "Amman, Jordan • Middle East",
    duration: "7 Days / 6 Nights",
    price: 124417,
    originalPrice: 157617,
    image: "https://images.unsplash.com/photo-1561901572-8a2a8e07a855?ixlib=rb-4.0.3",
    description: "Explore the ancient wonders of Jordan including Petra, Wadi Rum, and the Dead Sea.",
    highlights: [
      "Petra full-day exploration",
      "Wadi Rum desert jeep tour",
      "Dead Sea floating experience",
      "Jerash Roman ruins",
      "Red Sea snorkeling in Aqaba"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Amman",
        description: "Arrive at Queen Alia International Airport, transfer to hotel, and city orientation."
      },
      {
        day: 2,
        title: "Jerash & Amman Tour",
        description: "Visit Jerash Roman ruins and explore Amman's Citadel and Roman Theatre."
      },
      {
        day: 3,
        title: "Petra Exploration",
        description: "Full-day visit to Petra, walking through the Siq to the Treasury."
      },
      {
        day: 4,
        title: "Petra & Wadi Rum",
        description: "Morning visit to Petra, afternoon transfer to Wadi Rum for desert camp."
      },
      {
        day: 5,
        title: "Wadi Rum Jeep Tour",
        description: "Jeep tour of Wadi Rum desert, transfer to Aqaba for Red Sea resort."
      },
      {
        day: 6,
        title: "Dead Sea Experience",
        description: "Visit Dead Sea for floating experience and mud bath, return to Amman."
      },
      {
        day: 7,
        title: "Departure",
        description: "Transfer to airport for departure."
      }
    ],
    inclusions: [
      "5 nights hotel + 1 night desert camp",
      "Daily breakfast, 3 dinners",
      "Private airport transfers",
      "Jeep tour in Wadi Rum",
      "English-speaking guide",
      "Entrance fees to all sites",
      "Dead Sea resort access"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Some meals",
      "Personal expenses"
    ],
    bestSeason: "March to May, September to November",
    groupSize: "2-12 people",
    transportation: "Private AC vehicle, 4x4 jeep",
    accommodation: "4-star hotels and Bedouin desert camp"
  },

  // AFRICA PACKAGES
  {
    id: "africa-kenya-safari",
    slug: "kenya-safari",
    title: "Kenya Safari Adventure",
    destination: "Nairobi, Kenya • Africa",
    duration: "8 Days / 7 Nights",
    price: 207417,
    originalPrice: 248917,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3",
    description: "Experience the ultimate African safari with the Great Migration, Big Five, and stunning landscapes.",
    highlights: [
      "Masai Mara National Reserve",
      "Great Migration river crossing (seasonal)",
      "Lake Nakuru flamingos",
      "Amboseli elephants with Mt. Kilimanjaro backdrop",
      "Maasai village cultural experience"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Nairobi",
        description: "Arrive at Jomo Kenyatta International Airport, transfer to hotel, and welcome dinner."
      },
      {
        day: 2,
        title: "Nairobi to Amboseli",
        description: "Drive to Amboseli National Park, afternoon game drive with Mt. Kilimanjaro views."
      },
      {
        day: 3,
        title: "Amboseli Game Drives",
        description: "Full day game drives in Amboseli, famous for elephant herds and big cats."
      },
      {
        day: 4,
        title: "Amboseli to Lake Nakuru",
        description: "Drive to Lake Nakuru, known for flamingos and rhino sanctuary."
      },
      {
        day: 5,
        title: "Lake Nakuru to Masai Mara",
        description: "Morning game drive at Lake Nakuru, drive to Masai Mara."
      },
      {
        day: 6,
        title: "Masai Mara Game Drive",
        description: "Full day game drive in Masai Mara, search for Big Five."
      },
      {
        day: 7,
        title: "Masai Mara Exploration",
        description: "Morning game drive, afternoon Maasai village visit and cultural experience."
      },
      {
        day: 8,
        title: "Departure",
        description: "Drive back to Nairobi, transfer to airport for departure."
      }
    ],
    inclusions: [
      "7 nights accommodation in safari lodges and camps",
      "All meals during safari",
      "4x4 safari vehicle with pop-up roof",
      "English-speaking safari guide",
      "All park entrance fees",
      "Game drives as per itinerary",
      "Maasai village visit",
      "Bottled water in safari vehicle"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Visa fees",
      "Alcoholic beverages",
      "Tips and gratuities",
      "Personal expenses",
      "Hot air balloon safari (optional)"
    ],
    bestSeason: "July to October (Great Migration), January to February (calving season)",
    groupSize: "2-8 people",
    transportation: "4x4 Land Cruiser with pop-up roof",
    accommodation: "Luxury tented camps and safari lodges"
  },
  {
    id: "africa-tanzania-safari",
    slug: "tanzania-safari",
    title: "Tanzania Safari & Zanzibar",
    destination: "Arusha, Tanzania • Africa",
    duration: "10 Days / 9 Nights",
    price: 273817,
    originalPrice: 331917,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3",
    description: "Combine the best of Tanzania's wildlife with relaxation on the exotic island of Zanzibar.",
    highlights: [
      "Serengeti National Park",
      "Ngorongoro Crater",
      "Tarangire National Park",
      "Zanzibar spice tour",
      "Stone Town UNESCO site"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Arusha",
        description: "Arrive at Kilimanjaro Airport, transfer to hotel, and safari briefing."
      },
      {
        day: 2,
        title: "Tarangire National Park",
        description: "Game drive in Tarangire, famous for baobab trees and elephant herds."
      },
      {
        day: 3,
        title: "Lake Manyara to Serengeti",
        description: "Morning game drive at Lake Manyara, drive to Serengeti."
      },
      {
        day: 4,
        title: "Serengeti Game Drives",
        description: "Full day game drives in Serengeti, following the Great Migration."
      },
      {
        day: 5,
        title: "Serengeti to Ngorongoro",
        description: "Morning game drive, afternoon drive to Ngorongoro Crater rim."
      },
      {
        day: 6,
        title: "Ngorongoro Crater",
        description: "Descend into Ngorongoro Crater for game drive, return to Arusha."
      },
      {
        day: 7,
        title: "Flight to Zanzibar",
        description: "Morning flight to Zanzibar, transfer to beach resort."
      },
      {
        day: 8,
        title: "Spice Tour & Stone Town",
        description: "Explore Zanzibar's spice plantations and historic Stone Town."
      },
      {
        day: 9,
        title: "Beach Relaxation",
        description: "Free day for beach activities, water sports, or spa treatments."
      },
      {
        day: 10,
        title: "Departure",
        description: "Transfer to Zanzibar Airport for departure."
      }
    ],
    inclusions: [
      "6 nights safari lodges + 3 nights Zanzibar beach resort",
      "All meals during safari, breakfast in Zanzibar",
      "4x4 safari vehicle with pop-up roof",
      "Professional safari guide",
      "All park entrance fees",
      "Domestic flight to Zanzibar",
      "Spice tour in Zanzibar",
      "Stone Town walking tour"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Visa fees",
      "Some meals in Zanzibar",
      "Alcoholic beverages",
      "Tips and gratuities",
      "Personal expenses"
    ],
    bestSeason: "June to October, January to February",
    groupSize: "2-8 people",
    transportation: "4x4 safari vehicle, domestic flight",
    accommodation: "Luxury safari lodges and beach resorts"
  },
  {
    id: "africa-south-africa",
    slug: "south-africa-cape-town",
    title: "South Africa Cape & Safari",
    destination: "Cape Town, South Africa • Africa",
    duration: "9 Days / 8 Nights",
    price: 182517,
    originalPrice: 224017,
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-4.0.3",
    description: "Experience the diverse beauty of South Africa from Table Mountain to safari adventures.",
    highlights: [
      "Table Mountain cableway",
      "Cape of Good Hope",
      "Kruger National Park safari",
      "Penguin Colony at Boulders Beach",
      "Wine tasting in Stellenbosch"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Cape Town",
        description: "Arrive at Cape Town International Airport, transfer to hotel, and welcome dinner."
      },
      {
        day: 2,
        title: "Cape Town City Tour",
        description: "Visit Table Mountain, Company's Garden, and V&A Waterfront."
      },
      {
        day: 3,
        title: "Cape Peninsula Tour",
        description: "Drive to Cape of Good Hope, visit Boulders Beach penguins."
      },
      {
        day: 4,
        title: "Wine Lands Tour",
        description: "Explore Stellenbosch and Franschhoek wine regions with tastings."
      },
      {
        day: 5,
        title: "Flight to Kruger",
        description: "Morning flight to Kruger, transfer to safari lodge."
      },
      {
        day: 6,
        title: "Kruger Safari",
        description: "Full day game drives in Kruger National Park."
      },
      {
        day: 7,
        title: "Kruger Safari",
        description: "Morning and afternoon game drives, night drive optional."
      },
      {
        day: 8,
        title: "Kruger to Johannesburg",
        description: "Morning game drive, afternoon flight to Johannesburg."
      },
      {
        day: 9,
        title: "Departure",
        description: "Transfer to O.R. Tambo International Airport for departure."
      }
    ],
    inclusions: [
      "8 nights accommodation (4-star hotels and safari lodges)",
      "Daily breakfast, all meals during safari",
      "Private airport transfers",
      "Cape Peninsula and Wine Lands tours",
      "4x4 safari vehicle in Kruger",
      "All park entrance fees",
      "Domestic flights (Cape Town-Kruger-Johannesburg)"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Some meals",
      "Alcoholic beverages",
      "Tips and gratuities",
      "Personal expenses"
    ],
    bestSeason: "May to September",
    groupSize: "2-12 people",
    transportation: "Private vehicle, domestic flights, safari vehicle",
    accommodation: "4-star city hotels and luxury safari lodges"
  },
  {
    id: "africa-morocco",
    slug: "morocco-marrakech",
    title: "Morocco Imperial Cities & Desert",
    destination: "Marrakech, Morocco • Africa",
    duration: "8 Days / 7 Nights",
    price: 107817,
    originalPrice: 141017,
    image: "https://images.unsplash.com/photo-1489749798305-4a8478471c2e?ixlib=rb-4.0.3",
    description: "Discover the magic of Morocco with its vibrant souks, ancient medinas, and Sahara desert.",
    highlights: [
      "Marrakech Medina and Jemaa el-Fnaa",
      "Atlas Mountains trek",
      "Sahara Desert camel trek",
      "Fes medieval city",
      "Casablanca Hassan II Mosque"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Casablanca",
        description: "Arrive at Mohammed V International Airport, visit Hassan II Mosque, transfer to Rabat."
      },
      {
        day: 2,
        title: "Rabat to Fes",
        description: "Visit Rabat's Royal Palace and Chellah, drive to Fes."
      },
      {
        day: 3,
        title: "Fes City Tour",
        description: "Explore Fes medina, tanneries, and Al-Attarine Madrasa."
      },
      {
        day: 4,
        title: "Fes to Merzouga Desert",
        description: "Drive through Middle Atlas, camel trek in Sahara Desert, camp under stars."
      },
      {
        day: 5,
        title: "Merzouga to Ouarzazate",
        description: "Visit Todra Gorges, drive through Dades Valley to Ouarzazate."
      },
      {
        day: 6,
        title: "Ouarzazate to Marrakech",
        description: "Visit Ait Benhaddou Kasbah, cross High Atlas to Marrakech."
      },
      {
        day: 7,
        title: "Marrakech City Tour",
        description: "Explore Bahia Palace, Koutoubia Mosque, and Jemaa el-Fnaa square."
      },
      {
        day: 8,
        title: "Departure",
        description: "Transfer to Marrakech Airport for departure."
      }
    ],
    inclusions: [
      "7 nights accommodation in riads and desert camp",
      "Daily breakfast, 2 dinners",
      "Private airport transfers",
      "Private vehicle with English-speaking driver",
      "Camel trek in Sahara",
      "Local guides in cities",
      "Entrance fees"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Some meals",
      "Alcoholic beverages",
      "Tips and gratuities",
      "Personal expenses"
    ],
    bestSeason: "March to May, September to November",
    groupSize: "2-12 people",
    transportation: "Private AC vehicle, camel",
    accommodation: "Traditional riads and desert camp"
  },
  {
    id: "africa-egypt",
    slug: "egypt-cairo",
    title: "Egypt Pharaohs & Nile Cruise",
    destination: "Cairo, Egypt • Africa",
    duration: "8 Days / 7 Nights",
    price: 157617,
    originalPrice: 199017,
    image: "https://images.unsplash.com/photo-1539768942893-daf53e448371?ixlib=rb-4.0.3",
    description: "Explore the ancient wonders of Egypt from the Pyramids to the temples of Luxor.",
    highlights: [
      "Great Pyramids of Giza and Sphinx",
      "Egyptian Museum treasures",
      "Nile River cruise",
      "Valley of the Kings",
      "Abu Simbel temples"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Cairo",
        description: "Arrive at Cairo International Airport, transfer to hotel, and welcome dinner."
      },
      {
        day: 2,
        title: "Pyramids & Egyptian Museum",
        description: "Visit Giza Pyramids, Sphinx, and Egyptian Museum with Tutankhamun's treasures."
      },
      {
        day: 3,
        title: "Flight to Aswan",
        description: "Morning flight to Aswan, visit High Dam and Philae Temple."
      },
      {
        day: 4,
        title: "Abu Simbel & Embarkation",
        description: "Optional Abu Simbel tour, afternoon embark on Nile cruise."
      },
      {
        day: 5,
        title: "Kom Ombo & Edfu",
        description: "Visit Kom Ombo Temple and Edfu Temple, sail to Luxor."
      },
      {
        day: 6,
        title: "Luxor West Bank",
        description: "Visit Valley of the Kings, Hatshepsut Temple, and Colossi of Memnon."
      },
      {
        day: 7,
        title: "Luxor East Bank",
        description: "Visit Karnak Temple and Luxor Temple, flight back to Cairo."
      },
      {
        day: 8,
        title: "Departure",
        description: "Transfer to Cairo Airport for departure."
      }
    ],
    inclusions: [
      "7 nights accommodation (4-star hotels + Nile cruise)",
      "Daily breakfast, all meals on cruise",
      "Private airport transfers",
      "Domestic flights (Cairo-Aswan, Luxor-Cairo)",
      "Nile cruise with excursions",
      "English-speaking Egyptologist guide",
      "Entrance fees"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Visa fees",
      "Abu Simbel excursion",
      "Some meals in Cairo",
      "Tips and gratuities",
      "Personal expenses"
    ],
    bestSeason: "October to April",
    groupSize: "2-15 people",
    transportation: "Private vehicle, domestic flights, cruise ship",
    accommodation: "5-star Nile cruise and 4-star hotels"
  },

  // EUROPE PACKAGES
  {
    id: "europe-france-paris",
    slug: "paris-france",
    title: "Paris Romance & Culture",
    destination: "Paris, France • Europe",
    duration: "5 Days / 4 Nights",
    price: 116117,
    originalPrice: 149317,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3",
    description: "Experience the romance and culture of Paris with iconic landmarks and world-class cuisine.",
    highlights: [
      "Eiffel Tower summit access",
      "Louvre Museum guided tour",
      "Seine River cruise",
      "Montmartre and Sacré-Cœur",
      "French cooking class"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paris",
        description: "Arrive at Charles de Gaulle Airport, transfer to hotel, and welcome dinner."
      },
      {
        day: 2,
        title: "Eiffel Tower & Seine Cruise",
        description: "Visit Eiffel Tower, Seine River cruise, and Champs-Élysées."
      },
      {
        day: 3,
        title: "Louvre & Notre-Dame",
        description: "Louvre Museum guided tour, Notre-Dame Cathedral, and Latin Quarter."
      },
      {
        day: 4,
        title: "Montmartre & Cooking Class",
        description: "Explore Montmartre, visit Sacré-Cœur, afternoon French cooking class."
      },
      {
        day: 5,
        title: "Departure",
        description: "Transfer to airport for departure."
      }
    ],
    inclusions: [
      "4 nights accommodation in 4-star hotels",
      "Daily breakfast",
      "Private airport transfers",
      "Eiffel Tower summit tickets",
      "Louvre Museum guided tour",
      "Seine River cruise",
      "French cooking class"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Some meals",
      "Personal expenses"
    ],
    bestSeason: "April to October",
    groupSize: "2-12 people",
    transportation: "Metro, taxi, private transfers",
    accommodation: "4-star central Paris hotels"
  },
  {
    id: "europe-italy-rome",
    slug: "italy-rome",
    title: "Italy Grand Tour",
    destination: "Rome, Italy • Europe",
    duration: "10 Days / 9 Nights",
    price: 190817,
    originalPrice: 232317,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3",
    description: "Experience the best of Italy from ancient Rome to Renaissance Florence and romantic Venice.",
    highlights: [
      "Colosseum and Roman Forum",
      "Vatican Museums and Sistine Chapel",
      "Florence Duomo and Uffizi Gallery",
      "Venice gondola ride",
      "Tuscany wine tasting"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Rome",
        description: "Arrive at Fiumicino Airport, transfer to hotel, and welcome dinner."
      },
      {
        day: 2,
        title: "Ancient Rome",
        description: "Visit Colosseum, Roman Forum, and Palatine Hill."
      },
      {
        day: 3,
        title: "Vatican City",
        description: "Visit Vatican Museums, Sistine Chapel, and St. Peter's Basilica."
      },
      {
        day: 4,
        title: "High-Speed Train to Florence",
        description: "Take high-speed train to Florence, afternoon walking tour."
      },
      {
        day: 5,
        title: "Florence Renaissance",
        description: "Visit Uffizi Gallery, Florence Duomo, and Ponte Vecchio."
      },
      {
        day: 6,
        title: "Tuscany Wine Tour",
        description: "Day trip to Chianti region with wine tasting at local vineyards."
      },
      {
        day: 7,
        title: "Train to Venice",
        description: "High-speed train to Venice, afternoon orientation tour."
      },
      {
        day: 8,
        title: "Venice Exploration",
        description: "Visit St. Mark's Square, Doge's Palace, and gondola ride."
      },
      {
        day: 9,
        title: "Murano & Burano",
        description: "Visit Murano glass factory and colorful Burano island."
      },
      {
        day: 10,
        title: "Departure",
        description: "Transfer to Venice Marco Polo Airport for departure."
      }
    ],
    inclusions: [
      "9 nights accommodation in 4-star hotels",
      "Daily breakfast",
      "Private airport transfers",
      "High-speed train tickets (Rome-Florence-Venice)",
      "Guided tours with skip-the-line tickets",
      "Tuscany wine tour with lunch",
      "Venice gondola ride"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Some meals",
      "Personal expenses"
    ],
    bestSeason: "April to June, September to October",
    groupSize: "2-12 people",
    transportation: "High-speed trains, private vehicles",
    accommodation: "4-star city center hotels"
  },
  {
    id: "europe-spain-barcelona",
    slug: "spain-barcelona",
    title: "Spain & Portugal Discovery",
    destination: "Barcelona, Spain • Europe",
    duration: "12 Days / 11 Nights",
    price: 215717,
    originalPrice: 265517,
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3",
    description: "Discover the vibrant culture of Spain and Portugal from Barcelona to Lisbon.",
    highlights: [
      "Sagrada Familia and Park Güell",
      "Flamenco show in Seville",
      "Alhambra Palace in Granada",
      "Lisbon tram 28 ride",
      "Douro Valley wine tasting"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Barcelona",
        description: "Arrive at Barcelona Airport, transfer to hotel, and Las Ramblas walk."
      },
      {
        day: 2,
        title: "Gaudí Barcelona",
        description: "Visit Sagrada Familia, Park Güell, and Casa Batlló."
      },
      {
        day: 3,
        title: "Train to Madrid",
        description: "High-speed train to Madrid, evening tapas tour."
      },
      {
        day: 4,
        title: "Madrid Royal Tour",
        description: "Visit Royal Palace, Prado Museum, and Plaza Mayor."
      },
      {
        day: 5,
        title: "Train to Seville",
        description: "High-speed train to Seville, evening flamenco show."
      },
      {
        day: 6,
        title: "Seville Highlights",
        description: "Visit Alcázar, Seville Cathedral, and Santa Cruz quarter."
      },
      {
        day: 7,
        title: "Granada & Alhambra",
        description: "Day trip to Granada with Alhambra Palace visit."
      },
      {
        day: 8,
        title: "Bus to Lisbon",
        description: "Scenic drive to Lisbon, crossing into Portugal."
      },
      {
        day: 9,
        title: "Lisbon City Tour",
        description: "Visit Belém Tower, Jerónimos Monastery, and ride tram 28."
      },
      {
        day: 10,
        title: "Sintra & Cascais",
        description: "Day trip to Sintra's Pena Palace and coastal Cascais."
      },
      {
        day: 11,
        title: "Douro Valley Wine Tour",
        description: "Day trip to Douro Valley with wine tasting and river cruise."
      },
      {
        day: 12,
        title: "Departure",
        description: "Transfer to Lisbon Airport for departure."
      }
    ],
    inclusions: [
      "11 nights accommodation in 4-star hotels",
      "Daily breakfast",
      "Private airport transfers",
      "High-speed train tickets",
      "Guided tours with skip-the-line tickets",
      "Flamenco show in Seville",
      "Douro Valley wine tour with lunch"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Some meals",
      "Personal expenses"
    ],
    bestSeason: "March to June, September to November",
    groupSize: "2-12 people",
    transportation: "High-speed trains, private vehicle, bus",
    accommodation: "4-star city center hotels"
  },
  {
    id: "europe-uk-london",
    slug: "london-uk",
    title: "London & Scottish Highlands",
    destination: "London, UK • Europe",
    duration: "9 Days / 8 Nights",
    price: 165917,
    originalPrice: 207417,
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3",
    description: "Experience the best of Britain from London's royal sights to Scotland's dramatic highlands.",
    highlights: [
      "London Eye and Buckingham Palace",
      "Stonehenge mystery",
      "Edinburgh Castle",
      "Scottish Highlands tour",
      "Loch Ness cruise"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in London",
        description: "Arrive at Heathrow Airport, transfer to hotel, and Thames River walk."
      },
      {
        day: 2,
        title: "London Royal Tour",
        description: "Visit Buckingham Palace, Westminster Abbey, and London Eye."
      },
      {
        day: 3,
        title: "British Museum & Covent Garden",
        description: "Explore British Museum, Covent Garden, and West End show."
      },
      {
        day: 4,
        title: "Stonehenge & Bath",
        description: "Day trip to Stonehenge and Roman Baths in Bath."
      },
      {
        day: 5,
        title: "Train to Edinburgh",
        description: "High-speed train to Edinburgh, afternoon city orientation."
      },
      {
        day: 6,
        title: "Edinburgh Castle & Royal Mile",
        description: "Visit Edinburgh Castle, explore Royal Mile and Holyrood Palace."
      },
      {
        day: 7,
        title: "Scottish Highlands",
        description: "Day trip to Scottish Highlands with Loch Ness cruise."
      },
      {
        day: 8,
        title: "St. Andrews & Whisky",
        description: "Visit St. Andrews golf course and Scotch whisky distillery."
      },
      {
        day: 9,
        title: "Departure",
        description: "Transfer to Edinburgh Airport for departure."
      }
    ],
    inclusions: [
      "8 nights accommodation in 4-star hotels",
      "Daily breakfast",
      "Private airport transfers",
      "Train tickets (London-Edinburgh)",
      "Guided tours and entrance fees",
      "West End theatre show",
      "Loch Ness cruise"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Some meals",
      "Personal expenses"
    ],
    bestSeason: "May to September",
    groupSize: "2-12 people",
    transportation: "Trains, private vehicle",
    accommodation: "4-star city center hotels"
  },
  {
    id: "europe-greece-athens",
    slug: "greece-athens",
    title: "Greek Islands Cruise",
    destination: "Athens, Greece • Europe",
    duration: "8 Days / 7 Nights",
    price: 157617,
    originalPrice: 199017,
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3",
    description: "Discover ancient Greek history and the beauty of the Greek islands on this Mediterranean journey.",
    highlights: [
      "Acropolis and Parthenon",
      "Santorini sunset in Oia",
      "Mykonos windmills",
      "Delos archaeological site",
      "Greek cooking class"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Athens",
        description: "Arrive at Athens International Airport, transfer to hotel, and welcome dinner."
      },
      {
        day: 2,
        title: "Athens Ancient Tour",
        description: "Visit Acropolis, Parthenon, and Acropolis Museum."
      },
      {
        day: 3,
        title: "Ferry to Mykonos",
        description: "High-speed ferry to Mykonos, explore Little Venice and windmills."
      },
      {
        day: 4,
        title: "Delos Island Excursion",
        description: "Boat trip to Delos, sacred island of Apollo and Artemis."
      },
      {
        day: 5,
        title: "Ferry to Santorini",
        description: "Ferry to Santorini, visit Oia for famous sunset views."
      },
      {
        day: 6,
        title: "Santorini Exploration",
        description: "Visit Fira, take cable car, explore Akrotiri archaeological site."
      },
      {
        day: 7,
        title: "Volcano & Hot Springs",
        description: "Boat tour to Nea Kameni volcano, swim in hot springs."
      },
      {
        day: 8,
        title: "Departure",
        description: "Transfer to Santorini Airport for departure."
      }
    ],
    inclusions: [
      "7 nights accommodation in 4-star hotels",
      "Daily breakfast",
      "Private airport transfers",
      "High-speed ferry tickets",
      "Guided tours in Athens",
      "Delos island excursion",
      "Volcano boat tour"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Some meals",
      "Personal expenses"
    ],
    bestSeason: "May to October",
    groupSize: "2-15 people",
    transportation: "Ferries, private vehicles",
    accommodation: "4-star hotels and boutique properties"
  },
  {
    id: "europe-croatia-dubrovnik",
    slug: "croatia-dubrovnik",
    title: "Croatia Adriatic Cruise",
    destination: "Dubrovnik, Croatia • Europe",
    duration: "7 Days / 6 Nights",
    price: 132717,
    originalPrice: 165917,
    image: "https://images.unsplash.com/photo-1582666852075-08e0e7b128f3?ixlib=rb-4.0.3",
    description: "Cruise the stunning Adriatic coast, visiting historic cities and beautiful islands.",
    highlights: [
      "Dubrovnik City Walls",
      "Plitvice Lakes National Park",
      "Split Diocletian's Palace",
      "Hvar island party",
      "Krka Waterfalls"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Dubrovnik",
        description: "Arrive at Dubrovnik Airport, transfer to hotel, and Old Town walk."
      },
      {
        day: 2,
        title: "Dubrovnik City Walls",
        description: "Walk city walls, visit Lovrijenac Fort, and Game of Thrones sites."
      },
      {
        day: 3,
        title: "Korčula Island",
        description: "Ferry to Korčula, explore Marco Polo's birthplace."
      },
      {
        day: 4,
        title: "Hvar Island",
        description: "Visit Hvar town, Spanish Fortress, and lavender fields."
      },
      {
        day: 5,
        title: "Split & Diocletian's Palace",
        description: "Explore Split's Old Town and Roman Diocletian's Palace."
      },
      {
        day: 6,
        title: "Krka National Park",
        description: "Visit Krka Waterfalls with swimming under cascades."
      },
      {
        day: 7,
        title: "Departure",
        description: "Transfer to Split Airport for departure."
      }
    ],
    inclusions: [
      "6 nights accommodation in 4-star hotels",
      "Daily breakfast",
      "Private airport transfers",
      "Ferry tickets between islands",
      "City walking tours",
      "National park entrance fees"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Some meals",
      "Personal expenses"
    ],
    bestSeason: "May to October",
    groupSize: "2-12 people",
    transportation: "Ferries, private vehicles",
    accommodation: "4-star hotels and boutique properties"
  },
  // Add these to the AMERICAS section in lib/packages-data.ts

  {
    id: "americas-peru-machu-picchu",
    slug: "peru-machu-picchu",
    title: "Peru Machu Picchu Explorer",
    destination: "Cusco, Peru • Americas",
    duration: "7 Days / 6 Nights",
    price: 157617,
    originalPrice: 199017,
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3",
    description: "Discover the ancient Inca civilization and the mystical Machu Picchu, one of the New Seven Wonders of the World.",
    highlights: [
      "Machu Picchu citadel tour",
      "Sacred Valley exploration",
      "Rainbow Mountain hike",
      "Cusco city tour",
      "Andean cultural experience"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Cusco",
        description: "Arrive at Alejandro Velasco Astete International Airport, transfer to hotel, and acclimatization."
      },
      {
        day: 2,
        title: "Cusco City Tour",
        description: "Visit Qorikancha Temple, Cusco Cathedral, Sacsayhuaman fortress, and nearby ruins."
      },
      {
        day: 3,
        title: "Sacred Valley Tour",
        description: "Visit Pisac Market, Ollantaytambo fortress, and traditional Andean villages."
      },
      {
        day: 4,
        title: "Train to Aguas Calientes",
        description: "Scenic train journey through the Andes to Aguas Calientes, visit hot springs."
      },
      {
        day: 5,
        title: "Machu Picchu Discovery",
        description: "Early morning bus to Machu Picchu, guided tour of the citadel."
      },
      {
        day: 6,
        title: "Rainbow Mountain",
        description: "Day trip to Vinicunca (Rainbow Mountain) with scenic hiking."
      },
      {
        day: 7,
        title: "Departure",
        description: "Transfer to Cusco Airport for departure."
      }
    ],
    inclusions: [
      "6 nights accommodation in 4-star hotels",
      "Daily breakfast, 2 lunches",
      "Private airport transfers",
      "Machu Picchu entrance and guided tour",
      "Vistadome train to Machu Picchu",
      "Sacred Valley and Cusco tours",
      "Rainbow Mountain excursion"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Some meals",
      "Personal expenses",
      "Huayna Picchu mountain hike (optional)"
    ],
    bestSeason: "April to October",
    groupSize: "2-12 people",
    transportation: "Private vehicle, Vistadome train",
    accommodation: "4-star boutique hotels"
  },
  {
    id: "americas-usa-grand-canyon",
    slug: "grand-canyon-usa",
    title: "American Southwest Adventure",
    destination: "Las Vegas, USA • Americas",
    duration: "8 Days / 7 Nights",
    price: 141017,
    originalPrice: 182517,
    image: "https://images.unsplash.com/photo-1505852903341-fc8d3db10436?ixlib=rb-4.0.3",
    description: "Experience the stunning national parks of the American Southwest including the Grand Canyon, Zion, and Bryce Canyon.",
    highlights: [
      "Grand Canyon South Rim",
      "Zion National Park hiking",
      "Bryce Canyon hoodoos",
      "Antelope Canyon tour",
      "Horseshoe Bend viewpoint"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Las Vegas",
        description: "Arrive at McCarran International Airport, transfer to hotel, and evening on the Strip."
      },
      {
        day: 2,
        title: "Las Vegas to Grand Canyon",
        description: "Drive to Grand Canyon South Rim via Route 66, sunset at Mather Point."
      },
      {
        day: 3,
        title: "Grand Canyon Exploration",
        description: "Full day exploring Grand Canyon, optional helicopter tour or hiking."
      },
      {
        day: 4,
        title: "Antelope Canyon & Horseshoe Bend",
        description: "Visit Upper Antelope Canyon, Horseshoe Bend, and Lake Powell."
      },
      {
        day: 5,
        title: "Monument Valley",
        description: "Drive to Monument Valley Navajo Tribal Park, guided jeep tour."
      },
      {
        day: 6,
        title: "Bryce Canyon National Park",
        description: "Visit Bryce Canyon, hike among the hoodoos, sunset at Inspiration Point."
      },
      {
        day: 7,
        title: "Zion National Park",
        description: "Explore Zion National Park, hike the Narrows or Angels Landing."
      },
      {
        day: 8,
        title: "Return to Las Vegas",
        description: "Drive back to Las Vegas, transfer to airport for departure."
      }
    ],
    inclusions: [
      "7 nights accommodation in 3-4 star hotels",
      "Daily breakfast",
      "SUV rental or private driver",
      "National Park entrance fees",
      "Antelope Canyon tour",
      "Monument Valley jeep tour",
      "Detailed itinerary and maps"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Some meals",
      "Fuel and parking",
      "Helicopter tours (optional)",
      "Personal expenses"
    ],
    bestSeason: "March to May, September to November",
    groupSize: "2-8 people",
    transportation: "SUV rental or private vehicle",
    accommodation: "3-4 star hotels and lodges"
  },
  {
    id: "americas-argentina-patagonia",
    slug: "argentina-patagonia",
    title: "Patagonia Adventure",
    destination: "El Calafate, Argentina • Americas",
    duration: "8 Days / 7 Nights",
    price: 207417,
    originalPrice: 248917,
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3",
    description: "Explore the breathtaking landscapes of Patagonia including glaciers, mountains, and pristine lakes.",
    highlights: [
      "Perito Moreno Glacier trekking",
      "Fitz Roy mountain hiking",
      "Torres del Paine National Park",
      "Lake Argentino boat cruise",
      "Estancia ranch experience"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in El Calafate",
        description: "Arrive at Comandante Armando Tola Airport, transfer to hotel, and orientation."
      },
      {
        day: 2,
        title: "Perito Moreno Glacier",
        description: "Visit Los Glaciares National Park, walkways, and optional mini-trekking on glacier."
      },
      {
        day: 3,
        title: "Boat Cruise & Estancia",
        description: "Boat cruise on Lake Argentino, visit Estancia for Patagonian lamb barbecue."
      },
      {
        day: 4,
        title: "Drive to El Chaltén",
        description: "Scenic drive to El Chaltén, the trekking capital of Argentina."
      },
      {
        day: 5,
        title: "Fitz Roy Trek",
        description: "Hike to Laguna de los Tres for iconic Fitz Roy mountain views."
      },
      {
        day: 6,
        title: "Torres del Paine",
        description: "Cross border to Chile, visit Torres del Paine National Park."
      },
      {
        day: 7,
        title: "Torres del Paine Exploration",
        description: "Full day exploring Torres del Paine, visit Grey Glacier and Salto Grande."
      },
      {
        day: 8,
        title: "Departure",
        description: "Transfer to Punta Arenas Airport for departure."
      }
    ],
    inclusions: [
      "7 nights accommodation in 4-star hotels and lodges",
      "Daily breakfast, 3 dinners",
      "Private airport transfers",
      "Perito Moreno Glacier mini-trekking",
      "Boat cruises and park entrances",
      "English-speaking guides",
      "Estancia barbecue lunch"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Some meals",
      "Tips and gratuities",
      "Personal expenses"
    ],
    bestSeason: "November to March (summer)",
    groupSize: "2-10 people",
    transportation: "Private vehicle, boat cruises",
    accommodation: "4-star hotels and mountain lodges"
  },
  {
    id: "americas-costa-rica",
    slug: "costa-rica-adventure",
    title: "Costa Rica Eco Adventure",
    destination: "San José, Costa Rica • Americas",
    duration: "8 Days / 7 Nights",
    price: 132717,
    originalPrice: 165917,
    image: "https://images.unsplash.com/photo-1525755081140-f08cfda32bcb?ixlib=rb-4.0.3",
    description: "Experience the biodiversity of Costa Rica with rainforests, volcanoes, and pristine beaches.",
    highlights: [
      "Arenal Volcano hiking",
      "Monteverde Cloud Forest",
      "Manuel Antonio National Park",
      "Zip-lining through canopy",
      "Wildlife spotting (sloths, monkeys)"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in San José",
        description: "Arrive at Juan Santamaría International Airport, transfer to hotel, and welcome dinner."
      },
      {
        day: 2,
        title: "Arenal Volcano",
        description: "Drive to La Fortuna, visit Arenal Volcano National Park, hot springs."
      },
      {
        day: 3,
        title: "Arenal Adventures",
        description: "Optional activities: hanging bridges, waterfall rappelling, or zip-lining."
      },
      {
        day: 4,
        title: "Monteverde Cloud Forest",
        description: "Drive to Monteverde, afternoon cloud forest walk and hummingbird garden."
      },
      {
        day: 5,
        title: "Monteverde Activities",
        description: "Sky Walk, zip-lining, or night wildlife tour."
      },
      {
        day: 6,
        title: "Manuel Antonio",
        description: "Drive to Manuel Antonio National Park, beach relaxation."
      },
      {
        day: 7,
        title: "Manuel Antonio National Park",
        description: "Guided tour of Manuel Antonio, spot monkeys, sloths, and tropical birds."
      },
      {
        day: 8,
        title: "Departure",
        description: "Transfer to San José Airport for departure."
      }
    ],
    inclusions: [
      "7 nights accommodation in eco-lodges and resorts",
      "Daily breakfast",
      "Private airport transfers",
      "All transportation between destinations",
      "Arenal Volcano hot springs",
      "Monteverde Cloud Forest entrance",
      "Manuel Antonio guided tour"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Some meals",
      "Optional adventure activities",
      "Tips and gratuities",
      "Personal expenses"
    ],
    bestSeason: "December to April (dry season)",
    groupSize: "2-12 people",
    transportation: "Private vehicle with driver",
    accommodation: "Eco-lodges and boutique hotels"
  },
  {
    id: "americas-chile-atacama",
    slug: "chile-atacama",
    title: "Atacama Desert & Easter Island",
    destination: "San Pedro de Atacama, Chile • Americas",
    duration: "9 Days / 8 Nights",
    price: 232317,
    originalPrice: 282117,
    image: "https://images.unsplash.com/photo-1538871667423-476797d75965?ixlib=rb-4.0.3",
    description: "Discover the driest desert in the world and the mysterious Moai statues of Easter Island.",
    highlights: [
      "Valle de la Luna (Moon Valley)",
      "Atacama salt flats",
      "El Tatio geysers",
      "Easter Island Moai statues",
      "Rapa Nui cultural experience"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Calama",
        description: "Arrive at El Loa Airport, transfer to San Pedro de Atacama, and acclimatization."
      },
      {
        day: 2,
        title: "Moon Valley & Salt Flats",
        description: "Visit Valle de la Luna, Death Valley, and Atacama Salt Flats."
      },
      {
        day: 3,
        title: "El Tatio Geysers",
        description: "Early morning visit to El Tatio Geysers, soak in hot springs."
      },
      {
        day: 4,
        title: "Altiplanic Lagoons",
        description: "Visit Miscanti and Miñiques lagoons with flamingos and Andean wildlife."
      },
      {
        day: 5,
        title: "Flight to Easter Island",
        description: "Flight to Easter Island, transfer to hotel, and sunset at Ahu Tahai."
      },
      {
        day: 6,
        title: "Easter Island Tour",
        description: "Visit Rano Raraku quarry, Ahu Tongariki, and Anakena Beach."
      },
      {
        day: 7,
        title: "Orongo Ceremonial Village",
        description: "Visit Orongo village, Rano Kau volcano, and Ahu Vinapu."
      },
      {
        day: 8,
        title: "Free Day & Culture",
        description: "Free day for optional activities: diving, horseback riding, or cultural workshops."
      },
      {
        day: 9,
        title: "Departure",
        description: "Transfer to Mataveri Airport for departure."
      }
    ],
    inclusions: [
      "8 nights accommodation in 4-star hotels",
      "Daily breakfast",
      "Private airport transfers",
      "Atacama Desert tours with guide",
      "Easter Island tours with guide",
      "Inter-island flight (Calama-Santiago-Easter Island)",
      "National park entrance fees"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Some meals",
      "Tips and gratuities",
      "Personal expenses"
    ],
    bestSeason: "March to May, September to November",
    groupSize: "2-10 people",
    transportation: "Private vehicle, domestic flights",
    accommodation: "4-star hotels and eco-lodges"
  },
  {
    id: "americas-colombia-cartagena",
    slug: "colombia-cartagena",
    title: "Colombia Caribbean & Coffee Region",
    destination: "Cartagena, Colombia • Americas",
    duration: "8 Days / 7 Nights",
    price: 116117,
    originalPrice: 149317,
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3",
    description: "Explore the colonial charm of Cartagena and the coffee landscapes of Colombia.",
    highlights: [
      "Cartagena walled city",
      "Rosario Islands snorkeling",
      "Coffee plantation tour",
      "Cocora Valley wax palms",
      "Medellín city transformation"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Cartagena",
        description: "Arrive at Rafael Núñez International Airport, transfer to hotel, and Old City walking tour."
      },
      {
        day: 2,
        title: "Cartagena City Tour",
        description: "Visit Castillo San Felipe, Getsemaní neighborhood, and sunset at Café del Mar."
      },
      {
        day: 3,
        title: "Rosario Islands",
        description: "Boat tour to Rosario Islands, snorkeling, and beach relaxation."
      },
      {
        day: 4,
        title: "Flight to Medellín",
        description: "Morning flight to Medellín, metrocable ride, and Comuna 13 graffiti tour."
      },
      {
        day: 5,
        title: "Coffee Region",
        description: "Drive to Salento, visit coffee plantation, and traditional coffee tasting."
      },
      {
        day: 6,
        title: "Cocora Valley",
        description: "Hike through Cocora Valley, see towering wax palms, visit colorful Salento."
      },
      {
        day: 7,
        title: "Return to Medellín",
        description: "Visit Guatapé Rock, climb 740 steps for panoramic views, return to Medellín."
      },
      {
        day: 8,
        title: "Departure",
        description: "Transfer to José María Córdova International Airport for departure."
      }
    ],
    inclusions: [
      "7 nights accommodation in 4-star hotels",
      "Daily breakfast, 2 lunches",
      "Private airport transfers",
      "Domestic flights (Cartagena-Medellín)",
      "City tours with English-speaking guides",
      "Rosario Islands boat tour",
      "Coffee plantation experience"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Some meals",
      "Tips and gratuities",
      "Personal expenses"
    ],
    bestSeason: "December to March, July to August",
    groupSize: "2-12 people",
    transportation: "Private vehicle, domestic flights",
    accommodation: "4-star colonial and modern hotels"
  }

  
];

// Helper function to get unique destinations
export const getUniqueDestinations = () => {
  const destinations = new Map();
  
  PACKAGES.forEach(pkg => {
    const destNames = pkg.destination.split('•').map(d => d.trim());
    destNames.forEach(dest => {
      if (!destinations.has(dest)) {
        destinations.set(dest, {
          name: dest,
          slug: dest.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'),
          image: pkg.image,
          region: pkg.destination.split('•')[1]?.trim() || 'Uncategorized'
        });
      }
    });
  });
  
  return Array.from(destinations.values());
};

export function searchPackages(filters: {
  destination?: string;
  date?: string;
  category?: string;
}) {
  return PACKAGES.filter((pkg) => {
    const matchesDestination = filters.destination
      ? pkg.destination.toLowerCase().includes(filters.destination.toLowerCase())
      : true;

    const matchesCategory = filters.category
      ? pkg.destination.toLowerCase().includes(filters.category.toLowerCase())
      : true;

    // You can improve date logic later
    const matchesDate = filters.date ? true : true;

    return matchesDestination && matchesCategory && matchesDate;
  });
}

export function getPackageBySlug(slug: string): TourPackage | undefined {
  return PACKAGES.find((pkg) => pkg.slug === slug);
}
