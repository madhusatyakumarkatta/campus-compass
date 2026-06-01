// ─── lib/data.js — All static data for the Truus website ─────────────────────
// ES Module exports — imported by React components

// Marquee brand logos
export const brands = [
    { name: "oxxio", src: "/assets/Brand Logos SVG/oxxio_logo.svg" },
    { name: "hema", src: "/assets/Brand Logos SVG/hema_logo.svg" },
    { name: "kfc", src: "/assets/Brand Logos SVG/kfc_logo.svg" },
    { name: "swapfiets", src: "/assets/Brand Logos SVG/swapfiets_logo.svg" },
    { name: "anwb", src: "/assets/Brand Logos SVG/anwb_logo.svg" },
    { name: "netflix", src: "/assets/Brand Logos SVG/netflix_logo.svg" },
    { name: "ace-tate", src: "/assets/Brand Logos SVG/ace_tate_logo.svg" },
    { name: "getir", src: "/assets/Brand Logos SVG/getir_logo.svg" }
];

// Marquee background colors
export const colors = [
    "var(--color-green)",
    "var(--color-lightblue)",
    "var(--color-darkblue)",
    "var(--color-lightgreen)",
    "var(--color-orange)",
    "var(--color-maroon)",
    "var(--color-pink)"
];

// Footer social icon links + SVG markup
export const SOCIAL_LINKS = [
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/school/amrita-vishwa-vidyapeetham/',
    },
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/amritavishwavidyapeetham/',
    },
    {
        name: 'TikTok',
        href: 'https://www.youtube.com/user/AmritaUniversity', // Using youtube since tiktok is banned
    }
];

export const CARDS_DATA = [
    {
        color: 'green',
        sticker: 'camera',
        title: 'Student Council',
        description: 'The official representative body of students. We bridge the gap between students and administration, and organize major campus events.',
        services: ['Official Student Body', 'Events & Fests', '@amritastudentcouncil'],
        link: 'https://www.instagram.com/amritastudentcouncil?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
    },
    {
        color: 'darkblue',
        sticker: 'phone',
        title: 'Chakravyuha',
        services: ['Tech & Cultural', 'Flagship Events', '@chakravyuha_avv'],
        description: 'The premier technical and cultural club. We host flagship fests, workshops, and inter-college competitions that bring the campus alive.',
        link: 'https://www.instagram.com/chakravyuha_avv?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
    },
    {
        color: 'orange',
        sticker: 'smiley',
        title: 'Avinya',
        description: 'Where ideas meet reality. The innovation and maker club for all your hardware, software, and robotics dreams.',
        services: ['Innovation Club', 'Tech Projects', '@avinya__av'],
        link: 'https://www.instagram.com/avinya__av?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
    },
    {
        color: 'maroon',
        sticker: 'hand',
        title: 'Avisruta',
        description: 'Amrita\'s official cultural club. Join us for dance, music, drama, and celebrating our diverse cultural heritage.',
        services: ['Cultural Club', 'Dance & Music', '@avisruta_avv'],
        link: 'https://www.instagram.com/avisruta_avv?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
    },
    {
        color: 'pink',
        sticker: 'heart',
        title: 'Prachurya',
        description: 'The literary and speaking club. From heated MUN debates to poetry slams, we help you find and refine your voice.',
        services: ['Literary Club', 'Debates & MUNs', '@prachurya_avv'],
        link: 'https://www.instagram.com/prachurya_avv?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
    },
    {
        color: 'purple',
        sticker: 'smiley',
        title: 'Saptaswara',
        description: 'The official music club of Amrita. From classical to rock, we create the perfect symphony for the campus.',
        services: ['Music Club', 'Jam Sessions', '@saptaswara_av'],
        link: 'https://www.instagram.com/saptaswara_av?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
    }
];

export const TOOLS_DATA = [
    {
        color: 'green',
        sticker: 'smiley',
        title: 'GeeksforGeeks',
        description: 'The ultimate CS portal. Helps you master Data Structures, Algorithms, and prep for technical interviews.',
        services: ['DSA Tutorials', 'Interview Prep', 'Coding Practice'],
        link: 'https://www.geeksforgeeks.org/'
    },
    {
        color: 'orange',
        sticker: 'camera',
        title: 'LeetCode',
        description: 'The gold standard for competitive programming. Helps you crack coding interviews at top tech companies.',
        services: ['Competitive Coding', 'FAANG Prep', 'Weekly Contests'],
        link: 'https://leetcode.com/'
    },
    {
        color: 'pink',
        sticker: 'heart',
        title: 'Codecademy',
        description: 'Interactive coding lessons. Helps beginners learn syntax and build projects in Python, Web Dev, and more.',
        services: ['Interactive Learning', 'Web Dev Paths', 'Beginner Friendly'],
        link: 'https://www.codecademy.com/'
    },
    {
        color: 'darkblue',
        sticker: 'hand',
        title: 'GitHub Pack',
        description: 'A massive bundle of free developer tools. Helps you get free domains, cloud hosting, and pro software licenses.',
        services: ['Free Domains', 'Cloud Hosting', 'Pro Tools'],
        link: 'https://education.github.com/pack'
    },
    {
        color: 'purple',
        sticker: 'smiley',
        title: 'UNiDAYS',
        description: 'Student discount portal. Helps you save big on tech hardware (Apple, Samsung), software, and lifestyle brands.',
        services: ['Student Discounts', 'Apple/Samsung Deals', 'Lifestyle Offers'],
        link: 'https://www.myunidays.com/'
    }
];

export const CAMPUS_DATA = [
    {
        color: 'green',
        title: 'Daily Routine',
        description: 'A typical day: 8:45 AM classes, afternoon labs, evening club activities, and wrapping up at the library or sports ground.',
        image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop'
    },
    {
        color: 'orange',
        title: 'Hostel Life',
        description: 'Your new home. Essential settling-in tips: bring a good umbrella, mosquito net, and get ready for unforgettable late-night study sessions.',
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1000&auto=format&fit=crop'
    },
    {
        color: 'pink',
        title: 'Mess & Food',
        description: 'Fuel your day with our vibrant mess halls. From classic South Indian breakfast routines to late-night canteen snacks.',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop'
    },
    {
        color: 'darkblue',
        title: 'Facilities',
        description: 'State-of-the-art infrastructure. Access central libraries, advanced labs, massive sports complexes, and 24/7 medical centers.',
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop'
    }
];

// ─── Wiggle Intensity Config ────────────────────────────────────────────────
export const WIGGLE_CONFIG = {
    logoMain: 4,
    socials: 5,
    jobHeading: 1,
    googleMap: 1,
    email: 1,
    whatsapp: 1,
};

// ─── Animation Configurations ─────────────────────────────────────────────
export const ANIMATION_CONFIG = {
    transitionScribble: {
        strokeWidthStart: "8%",
        strokeWidthMax: "31%",
        scale: 0.7,
        durationIn: 2.2,
        durationOut: 2.7
    }
};

// ─── Gallery Data ─────────────────────────────────────────────────────────
export const GALLERY_DATA = [
    {
        id: 1,
        embedUrl: 'https://www.instagram.com/p/DG-LiO4J5ao/embed'
    },
    {
        id: 2,
        embedUrl: 'https://www.instagram.com/p/DOFntvBkubf/embed'
    },
    {
        id: 3,
        embedUrl: 'https://www.instagram.com/p/DNckCrDSEKO/embed'
    },
    {
        id: 4,
        embedUrl: 'https://www.instagram.com/p/DVzLWf3Ezo9/embed'
    },
    {
        id: 5,
        embedUrl: 'https://www.instagram.com/p/DUz62uGkxMH/embed'
    },
    {
        id: 6,
        embedUrl: 'https://www.instagram.com/p/DV_gp8MmDVu/embed'
    }
];
