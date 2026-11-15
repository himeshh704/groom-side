export interface EventDetail {
  id: string;
  name: string;
  tagline: string;
  date: string;
  formattedDate: string;
  time: string;
  venue: string;
  address: string;
  city: string;
  dressCode: string;
  description: string;
  iconName: string;
  googleMapsUrl: string;
  calendarLink: string;
}

export interface StoryMoment {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  caption: string;
}

export interface WishMessage {
  id: string;
  name: string;
  relation: string;
  message: string;
  timestamp: string;
  likes: number;
}

export interface ThingToKnow {
  id: string;
  title: string;
  category: 'venue' | 'etiquette' | 'stay' | 'contact';
  description: string;
  icon: string;
  details: string[];
}

export interface WeddingData {
  couple: {
    groom: {
      firstName: string;
      fullName: string;
      title: string;
      about: string;
      parents: string;
      grandparents: string;
      image: string;
    };
    bride: {
      firstName: string;
      fullName: string;
      title: string;
      about: string;
      parents: string;
      grandparents: string;
      image: string;
    };
    hashtag: string;
    hashtags?: { tag: string; label: string; primary?: boolean }[];
    heading: string;
    subheading: string;
    openingFamily?: string;
    rsvpFamily?: string;
  };
  weddingDateISO: string;
  formattedDate: string;
  heroDate?: string;
  city: string;
  venueName: string;
  gurbaniBlessing: {
    gurmukhi: string;
    translation: string;
  };
  events: EventDetail[];
  storyMoments: StoryMoment[];
  preWeddingVideoUrl: string;
  thingsToKnow: ThingToKnow[];
  initialWishes: WishMessage[];
  contacts: {
    name: string;
    relation: string;
    phone: string;
  }[];
  audioTrack: {
    title: string;
    artist: string;
    url: string;
  };
}

export const WEDDING_DATA: WeddingData = {
  couple: {
    groom: {
      firstName: "Deep",
      fullName: "Deep Singh",
      title: "The Groom",
      about: "A gentleman of honour, warm laughter, and quiet elegance. Dedicated to family heritage and walking life's path with devotion, joy, and faith.",
      parents: "Sd. Vicky Singh & Sdr. Poonam Kaur",
      grandparents: "Sd. Jamit Singh & Late Sdr. Raj Kaur",
      image: "/images/gallery/gallery_real_1.jpg"
    },
    bride: {
      firstName: "Ashi",
      fullName: "Ashi Kaur",
      title: "The Bride",
      about: "An ethereal radiance with a compassionate heart. Lover of warmth, family blessings, and timeless togetherness.",
      parents: "Sd. Satyajit Singh & Sdr. Amarpreet Kaur",
      grandparents: "Sd. Kesar Singh & Sdr. Jogendra Kaur",
      image: "/images/gallery/gallery_real_2.jpg"
    },
    hashtag: "#DeepInLoveWithAshi",
    hashtags: [
      { tag: "#DeepInLoveWithAshi", label: "Official Couple Tag", primary: true },
      { tag: "#DeepWedsAshi", label: "Wedding Festivities", primary: false },
      { tag: "#DuaSeHora", label: "Two Families, One Heart", primary: false },
      { tag: "#DeepKiAshi", label: "Sangeet & Bhangra Beats", primary: false },
      { tag: "#ADRoyalWedding", label: "Anand Karaj Nuptials", primary: false }
    ],
    heading: "Deep weds Ashi",
    subheading: "WEDDING INVITATION",
    openingFamily: "The Hora & Dua Family",
    rsvpFamily: "HORA & DUA"
  },
  weddingDateISO: "2026-12-17T11:00:00",
  formattedDate: "17 December 2026",
  heroDate: "15 to 17 December 2026",
  city: "Asansol, West Bengal",
  venueName: "The Grand, Murgasol, Asansol",
  gurbaniBlessing: {
    gurmukhi: "ਸੰਤਾ ਕੈ ਕਾਰਜਿ ਆਪਿ ਖਲੋਇਆ ॥ ਹਰਿ ਕੰਮੁ ਕਰਾਵਣਿ ਆਇਆ ਰਾਮ ॥",
    translation: "The Lord Himself has stood up to resolve the affairs of the Devout; He has arrived to accomplish their tasks."
  },
  events: [
    {
      id: "path-samapti",
      name: "Path Samapti",
      tagline: "Commencement of Divine Blessings",
      date: "8 & 13 December 2026",
      formattedDate: "8th Dec (Bride) & 13th Dec (Groom)",
      time: "Samapti: 12:00 PM (Bride, 8 Dec) / 9:30 AM (Groom, 13 Dec)",
      venue: "Gurudwara Gurunanak Pura, Dhanbad (Bride) & Baba Deep Singh Ji Gurudwara, Asansol (Groom)",
      address: "Dhanbad & Asansol",
      city: "Dhanbad / Asansol",
      dressCode: "Traditional / Formal (Head Covered)",
      description: "Seeking the supreme divine blessings of Sri Guru Granth Sahib Ji as we inaugurate the holy wedding festivities of Ashi & Deep. Sahej Path Samapti on 8th Dec at 12:00 PM at Gurudwara Gurunanak Pura, Dhanbad (Bride's Side) & Akhand Path Samapti on 13th Dec at 9:30 AM at Baba Deep Singh Ji Gurudwara, Asansol (Groom's Side).",
      iconName: "Sparkles",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Gurudwara+Gurunanak+Pura+Dhanbad",
      calendarLink: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Path+Samapti+-+Deep+weds+Ashi&dates=20261208T040000Z/20261213T070000Z&details=Path+Samapti+Celebrations&location=Gurudwara+Gurunanak+Pura,+Dhanbad"
    },
    {
      id: "ring-ceremony",
      name: "Cheers to Forever (Ring Ceremony)",
      tagline: "An Evening of Rings, Toasts & Celebrations",
      date: "15 December 2026",
      formattedDate: "Tuesday, 15th December 2026",
      time: "7:00 PM Onwards",
      venue: "The Grand",
      address: "Murgasol, Asansol, West Bengal",
      city: "Asansol",
      dressCode: "Evening Glitz & Glamour",
      description: "Under starry lights and sparkling toasts, join us to celebrate the exchange of rings and the first toast to forever.",
      iconName: "Sparkles",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Grand+Murgasol+Asansol",
      calendarLink: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Ring+Ceremony+-+Cheers+to+Forever+-+Deep+weds+Ashi&dates=20261215T133000Z/20261215T173000Z&details=Cheers+to+Forever+Ring+Ceremony&location=The+Grand,+Murgasol,+Asansol"
    },
    {
      id: "phoolon-ki-haldi",
      name: "Phoolon Ki Haldi",
      tagline: "Shower of Blossoms, Fragrance & Joy",
      date: "16 December 2026",
      formattedDate: "Wednesday, 16th December 2026",
      time: "11:00 AM Onwards",
      venue: "The Grand",
      address: "Murgasol, Asansol, West Bengal",
      city: "Asansol",
      dressCode: "Hot Pink for Ladies",
      description: "A luminous morning of sacred turmeric blessings, cascading fragrant rose and marigold petals, lively dholki beats, and joyous laughter.",
      iconName: "Sparkles",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Grand+Murgasol+Asansol",
      calendarLink: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Phoolon+ki+Haldi+-+Deep+weds+Ashi&dates=20261216T053000Z/20261216T093000Z&details=Phoolon+Ki+Haldi+Celebration&location=The+Grand,+Murgasol,+Asansol"
    },
    {
      id: "band-baaja-brigade",
      name: "Band Baaja Brigade (Baraat)",
      tagline: "The Grand Royal Wedding Procession",
      date: "16 December 2026",
      formattedDate: "Wednesday, 16th December 2026",
      time: "7:00 PM Onwards",
      venue: "The Grand",
      address: "Murgasol, Asansol, West Bengal",
      city: "Asansol",
      dressCode: "Royal Festive Punjabi / Traditional Formals",
      description: "Resounding beats of Punjabi dhol, brass brass fanfare, and exuberant bhangra energy as the Groom's brigade arrives in full royal style!",
      iconName: "Sparkles",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Grand+Murgasol+Asansol",
      calendarLink: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Band+Baaja+Brigade+Baraat+-+Deep+weds+Ashi&dates=20261216T133000Z/20261216T173000Z&details=Band+Baaja+Brigade+Baraat+Celebration&location=The+Grand,+Murgasol,+Asansol"
    },
    {
      id: "anand-karaj",
      name: "The Blissful Union (Anand Karaj)",
      tagline: "Holy Four Laavan Nuptials (Followed by Lunch)",
      date: "17 December 2026",
      formattedDate: "Thursday, 17th December 2026",
      time: "11:00 AM Onwards",
      venue: "Shri Guru Nanak Gurudwara",
      address: "Asansol, West Bengal (Followed by Lunch at The Grand)",
      city: "Asansol",
      dressCode: "Pastel Elegance / Gurdwara Formal (Head Covered)",
      description: "The sacred spiritual union of Ashi & Deep taking the Four Holy Laavan together in the divine presence of Sri Guru Granth Sahib Ji, followed by celebratory lunch at The Grand.",
      iconName: "Heart",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Shri+Guru+Nanak+Gurudwara+Asansol",
      calendarLink: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=The+Blissful+Union+Anand+Karaj+-+Deep+weds+Ashi&dates=20261217T053000Z/20261217T093000Z&details=Anand+Karaj+Wedding+Ceremony+followed+by+Lunch+at+The+Grand&location=Shri+Guru+Nanak+Gurudwara,+Asansol"
    },
    {
      id: "reception-party",
      name: "Grand Reception Party",
      tagline: "A Night of Elegance, Fine Dining & Music",
      date: "19 December 2026",
      formattedDate: "Saturday, 19th December 2026",
      time: "7:00 PM Onwards",
      venue: "Asansol Club",
      address: "Court Road, Asansol, West Bengal",
      city: "Asansol",
      dressCode: "Black Tie & Elegant Cocktail Formals",
      description: "Join us for a lavish reception evening filled with soulful music, gourmet dining, and celebrations welcoming the newlyweds Ashi & Deep into married life.",
      iconName: "Sparkles",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Asansol+Club+Asansol",
      calendarLink: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Grand+Reception+Party+-+Deep+weds+Ashi&dates=20261219T133000Z/20261219T183000Z&details=Grand+Wedding+Reception+Party&location=Asansol+Club,+Asansol"
    }
  ],
  storyMoments: [
    {
      id: "m1",
      title: "When Two Destinies Intertwined",
      date: "Winter 2024",
      location: "Asansol & Dhanbad",
      description: "Amidst laughter, shared smiles, and elder blessings, two souls discovered that their journeys were meant to walk as one.",
      imageUrl: "/images/gallery/gallery_real_3.jpg",
      caption: "The beginning of an eternal fairytale"
    },
    {
      id: "m2",
      title: "Family Union & Roka Blessings",
      date: "Spring 2025",
      location: "With Elders & Loved Ones",
      description: "With sweet saffron mithai, hearty hugs, and divine prayers, both families united with boundless warmth and love.",
      imageUrl: "/images/gallery/gallery_real_4.jpg",
      caption: "Celebrating timeless bonds of family"
    },
    {
      id: "m3",
      title: "Forever Begins Here",
      date: "December 2026",
      location: "Asansol",
      description: "Stepping into a lifetime of endless laughter, joint adventures, and unconditional companionship under divine grace.",
      imageUrl: "/images/gallery/gallery_real_6.jpg",
      caption: "Two hearts beating as one"
    }
  ],
  preWeddingVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  thingsToKnow: [
    {
      id: "gurdwara-protocol",
      title: "Gurudwara Etiquette",
      category: "etiquette",
      description: "Guidelines for the sacred Anand Karaj ceremony at Shri Guru Nanak Gurudwara.",
      icon: "Church",
      details: [
        "Please cover your head with a scarf, chunni, or rumal before entering the Gurudwara Sahib.",
        "Kindly remove footwear at the entrance counter.",
        "Seating during Anand Karaj is traditionally on the carpeted floor (comfortable Indian attire recommended)."
      ]
    },
    {
      id: "stay-info",
      title: "Stay & Hospitality",
      category: "stay",
      description: "Accommodations and hospitality for outstation guests.",
      icon: "Hotel",
      details: [
        "Accommodations arranged at The Grand, Murgasol, Asansol.",
        "Dedicated transport available between The Grand and Gurudwara Sahib for the Anand Karaj ceremony.",
        "Check-in begins from 15th December 12:00 PM."
      ]
    },
    {
      id: "dress-codes",
      title: "Themes & Attire Guide",
      category: "venue",
      description: "Color inspirations to match each function's energy.",
      icon: "Sparkles",
      details: [
        "15 Dec (Ring Ceremony): Evening Glamour & Cocktail Formals",
        "16 Dec Morning (Haldi): Hot Pink for Ladies",
        "16 Dec Evening (Baraat): Royal Festive Punjabi",
        "17 Dec (Anand Karaj): Pastel Elegance & Regal Gurdwara Attire",
        "19 Dec (Reception): Tuxedo / Black Tie & Indian Regal"
      ]
    },
    {
      id: "hashtag-memories",
      title: "Capture & Tag Us",
      category: "etiquette",
      description: "Share your candid reels, memories, and photos with us!",
      icon: "Camera",
      details: [
        "Official Hashtag: #DeepWedsAshi",
        "Tag the couple on Instagram to feature on our digital memories wall!"
      ]
    }
  ],
  initialWishes: [
    {
      id: "w1",
      name: "Simran & Harpreet",
      relation: "Cousins",
      message: "May Waheguru Ji shower Ashi and Deep with boundless joy, peace, and eternal togetherness! Can't wait for the Baraat and Haldi!",
      timestamp: "Just now",
      likes: 24
    },
    {
      id: "w2",
      name: "The Grewal Family",
      relation: "Family Friends",
      message: "Sending heartiest congratulations to both the Singh families. Ashi and Deep, you look like a royal match made in heaven!",
      timestamp: "2 hours ago",
      likes: 42
    },
    {
      id: "w3",
      name: "Aman & Taran",
      relation: "Friends",
      message: "Counting down the days to celebrate with you guys in Asansol! Get ready for endless bhangra!",
      timestamp: "5 hours ago",
      likes: 19
    }
  ],
  contacts: [
    {
      name: "SD. Satyajit Singh",
      relation: "Bride's Father",
      phone: "+91 98765 43210"
    },
    {
      name: "SD. Vicky Singh",
      relation: "Groom's Father",
      phone: "+91 98765 43211"
    }
  ],
  audioTrack: {
    title: "Kamaal Ho Gea",
    artist: "Satinder Sartaaj",
    url: "/audio/kamaal_ho_gea.mp3"
  }
};
