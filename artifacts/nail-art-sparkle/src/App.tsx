import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronUp,
  Clock3,
  ExternalLink,
  Gem,
  Heart,
  Home as HomeIcon,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Navigation,
  Phone,
  PhoneCall,
  Scissors,
  Sparkles,
  Star,
  X,
} from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import NotFound from '@/pages/not-found';
import StudioLocation, {
  STUDIO_ADDRESS,
  PLUS_CODE,
  GOOGLE_MAPS_DIRECTIONS_URL,
} from '@/components/StudioLocation';
import InstagramShowcase, {
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
} from '@/components/InstagramShowcase';
import MobileBottomBar from '@/components/MobileBottomBar';

const WHATSAPP_NUMBER = '918310158051';
const CALL_NUMBER = '+918310158051';

const whatsappHref = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const images = {
  hero: '/images/hero.jpg',
  salon: '/images/salon.jpg',
  home: '/images/home.jpg',
  bridal: '/images/bridal.jpg',
  chrome: '/images/chrome.jpg',
  biab: '/images/biab.jpg',
  gallery: [
    '/images/hero.jpg',
    '/images/acrylic.jpg',
    '/images/minimal.jpg',
    '/images/party.jpg',
    '/images/cat_eye.jpg',
  ],
};

export interface ServiceItem {
  id: string;
  name: string;
  category: 'extensions' | 'finishes' | 'care' | 'packages';
  categoryLabel: string;
  isHighlighted: boolean;
  detail: string;
  duration: string;
  tags: string[];
  image: string;
}

const HIGHLIGHTED_SERVICE_NAMES = [
  'Soft gel extension',
  'Acrylic Extension',
  'Gel Extension',
  'Bridal nails',
  'Custom nail art',
  'Designer nails',
  'Party nails',
  'Refilling',
  'Gel Polish',
  'Removals',
  'Nail Art',
  'Cateye nails',
  'Chrome nails',
];

const CATEGORIES = [
  { id: 'all', label: '🌟 All Highlights' },
  { id: 'extensions', label: '💅 Extensions & Overlays' },
  { id: 'finishes', label: '✨ Trendy Art & Finishes' },
  { id: 'care', label: '🌿 Maintenance & Care' },
  { id: 'packages', label: '💍 Special Packages' },
];

const services: ServiceItem[] = [
  // --- Category: Nail Extensions & Overlays ---
  {
    id: 'soft-gel-extension',
    name: 'Soft gel extension',
    category: 'extensions',
    categoryLabel: 'Nail Extensions & Overlays',
    isHighlighted: true,
    detail: 'Full-cover pre-formed soft gel tips bonded seamlessly for ultra-natural, feather-light length and gentle, damage-free wear.',
    duration: '75–90 min',
    tags: ['Highlighted', 'Damage-Free', 'Lightweight'],
    image: '/images/biab.jpg',
  },
  {
    id: 'acrylic-extension',
    name: 'Acrylic Extension',
    category: 'extensions',
    categoryLabel: 'Nail Extensions & Overlays',
    isHighlighted: true,
    detail: 'Maximum strength and custom sculpting tailored to your hands in elegant almond, coffin, stiletto, or square shapes.',
    duration: '90–120 min',
    tags: ['Highlighted', 'Statement', 'Custom Shape'],
    image: '/images/acrylic.jpg',
  },
  {
    id: 'gel-extension',
    name: 'Gel Extension',
    category: 'extensions',
    categoryLabel: 'Nail Extensions & Overlays',
    isHighlighted: true,
    detail: 'Lightweight, durable extensions sculpted with premium builder gel for a natural flex and ultra-glossy finish.',
    duration: '90–105 min',
    tags: ['Highlighted', 'Natural Flex', 'Long Wear'],
    image: '/images/hero.jpg',
  },
  {
    id: 'builder-gel-biab',
    name: 'Builder Gel (BIAB)',
    category: 'extensions',
    categoryLabel: 'Nail Extensions & Overlays',
    isHighlighted: false,
    detail: 'Builder in a Bottle overlay that reinforces natural nails, promotes healthy growth, and prevents chipping or cracking.',
    duration: '60–75 min',
    tags: ['Nail Health', 'Natural Strength', 'Trending'],
    image: '/images/biab.jpg',
  },
  {
    id: 'acrylic-overlays',
    name: 'Acrylic Overlays',
    category: 'extensions',
    categoryLabel: 'Nail Extensions & Overlays',
    isHighlighted: false,
    detail: 'Protective acrylic layer applied over your natural length to fortify weak nails without adding artificial extension tips.',
    duration: '60–75 min',
    tags: ['Strength', 'Natural Length'],
    image: '/images/acrylic.jpg',
  },
  {
    id: 'gel-overlays',
    name: 'Gel Overlays',
    category: 'extensions',
    categoryLabel: 'Nail Extensions & Overlays',
    isHighlighted: false,
    detail: 'Flexible gel overlay coating that protects natural nails from peeling while delivering a glossy, chip-resistant shield.',
    duration: '50–60 min',
    tags: ['Everyday Flex', 'Gloss Shield'],
    image: '/images/hero.jpg',
  },

  // --- Category: Trendy Nail Art & Finishes ---
  {
    id: 'chrome-nails',
    name: 'Chrome nails',
    category: 'finishes',
    categoryLabel: 'Trendy Nail Art & Finishes',
    isHighlighted: true,
    detail: 'Ultra-reflective liquid metal glazed chrome finish in rose gold, pearl glazed donut, silver, or bronze mirror luster.',
    duration: '60–75 min',
    tags: ['Highlighted', 'Mirror Glaze', 'Trending'],
    image: '/images/chrome.jpg',
  },
  {
    id: 'cateye-nails',
    name: 'Cateye nails',
    category: 'finishes',
    categoryLabel: 'Trendy Nail Art & Finishes',
    isHighlighted: true,
    detail: 'Mesmerizing magnetic velvet dimension that shifts softly under light with multi-tonal luminous reflections.',
    duration: '60–75 min',
    tags: ['Highlighted', 'Magnetic 3D', 'Velvet Finish'],
    image: '/images/cat_eye.jpg',
  },
  {
    id: 'custom-nail-art',
    name: 'Custom nail art',
    category: 'finishes',
    categoryLabel: 'Trendy Nail Art & Finishes',
    isHighlighted: true,
    detail: 'Bespoke hand-painted designs tailored to your reference photos, moodboards, color palette, or personal aesthetic.',
    duration: '75–100 min',
    tags: ['Highlighted', 'One-of-a-Kind', 'Hand Painted'],
    image: '/images/minimal.jpg',
  },
  {
    id: 'designer-nails',
    name: 'Designer nails',
    category: 'finishes',
    categoryLabel: 'Trendy Nail Art & Finishes',
    isHighlighted: true,
    detail: 'High-fashion intricate compositions combining luxury charms, abstract French lines, aura gradients, and foiled motifs.',
    duration: '90–120 min',
    tags: ['Highlighted', 'Haute Couture', 'Intricate Art'],
    image: '/images/party.jpg',
  },
  {
    id: 'nail-art',
    name: 'Nail Art',
    category: 'finishes',
    categoryLabel: 'Trendy Nail Art & Finishes',
    isHighlighted: true,
    detail: 'Delicate micro florals, clean geometric accents, foil embellishments, and subtle modern hand-painted details.',
    duration: '60–80 min',
    tags: ['Highlighted', 'Artisan Detail', 'Personalised'],
    image: '/images/minimal.jpg',
  },
  {
    id: 'ombre-gradient',
    name: 'Ombré Gradient',
    category: 'finishes',
    categoryLabel: 'Trendy Nail Art & Finishes',
    isHighlighted: false,
    detail: 'Seamless airbrushed or sponge-blended ombre fade from delicate nude to milky white, pastel, or vibrant tones.',
    duration: '60–75 min',
    tags: ['Seamless Fade', 'Baby Boomer'],
    image: '/images/biab.jpg',
  },
  {
    id: '3d-textured-nail-art',
    name: '3D Textured Nail Art',
    category: 'finishes',
    categoryLabel: 'Trendy Nail Art & Finishes',
    isHighlighted: false,
    detail: 'Raised sculpted 3D gel swirls, water droplets, metallic chrome ripples, and tactile gemstone accents.',
    duration: '75–90 min',
    tags: ['Sculpted Gel', 'Tactile Luxe'],
    image: '/images/party.jpg',
  },
  {
    id: 'glitter-sparkle-accents',
    name: 'Glitter & Sparkle Accents',
    category: 'finishes',
    categoryLabel: 'Trendy Nail Art & Finishes',
    isHighlighted: false,
    detail: 'Reflective disco glitter, encapsulated gold leaf flakes, and fine iridescent dust that catches every beam of light.',
    duration: '60–70 min',
    tags: ['High Reflective', 'Sparkle Touch'],
    image: '/images/party.jpg',
  },
  {
    id: 'classic-french-tips',
    name: 'Classic French Tips',
    category: 'finishes',
    categoryLabel: 'Trendy Nail Art & Finishes',
    isHighlighted: false,
    detail: 'Timeless crisp white smile lines over a flawless translucent pink or nude base for timeless elegance.',
    duration: '60 min',
    tags: ['Timeless Chic', 'Clean Aesthetic'],
    image: '/images/minimal.jpg',
  },
  {
    id: 'modern-french-variants',
    name: 'Modern French Variants',
    category: 'finishes',
    categoryLabel: 'Trendy Nail Art & Finishes',
    isHighlighted: false,
    detail: 'Micro-skinny French, double outline tips, metallic chrome borders, and colorful ombre smile lines.',
    duration: '60–75 min',
    tags: ['Modern Twist', 'Micro French'],
    image: '/images/minimal.jpg',
  },

  // --- Category: Maintenance & Care ---
  {
    id: 'gel-polish',
    name: 'Gel Polish',
    category: 'care',
    categoryLabel: 'Maintenance & Care',
    isHighlighted: true,
    detail: 'Immaculate cuticle prep followed by high-gloss gel polish cured under UV LED for up to 3+ weeks wear.',
    duration: '45–60 min',
    tags: ['Highlighted', 'Long Lasting', 'Zero Smudge'],
    image: '/images/hero.jpg',
  },
  {
    id: 'removals',
    name: 'Removals',
    category: 'care',
    categoryLabel: 'Maintenance & Care',
    isHighlighted: true,
    detail: 'Gentle, safe soaking and removal without mechanical scraping or damage to protect your natural nail keratin.',
    duration: '30–45 min',
    tags: ['Highlighted', 'Safe & Gentle', 'Keratin Care'],
    image: '/images/salon.jpg',
  },
  {
    id: 'refilling',
    name: 'Refilling',
    category: 'care',
    categoryLabel: 'Maintenance & Care',
    isHighlighted: true,
    detail: 'Seamless infill of outgrown extensions, rebalancing shape, apex restructuring, and single nail repairs.',
    duration: '60–75 min',
    tags: ['Highlighted', 'Maintenance', 'Apex Rebalance'],
    image: '/images/acrylic.jpg',
  },

  // --- Category: Special Packages ---
  {
    id: 'bridal-nails',
    name: 'Bridal nails',
    category: 'packages',
    categoryLabel: 'Special Packages',
    isHighlighted: true,
    detail: 'Comprehensive bridal curation harmonized with your lehenga, mehendi, and jewelry, featuring Swarovski crystals and pearls.',
    duration: '90–120 min',
    tags: ['Highlighted', 'Bridal Luxe', 'Includes Trial'],
    image: '/images/bridal.jpg',
  },
  {
    id: 'party-nails',
    name: 'Party nails',
    category: 'packages',
    categoryLabel: 'Special Packages',
    isHighlighted: true,
    detail: 'High-impact statement nails with chrome, disco sparkles, and rhinestone embellishments for cocktails, birthdays, or celebrations.',
    duration: '75–90 min',
    tags: ['Highlighted', 'Party Ready', 'High Shine'],
    image: '/images/party.jpg',
  },
  {
    id: 'festive-engagement-sets',
    name: 'Festive & Engagement sets',
    category: 'packages',
    categoryLabel: 'Special Packages',
    isHighlighted: false,
    detail: 'Regal nail artistry curated for engagements, sangeets, and festive celebrations with royal hues and intricate gold detailing.',
    duration: '90–110 min',
    tags: ['Festive Glam', 'Custom Matching'],
    image: '/images/bridal.jpg',
  },
];

const faqs = [
  {
    question: 'Do you offer both salon and at-home appointments?',
    answer:
      'Yes. Choose our cosy studio in Koramangala or request a home appointment across our listed Bangalore service areas. Home slots are planned around travel time, so an early WhatsApp message helps us find the best fit.',
  },
  {
    question: 'How long does a gel or acrylic appointment take?',
    answer:
      'Most gel sets take 60–75 minutes. Acrylics and detailed art usually take 90–120 minutes. We share a realistic time estimate before confirming so your appointment never feels squeezed.',
  },
  {
    question: 'Can I share a reference image before I book?',
    answer:
      'Please do. Reference images are welcome on WhatsApp. We will confirm what is possible for your nail length, finish and budget before you commit to a slot.',
  },
  {
    question: 'How should I prepare for an appointment?',
    answer:
      'Arrive with clean, product-free nails if possible. Please avoid trimming cuticles at home. For bridal clients, we recommend a trial 2–4 weeks before the wedding and a final appointment close to the event.',
  },
  {
    question: 'Do you take group or bridal party bookings?',
    answer:
      'Yes. We can coordinate small bridal and party groups at the salon or travel to you. Send your date, guest count and location for a tailored quote and timing plan.',
  },
];

const reviews = [
  {
    quote:
      'The finish was so neat and the whole appointment felt unhurried. I showed one reference image and got something even more me.',
    name: 'Ananya R.',
    context: 'Gel set, Indiranagar',
  },
  {
    quote:
      'I booked a home appointment for my bridesmaids and it was the easiest part of wedding week. Everyone felt looked after.',
    name: 'Meera S.',
    context: 'Bridal party, HSR Layout',
  },
  {
    quote:
      'The tiny gold details were perfect. Three weeks later, the shape is still lovely and I keep getting asked where I got them done.',
    name: 'Nivedita K.',
    context: 'Minimal nail art, Koramangala',
  },
];

interface EnquiryForm {
  name: string;
  phone: string;
  date: string;
  time: string;
  service: string;
}

function Home() {
  const [offerOpen, setOfferOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);
  const [faqIndex, setFaqIndex] = useState<number | null>(0);
  const [toastOpen, setToastOpen] = useState(true);
  const [toastIndex, setToastIndex] = useState(0);
  const [seconds, setSeconds] = useState(8 * 60 + 47);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);
  const [enquiry, setEnquiry] = useState<EnquiryForm>({
    name: '',
    phone: '',
    date: '',
    time: '',
    service: services[0].name,
  });
  const [pathname] = useLocation();
  const revealObserver = useRef<IntersectionObserver | null>(null);

  const filteredServices = useMemo(() => {
    if (activeHighlight) {
      return services.filter(
        (s) => s.name.toLowerCase() === activeHighlight.toLowerCase(),
      );
    }
    if (selectedCategory === 'all') {
      return services.filter((s) => s.isHighlighted);
    }
    return services.filter((s) => s.category === selectedCategory);
  }, [selectedCategory, activeHighlight]);

  useEffect(() => {
    revealObserver.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll('.sparkle-reveal').forEach((element) => {
      revealObserver.current?.observe(element);
    });

    return () => revealObserver.current?.disconnect();
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSeconds((current) => (current <= 0 ? 8 * 60 + 47 : current - 1));
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!toastOpen) return;
    const interval = window.setInterval(() => {
      setToastIndex((current) => (current + 1) % 4);
    }, 4200);
    return () => window.clearInterval(interval);
  }, [toastOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const time = useMemo(() => {
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
  }, [seconds]);

  const toastMessages = [
    'A bride-to-be just saved the bridal nails guide',
    'Someone in Indiranagar is choosing their gel shade',
    'A party set enquiry just came in',
    'A home appointment request is being planned',
  ];

  const bookMessage =
    'Hi Nail Art Sparkle, I would like to book a nail appointment. Please share the available slots and pricing.';

  return (
    <div className="sparkle-noise bg-[#FFF8FA] text-[#2A1420] pb-16 sm:pb-0">
      {/* Fixed announcement bar - scrolls away naturally */}
      {offerOpen && (
        <aside className="relative z-30 bg-[#8C1140] text-[#FFF8FA]" aria-label="Limited time offer">
          <div className="sparkle-container flex min-h-[38px] items-center justify-center gap-2 px-8 text-center text-[10px] font-extrabold uppercase tracking-[0.1em] sm:gap-4 sm:text-[11px]">
            <Sparkles size={13} className="hidden text-[#EFD7E3] sm:block" aria-hidden="true" />
            <span>New guest glow: 30% off your first appointment</span>
            <span className="hidden text-[#EFD7E3] sm:inline">·</span>
            <span className="font-mono text-[#F6E7EE]" aria-live="polite" data-testid="text-offer-countdown">
              ends in {time}
            </span>
            <button
              type="button"
              aria-label="Dismiss offer"
              className="absolute right-3 rounded-full p-1 text-[#F6E7EE] transition hover:bg-white/10 sm:right-5"
              onClick={() => setOfferOpen(false)}
              data-testid="button-dismiss-offer"
            >
              <X size={14} aria-hidden="true" />
            </button>
          </div>
        </aside>
      )}

      {/* Floating "Call" Option at Top-Left */}
      <aside
        aria-label="Floating direct call option"
        className="fixed top-32 left-3 sm:top-36 sm:left-6 z-30 transition-all duration-300 pointer-events-auto"
      >
        <a
          href={`tel:${CALL_NUMBER}`}
          className="group flex items-center gap-2.5 rounded-full border border-[#B3184F]/30 bg-[#FFF8FA]/95 px-3.5 py-2 sm:px-4 sm:py-2.5 text-[#8C1140] shadow-[0_10px_28px_rgba(140,17,64,0.2)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-[#8C1140] hover:text-[#FFF8FA] active:scale-95"
          data-testid="link-floating-top-call"
          aria-label="Call studio at +91 83101 58051"
        >
          <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[#B3184F] text-[#FFF8FA] group-hover:bg-[#FFF8FA] group-hover:text-[#B3184F] transition-colors shadow-xs">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B3184F] opacity-60"></span>
            <PhoneCall size={14} className="relative z-10" />
          </span>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider leading-none text-[#8C1140] group-hover:text-[#FFF8FA]">
                Call Studio
              </span>
              <span className="hidden sm:inline text-[8px] font-bold uppercase tracking-wider text-[#B8862F] group-hover:text-[#EFD7E3]">
                · Live
              </span>
            </div>
            <span className="text-[9px] font-semibold text-[#5E4450] group-hover:text-[#F6E7EE] leading-none mt-1">
              +91 83101 58051
            </span>
          </div>
        </a>
      </aside>

      {/* Header always sticks to top */}
      <header className="sticky top-0 z-40 w-full border-b border-[#B3184F]/10 bg-[#FFF8FA]/95 backdrop-blur-xl shadow-sm transition-shadow duration-300">
        <div className="sparkle-container flex min-h-[72px] items-center justify-between gap-4 sm:gap-6">
          <a href="#top" className="flex items-center gap-3 no-underline" data-testid="link-logo">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B3184F] text-[#FFF8FA] shadow-[0_7px_18px_rgba(179,24,79,0.22)]">
              <Gem size={18} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span>
              <span className="block font-display text-[17px] font-semibold leading-none tracking-[-0.03em] text-[#8C1140]">
                Nail Art Sparkle
              </span>
              <span className="mt-1 block text-[9px] font-extrabold uppercase tracking-[0.17em] text-[#B8862F]">
                Bangalore · studio + home
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#5E4450] lg:flex" aria-label="Main navigation">
            <a href="#services" className="transition hover:text-[#B3184F]" data-testid="link-nav-services">Services</a>
            <a href="#story" className="transition hover:text-[#B3184F]" data-testid="link-nav-story">Our way</a>
            <a href="#work" className="transition hover:text-[#B3184F]" data-testid="link-nav-work">Lookbook</a>
            <a href="#instagram" className="transition hover:text-[#B3184F]" data-testid="link-nav-instagram">Instagram</a>
            <a href="#location" className="transition hover:text-[#B3184F]" data-testid="link-nav-location">Studio & Map</a>
            <a href="#faq" className="transition hover:text-[#B3184F]" data-testid="link-nav-faq">FAQ</a>
          </nav>

          <div className="hidden items-center gap-2.5 sm:flex">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden xl:inline-flex items-center gap-1.5 rounded-full border border-[#B3184F]/20 bg-[#F6E7EE] px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-wide text-[#8C1140] transition hover:bg-[#EFD7E3]"
              data-testid="link-header-instagram"
            >
              <Instagram size={13} className="text-[#B3184F]" />
              <span>{INSTAGRAM_HANDLE}</span>
            </a>
            <a href={`tel:${CALL_NUMBER}`} className="sparkle-quiet-button flex items-center gap-1.5" data-testid="link-call-header">
              <PhoneCall size={14} className="text-[#B3184F]" aria-hidden="true" />
              <span>Call studio</span>
              <span className="hidden 2xl:inline text-[10px] opacity-75">(+91 83101 58051)</span>
            </a>
            <a href={whatsappHref(bookMessage)} target="_blank" rel="noreferrer" className="sparkle-primary-button" data-testid="link-book-header">
              Book a set <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${CALL_NUMBER}`}
              className="flex items-center gap-1.5 rounded-full border border-[#B3184F]/30 bg-[#F6E7EE] px-2.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-[#8C1140] shadow-xs active:scale-95"
              data-testid="link-mobile-header-call"
              aria-label="Call studio"
            >
              <PhoneCall size={13} className="text-[#B3184F]" />
              <span>Call</span>
            </a>
            <button
              type="button"
              className="relative z-[70] rounded-full border border-[#B3184F]/20 p-2.5 text-[#8C1140]"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-drawer"
              onClick={() => setMenuOpen((open) => !open)}
              data-testid="button-mobile-menu"
            >
              {menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Luxury Mobile Side View Navigation Drawer */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-[#2A1420]/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <aside
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            className="fixed inset-y-0 right-0 z-[65] flex w-[min(88vw,350px)] flex-col justify-between overflow-y-auto bg-[#FFF8FA] p-6 shadow-[0_20px_50px_rgba(42,20,32,0.4)] lg:hidden"
            aria-label="Mobile navigation drawer"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#B3184F]/10 pb-4">
                <a href="#top" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 no-underline">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B3184F] text-[#FFF8FA] shadow-md">
                    <Gem size={18} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-display text-[16px] font-semibold leading-none text-[#8C1140]">
                      Nail Art Sparkle
                    </span>
                    <span className="mt-1 block text-[8px] font-extrabold uppercase tracking-[0.15em] text-[#B8862F]">
                      Koramangala 7th Block · Bangalore
                    </span>
                  </span>
                </a>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full border border-[#B3184F]/20 p-2 text-[#8C1140] hover:bg-[#F6E7EE]"
                  aria-label="Close navigation menu"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              <nav className="mt-4 grid gap-1.5" aria-label="Mobile navigation links">
                {[
                  ['Services', '#services', 'Browse gel, acrylics & nail art'],
                  ['Our way', '#story', 'Studio or doorstep appointments'],
                  ['Lookbook', '#work', 'View photo gallery'],
                  ['Instagram', '#instagram', 'Daily posts @_nailartsparkle'],
                  ['Studio & Map', '#location', '7th Block Koramangala directions'],
                  ['FAQ', '#faq', 'Pricing & timing answers'],
                ].map(([label, href, sub]) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex flex-col rounded-2xl border border-transparent p-3 transition hover:border-[#B3184F]/15 hover:bg-[#F6E7EE]"
                    data-testid={`link-mobile-${label.toLowerCase().replace(/[\s&]+/g, '-')}`}
                  >
                    <span className="text-xs font-extrabold uppercase tracking-[0.1em] text-[#2A1420] group-hover:text-[#B3184F]">
                      {label}
                    </span>
                    <span className="mt-0.5 text-[10px] font-medium text-[#5E4450]">{sub}</span>
                  </a>
                ))}
              </nav>

              {/* Instagram & Address Card in Mobile Drawer */}
              <div className="mt-4 flex flex-col gap-2.5">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl border border-[#B3184F]/20 bg-gradient-to-r from-[#E1306C]/10 via-[#C13584]/10 to-[#833AB4]/10 p-3 shadow-xs"
                  data-testid="link-mobile-drawer-instagram"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#FFDC80] via-[#E1306C] to-[#833AB4] text-white shadow-xs">
                      <Instagram size={16} />
                    </div>
                    <div>
                      <span className="block text-xs font-extrabold text-[#2A1420]">{INSTAGRAM_HANDLE}</span>
                      <span className="text-[10px] font-medium text-[#5E4450]">Follow for stories & slot drops</span>
                    </div>
                  </div>
                  <ExternalLink size={13} className="text-[#8C1140]" />
                </a>

                <div className="rounded-xl border border-[#B3184F]/15 bg-white p-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wide text-[#B8862F]">
                      <MapPin size={11} /> Koramangala Studio
                    </span>
                    <span className="rounded bg-[#F6E7EE] px-1.5 py-0.5 font-mono text-[9px] font-bold text-[#8C1140]">
                      {PLUS_CODE.split(' ')[0]}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] font-semibold text-[#2A1420] leading-snug">
                    7th block, 5th cross, 20th Main Rd
                  </p>
                  <div className="mt-2.5 flex items-center justify-between border-t border-[#B3184F]/10 pt-2 text-[10px]">
                    <span className="font-medium text-[#5E4450]">Open today: 10am – 8pm</span>
                    <a
                      href={GOOGLE_MAPS_DIRECTIONS_URL}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setMenuOpen(false)}
                      className="font-extrabold text-[#B3184F] hover:underline"
                    >
                      Directions →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#B3184F]/15 pt-4 mt-4">
              <div className="grid grid-cols-2 gap-2">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={whatsappHref(bookMessage)}
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-xl border border-[#B3184F] bg-transparent px-3 py-2.5 text-xs font-bold text-[#B3184F] transition-all hover:bg-[#B3184F]/10 gap-1.5 shadow-2xs"
                  data-testid="link-mobile-drawer-whatsapp"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`tel:${CALL_NUMBER}`}
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-xl border border-[#B3184F] bg-[#B3184F] px-3 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#8C1140] gap-1.5 shadow-sm"
                  data-testid="link-mobile-drawer-call"
                >
                  <PhoneCall size={14} />
                  <span>Call now</span>
                </a>
              </div>
              <p className="mt-2 text-center text-[10px] font-semibold text-[#5E4450]">
                Koramangala 7th Block · Direct reply
              </p>
            </div>
          </aside>
        </>
      )}

      <main id="main-content">
      <section id="top" className="relative bg-[#FFF8FA] pb-14 pt-8 sm:pb-20 sm:pt-12">
        <div className="sparkle-container grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">
          <div className="sparkle-reveal order-2 lg:order-1">
            <div className="sparkle-eyebrow">Nail appointments, made personal</div>
            <h1 className="mt-6 max-w-[610px] font-display text-[clamp(3.35rem,7.5vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-[#2A1420]">
              Your hands,<br />
              <span className="text-[#B3184F]">beautifully</span><br />
              remembered.
            </h1>
            <p className="mt-6 max-w-[480px] text-[15px] leading-7 text-[#5E4450] sm:text-[17px]">
              Thoughtful gel, acrylic and nail art for brides, party plans and ordinary days that deserve a little more polish.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappHref(bookMessage)} target="_blank" rel="noreferrer" className="sparkle-primary-button" data-testid="link-book-hero">
                Find my appointment <ArrowRight size={15} aria-hidden="true" />
              </a>
              <a href="#services" className="sparkle-outline-button" data-testid="link-explore-services">
                See services <ArrowDownRight size={15} aria-hidden="true" />
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-[10px] font-extrabold uppercase tracking-[0.13em] text-[#5E4450]">
              <span className="flex items-center gap-2"><Check size={13} className="text-[#B8862F]" aria-hidden="true" /> Salon or at home</span>
              <span className="flex items-center gap-2"><Check size={13} className="text-[#B8862F]" aria-hidden="true" /> Koramangala studio</span>
            </div>
          </div>

          <div className="sparkle-reveal sparkle-delay-1 order-1 relative lg:order-2">
            <div className="absolute -right-5 -top-5 z-10 flex h-[95px] w-[95px] rotate-6 flex-col items-center justify-center rounded-full border border-[#FFF8FA]/80 bg-[#B3184F] text-center text-[#FFF8FA] shadow-[0_18px_38px_rgba(140,17,64,0.22)] sm:-right-7 sm:-top-7 sm:h-[116px] sm:w-[116px]">
              <span className="font-display text-[27px] font-semibold leading-none sm:text-[34px]">30%</span>
              <span className="mt-1 text-[8px] font-extrabold uppercase tracking-[0.1em]">off first set</span>
            </div>
            <div className="sparkle-image-frame relative h-[450px] overflow-hidden rounded-[26px] bg-[#EFD7E3] sm:h-[610px]">
              <img src={images.hero} alt="Close-up of a glossy rose manicure with delicate gold detailing" className="sparkle-image" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-[#2A1420]/55 to-transparent p-5 pt-20 text-[#FFF8FA] sm:p-7 sm:pt-28">
                <div>
                  <span className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#F6E7EE]">The sparkle edit</span>
                  <span className="mt-2 block font-display text-2xl font-medium">Soft rose, sharp finish.</span>
                </div>
                <div className="hidden items-center gap-2 rounded-full border border-[#FFF8FA]/50 bg-[#2A1420]/20 px-3 py-2 text-[10px] font-bold backdrop-blur sm:flex">
                  <Clock3 size={13} aria-hidden="true" /> {time}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-3 hidden w-[210px] rounded-2xl border border-[#B3184F]/10 bg-[#FFF8FA]/95 p-4 shadow-[0_16px_38px_rgba(140,17,64,0.13)] sm:block">
              <div className="flex items-center gap-1 text-[#B8862F]" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((star) => <Star key={star} size={12} fill="currentColor" aria-hidden="true" />)}
              </div>
              <p className="mt-2 text-xs font-semibold leading-5 text-[#5E4450]">“The details were exactly what I had pictured.”</p>
              <span className="mt-2 block text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#B3184F]">— Nivedita, Koramangala</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#B3184F]/10 bg-[#F6E7EE] py-6" aria-label="Studio highlights">
        <div className="sparkle-container grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:gap-4">
          {[
            ['03+', 'years of detail work'],
            ['4.9/5', 'guest-loved finish'],
            ['2 ways', 'studio or doorstep'],
            ['100%', 'your reference welcome'],
          ].map(([stat, label], index) => (
            <div key={stat} className={`sparkle-reveal sparkle-delay-${(index % 3) + 1} border-[#B3184F]/15 px-3 text-center sm:border-r last:border-0`}>
              <div className="font-display text-2xl font-semibold tracking-[-0.04em] text-[#8C1140] sm:text-3xl">{stat}</div>
              <div className="mt-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#5E4450]">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="story" className="bg-[#FFF8FA] py-20 sm:py-28">
        <div className="sparkle-container">
          <div className="sparkle-reveal flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="sparkle-eyebrow">Choose your kind of appointment</div>
              <h2 className="mt-5 max-w-[700px] font-display text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
                Come to us.<br /><span className="text-[#B3184F]">Or let us come to you.</span>
              </h2>
            </div>
            <p className="max-w-[275px] text-sm leading-6 text-[#5E4450]">Same careful prep, same considered finish — just choose the setting that suits your week.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              {
                title: 'The studio appointment',
                subtitle: 'For the full reset',
                body: 'A quiet, light-filled corner in Koramangala with shade stories, good music and time to decide.',
                image: images.salon,
                icon: <Scissors size={18} aria-hidden="true" />,
                message: 'Hi Nail Art Sparkle, I would like to book a studio appointment in Koramangala.',
              },
              {
                title: 'The doorstep appointment',
                subtitle: 'For your own space',
                body: 'We bring the kit, the details and the calm to your home, hotel or getting-ready room.',
                image: images.home,
                icon: <HomeIcon size={18} aria-hidden="true" />,
                message: 'Hi Nail Art Sparkle, I would like to enquire about an at-home appointment.',
              },
            ].map((choice, index) => (
              <article key={choice.title} className={`sparkle-reveal sparkle-delay-${index + 1} group relative min-h-[410px] overflow-hidden rounded-[18px] bg-[#EFD7E3]`}>
                <img src={choice.image} alt={choice.title === 'The studio appointment' ? 'Bright nail studio table with manicure tools' : 'Woman showing a finished manicure at home'} className="sparkle-image absolute inset-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A1420]/75 via-[#2A1420]/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-[#FFF8FA] sm:p-8">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF8FA]/15 text-[#F6E7EE] backdrop-blur">{choice.icon}</div>
                  <div className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#EFD7E3]">{choice.subtitle}</div>
                  <h3 className="mt-2 font-display text-3xl font-medium leading-none sm:text-4xl">{choice.title}</h3>
                  <p className="mt-3 max-w-[380px] text-sm leading-6 text-[#F6E7EE]">{choice.body}</p>
                  <a href={whatsappHref(choice.message)} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[#FFF8FA] underline decoration-[#B8862F] decoration-2 underline-offset-8" data-testid={`link-book-choice-${index}`}>
                    Enquire for this option <ArrowRight size={14} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#F6E7EE] py-20 sm:py-28">
        <div className="sparkle-container">
          <div className="sparkle-reveal flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="sparkle-eyebrow">The Complete Studio Menu</div>
              <h2 className="mt-5 max-w-[600px] font-display text-[clamp(2.6rem,5vw,4.9rem)] font-semibold leading-[0.96] tracking-[-0.05em]">
                Pick a mood.<br /><span className="text-[#B3184F]">We’ll make it yours.</span>
              </h2>
            </div>
            <a href={whatsappHref(bookMessage)} target="_blank" rel="noreferrer" className="sparkle-quiet-button" data-testid="link-menu-enquiry">
              Ask for a recommendation <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>

          {/* Highlighted Services Quick-Filter Bar */}
          <div className="mt-8 rounded-2xl border border-[#B3184F]/15 bg-[#FFF8FA]/80 p-4 sm:p-5 backdrop-blur-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#8C1140] flex items-center gap-1.5">
                <Sparkles size={13} className="text-[#B8862F]" />
                <span>Service Highlights (Quick Select)</span>
              </span>
              {activeHighlight && (
                <button
                  type="button"
                  onClick={() => setActiveHighlight(null)}
                  className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#B3184F] hover:underline"
                >
                  Clear Selection ✕
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {HIGHLIGHTED_SERVICE_NAMES.map((name) => {
                const isActive = activeHighlight?.toLowerCase() === name.toLowerCase();
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => {
                      if (isActive) {
                        setActiveHighlight(null);
                      } else {
                        setActiveHighlight(name);
                      }
                    }}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#B3184F] text-[#FFF8FA] shadow-[0_4px_12px_rgba(179,24,79,0.3)] scale-105'
                        : 'bg-white text-[#2A1420] border border-[#B3184F]/15 hover:border-[#B3184F]/40 hover:bg-[#EFD7E3]/60'
                    }`}
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Switcher Tabs */}
          <div className="mt-8 border-b border-[#B3184F]/15 pb-3">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id && !activeHighlight;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setActiveHighlight(null);
                    }}
                    className={`rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-wide transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#8C1140] text-[#FFF8FA] shadow-sm'
                        : 'bg-[#EFD7E3]/70 text-[#5E4450] hover:bg-[#EFD7E3] hover:text-[#8C1140]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active filtered count info */}
          <div className="mt-4 flex items-center justify-between text-xs font-bold text-[#5E4450]">
            <span>
              {activeHighlight
                ? `Showing: "${activeHighlight}"`
                : selectedCategory === 'all'
                ? `Showing all ${filteredServices.length} highlighted services`
                : `Showing ${filteredServices.length} services in ${CATEGORIES.find((c) => c.id === selectedCategory)?.label.replace(/^[^\w]+/, '')}`}
            </span>
            <span className="hidden sm:inline text-[10px] uppercase tracking-wider text-[#B8862F]">
              All styles customizable to your hands
            </span>
          </div>

          {/* Cards Grid */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service, index) => (
              <article key={service.id || service.name} className="flex flex-col overflow-hidden rounded-[18px] border border-[#B3184F]/10 bg-[#FFF8FA] shadow-[0_10px_30px_rgba(140,17,64,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(140,17,64,0.12)]">
                <div className="sparkle-image-frame h-[215px] bg-[#EFD7E3] relative">
                  <img src={service.image} alt={`${service.name} nail style`} className="sparkle-image" loading="lazy" />
                  {service.isHighlighted && (
                    <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-[#8C1140]/90 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#FFF8FA] backdrop-blur-xs shadow-xs">
                      <Sparkles size={11} className="text-[#FFDC80]" />
                      <span>Highlighted</span>
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-[#8C1140]/10 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#8C1140]">
                      {service.categoryLabel}
                    </span>
                    {service.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-[#EFD7E3] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#5E4450]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-4 font-display text-[23px] font-semibold leading-tight tracking-[-0.035em] text-[#2A1420]">
                    {service.name}
                  </h3>
                  <p className="mt-2 min-h-[48px] text-sm leading-6 text-[#5E4450]">
                    {service.detail}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-[#B3184F]/10 pt-4">
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#5E4450]">
                      <Clock3 size={13} className="text-[#B8862F]" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <a
                        href={whatsappHref(`Hi Nail Art Sparkle, I would like to enquire about ${service.name}. Please share details and slot availability.`)}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-50 text-emerald-700 transition hover:bg-emerald-600 hover:text-white"
                        aria-label={`WhatsApp about ${service.name}`}
                        title="Quick WhatsApp Enquiry"
                      >
                        <MessageCircle size={14} />
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setEnquiry((prev) => ({ ...prev, service: service.name }));
                          setEnquiryOpen(true);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#B3184F] px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#FFF8FA] transition hover:bg-[#8C1140] active:scale-95 shadow-xs cursor-pointer"
                        aria-label={`Enquire about ${service.name}`}
                        data-testid={`button-enquire-service-${index}`}
                      >
                        Enquire <ArrowRight size={12} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="bg-[#FFF8FA] py-20 sm:py-28">
        <div className="sparkle-container">
          <div className="sparkle-reveal grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <div className="sparkle-eyebrow">A little visual proof</div>
              <h2 className="mt-5 font-display text-[clamp(2.6rem,5vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.05em]">Small details.<br /><span className="text-[#B3184F]">Big mood.</span></h2>
            </div>
            <p className="max-w-[420px] text-sm leading-7 text-[#5E4450] lg:justify-self-end">We like nails that look considered, not copied. Save a reference, borrow a detail or come with no plan at all.</p>
          </div>
          <div className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[240px] sm:gap-4 lg:grid-cols-4">
            <div className="sparkle-reveal sparkle-delay-1 sparkle-image-frame row-span-2 rounded-[18px] lg:col-span-2"><img src={images.gallery[0]} alt="Glossy blush manicure with fine line detail" className="sparkle-image" loading="lazy" /></div>
            <div className="sparkle-reveal sparkle-delay-2 sparkle-image-frame rounded-[18px] lg:col-span-2"><img src={images.gallery[1]} alt="Soft pink nails with artistic detail" className="sparkle-image" loading="lazy" /></div>
            <div className="sparkle-reveal sparkle-delay-3 sparkle-image-frame rounded-[18px]"><img src={images.gallery[2]} alt="Close-up of pink nail art and manicure tools" className="sparkle-image" loading="lazy" /></div>
            <div className="sparkle-reveal sparkle-delay-1 sparkle-image-frame rounded-[18px]"><img src={images.gallery[3]} alt="Fresh manicure with a reflective finish" className="sparkle-image" loading="lazy" /></div>
            <div className="sparkle-reveal sparkle-delay-2 hidden rounded-[18px] bg-[#EFD7E3] p-6 lg:block"><div className="flex h-full flex-col justify-between"><Heart size={20} className="text-[#B3184F]" aria-hidden="true" /><p className="max-w-[190px] font-display text-2xl leading-tight text-[#8C1140]">Made for the close-up.</p><span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#5E4450]">Save your reference on WhatsApp</span></div></div>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-[#5E4450]">Selected work · updated weekly</span>
            <a href={whatsappHref('Hi Nail Art Sparkle, I would like to share a nail reference and get your recommendation.')} target="_blank" rel="noreferrer" className="sparkle-quiet-button" data-testid="link-share-reference">Share your reference <ArrowRight size={14} aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      {/* Instagram Showcase & Feed */}
      <InstagramShowcase />

      <section className="bg-[#2A1420] py-20 text-[#FFF8FA] sm:py-28">
        <div className="sparkle-container">
          <div className="sparkle-reveal mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="sparkle-eyebrow text-[#B8862F]">Notes from the chair</div>
              <h2 className="mt-5 max-w-[650px] font-display text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.05em]">The best part is<br /><span className="text-[#EFD7E3]">how you feel after.</span></h2>
            </div>
            <div className="max-w-[245px] text-sm leading-6 text-[#EFD7E3]">Real words from guests who wanted a little more care in the details.</div>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[18px] border border-[#FFF8FA]/15 bg-[#FFF8FA]/15 md:grid-cols-3">
            {reviews.map((review, index) => (
              <figure key={review.name} className={`sparkle-reveal sparkle-delay-${index + 1} bg-[#2A1420] p-6 sm:p-8`}>
                <div className="flex gap-1 text-[#B8862F]" aria-label="5 out of 5 stars">
                  {[0, 1, 2, 3, 4].map((star) => <Star key={star} size={13} fill="currentColor" aria-hidden="true" />)}
                </div>
                <blockquote className="mt-6 font-display text-[22px] leading-[1.25] text-[#FFF8FA]">“{review.quote}”</blockquote>
                <figcaption className="mt-8 border-t border-[#FFF8FA]/15 pt-4">
                  <span className="block text-xs font-extrabold uppercase tracking-[0.12em] text-[#FFF8FA]">{review.name}</span>
                  <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.1em] text-[#EFD7E3]">{review.context}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-4 text-[10px] font-semibold tracking-wide text-[#EFD7E3]/70">Guest notes shown for presentation; connect your verified review feed before publishing as booking data.</p>
        </div>
      </section>

      <section className="bg-[#F6E7EE] py-20 sm:py-28">
        <div className="sparkle-container grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div className="sparkle-reveal relative">
            <div className="sparkle-image-frame relative h-[420px] rounded-[18px] sm:h-[560px]">
              <img src={images.bridal} alt="Bridal manicure with delicate pearl and gold detail" className="sparkle-image" loading="lazy" />
            </div>
            <div className="absolute -bottom-5 -right-2 max-w-[240px] rounded-[18px] bg-[#FFF8FA] p-5 shadow-[0_18px_42px_rgba(140,17,64,0.14)] sm:-right-5">
              <div className="flex items-center gap-2 text-[#B8862F]"><CalendarDays size={15} aria-hidden="true" /><span className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#8C1140]">Bridal diary</span></div>
              <p className="mt-3 font-display text-xl leading-tight text-[#2A1420]">Trials make the final set feel effortless.</p>
            </div>
          </div>
          <div className="sparkle-reveal sparkle-delay-2 lg:pl-8">
            <div className="sparkle-eyebrow">For the bride and her people</div>
            <h2 className="mt-5 font-display text-[clamp(2.7rem,5vw,5rem)] font-semibold leading-[0.96] tracking-[-0.05em]">Your wedding<br /><span className="text-[#B3184F]">close-up, cared for.</span></h2>
            <p className="mt-6 max-w-[500px] text-[15px] leading-7 text-[#5E4450]">From the first reference to the last photograph, we plan the small things: shape, comfort, timing, travel and a finish that still feels like you.</p>
            <ul className="mt-7 grid gap-3 text-sm font-semibold text-[#5E4450]">
              {['Bridal trials and final sets', 'Small group bookings at home or salon', 'Reference-led design planning'].map((item) => <li key={item} className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#B3184F] text-[#FFF8FA]"><Check size={13} aria-hidden="true" /></span>{item}</li>)}
            </ul>
            <a href={whatsappHref('Hi Nail Art Sparkle, I am planning a wedding and would love to enquire about bridal nails and group availability.')} target="_blank" rel="noreferrer" className="sparkle-primary-button mt-8" data-testid="link-bridal-enquiry">Plan my bridal nails <ArrowRight size={14} aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      {/* Studio Location & Interactive Google Map */}
      <StudioLocation onBookClick={() => setEnquiryOpen(true)} />

      <section id="faq" className="bg-[#FFF8FA] py-20 sm:py-28">
        <div className="sparkle-container grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="sparkle-reveal">
            <div className="sparkle-eyebrow">Before you book</div>
            <h2 className="mt-5 font-display text-[clamp(2.7rem,5vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.05em]">Good to<br /><span className="text-[#B3184F]">know.</span></h2>
            <p className="mt-6 max-w-[270px] text-sm leading-6 text-[#5E4450]">Still have a question? Send us a picture, a date or a half-formed idea. We are good at taking it from there.</p>
            <a href={whatsappHref('Hi Nail Art Sparkle, I have a question before booking: ')} target="_blank" rel="noreferrer" className="sparkle-quiet-button mt-7" data-testid="link-faq-question">Ask on WhatsApp <ArrowRight size={14} aria-hidden="true" /></a>
          </div>
          <div className="sparkle-reveal sparkle-delay-1 border-t border-[#B3184F]/15">
            {faqs.map((faq, index) => {
              const isOpen = faqIndex === index;
              return (
                <div key={faq.question} className="border-b border-[#B3184F]/15">
                  <button type="button" className="flex w-full items-center justify-between gap-5 py-5 text-left" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => setFaqIndex(isOpen ? null : index)} data-testid={`button-faq-${index}`}>
                    <span className="font-display text-xl font-semibold tracking-[-0.025em] text-[#2A1420] sm:text-[23px]">{faq.question}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#B3184F]/25 text-[#B3184F]">{isOpen ? <ChevronUp size={15} aria-hidden="true" /> : <ChevronDown size={15} aria-hidden="true" />}</span>
                  </button>
                  <div id={`faq-answer-${index}`} hidden={!isOpen} className="pb-5 pr-12 text-sm leading-7 text-[#5E4450]">{faq.answer}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#B3184F] py-20 text-[#FFF8FA] sm:py-28">
        <div className="absolute -right-24 -top-36 h-[420px] w-[420px] rounded-full border border-[#FFF8FA]/20" />
        <div className="absolute -bottom-48 -left-20 h-[390px] w-[390px] rounded-full border border-[#FFF8FA]/15" />
        <div className="sparkle-container relative text-center">
          <div className="sparkle-reveal sparkle-eyebrow justify-center text-[#EFD7E3]">Your next set starts here</div>
          <h2 className="sparkle-reveal sparkle-delay-1 mx-auto mt-6 max-w-[760px] font-display text-[clamp(3rem,7vw,6.7rem)] font-semibold leading-[0.9] tracking-[-0.06em]">Ready when your<br /><span className="text-[#EFD7E3]">hands are.</span></h2>
          <p className="sparkle-reveal sparkle-delay-2 mx-auto mt-6 max-w-[440px] text-sm leading-7 text-[#F6E7EE]">Tell us the occasion, your area and the mood. We’ll reply with a thoughtful recommendation and the next available slots.</p>
          <div className="sparkle-reveal sparkle-delay-3 mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={whatsappHref(bookMessage)} target="_blank" rel="noreferrer" className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-[#FFF8FA] px-6 text-xs font-extrabold uppercase tracking-[0.08em] text-[#8C1140] transition hover:bg-[#F6E7EE]" data-testid="link-book-final">Book on WhatsApp <ArrowRight size={15} aria-hidden="true" /></a>
            <a href={`tel:${CALL_NUMBER}`} className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full border border-[#FFF8FA]/50 px-6 text-xs font-extrabold uppercase tracking-[0.08em] text-[#FFF8FA] transition hover:bg-[#8C1140]" data-testid="link-call-final"><Phone size={14} aria-hidden="true" /> Call the studio</a>
          </div>
        </div>
      </section>

      <footer className="bg-[#2A1420] py-12 text-[#FFF8FA] sm:py-16">
        <div className="sparkle-container grid gap-10 md:grid-cols-[1.2fr_1fr_0.8fr]">
          <div>
            <a href="#top" className="flex items-center gap-3" data-testid="link-footer-logo">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B3184F]"><Gem size={18} aria-hidden="true" /></span>
              <span className="font-display text-2xl">Nail Art Sparkle</span>
            </a>
            <p className="mt-4 max-w-[340px] text-sm leading-6 text-[#EFD7E3]">
              Boutique nail studio in Koramangala, Bangalore. Unhurried appointments, bespoke nail art & premium doorstep nail services.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 items-center gap-2 rounded-full border border-[#FFF8FA]/20 px-3.5 text-xs font-bold text-[#EFD7E3] transition hover:border-[#B8862F] hover:text-white"
                aria-label="Instagram @_nailartsparkle"
                data-testid="link-instagram"
              >
                <Instagram size={15} aria-hidden="true" className="text-[#E1306C]" />
                <span>{INSTAGRAM_HANDLE}</span>
              </a>
              <a
                href={whatsappHref(bookMessage)}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FFF8FA]/20 text-[#EFD7E3] transition hover:border-[#B8862F] hover:text-[#B8862F]"
                aria-label="WhatsApp"
                data-testid="link-whatsapp-footer"
              >
                <Phone size={15} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#B8862F]">Studio Visit</div>
            <p className="mt-3 text-sm font-semibold leading-6 text-[#FFF8FA]">
              7th block , 5th cross, 20th Main Rd,<br />
              Koramangala, Bengaluru, Karnataka 560095
            </p>
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-mono text-[#EFD7E3]">
              <span>Plus Code:</span>
              <span className="font-bold text-white">{PLUS_CODE}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href={GOOGLE_MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#FFF8FA] underline decoration-[#B8862F] underline-offset-4 hover:text-[#B8862F]"
                data-testid="link-map"
              >
                <MapPin size={13} aria-hidden="true" /> Open Driving Directions
              </a>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#B8862F]">Service Areas</div>
            <p className="mt-3 text-sm leading-6 text-[#EFD7E3]">
              <span className="font-bold text-white">Studio:</span> Koramangala 7th Block<br />
              <span className="font-bold text-white">Doorstep:</span> Indiranagar · HSR Layout · BTM Layout · JP Nagar · Bellandur · Sarjapur Rd
            </p>
            <p className="mt-2 text-xs font-medium text-[#EFD7E3]/70">
              Hours: Mon – Sun: 10:00 AM – 8:00 PM
            </p>
          </div>
        </div>

        <div className="sparkle-container mt-12 flex flex-col justify-between gap-3 border-t border-[#FFF8FA]/15 pt-5 text-[10px] font-bold uppercase tracking-[0.11em] text-[#EFD7E3]/65 sm:flex-row">
          <span>© 2025 Nail Art Sparkle · Koramangala, Bengaluru 560095</span>
          <span>Made for your next close-up · @_nailartsparkle</span>
        </div>
      </footer>

      {toastOpen && (
        <div className="fixed bottom-20 left-3 z-40 flex max-w-[310px] items-start gap-3 rounded-[18px] border border-[#B3184F]/15 bg-[#FFF8FA]/95 p-3 shadow-[0_18px_40px_rgba(140,17,64,0.18)] backdrop-blur sm:bottom-6 sm:left-6" role="status" aria-live="polite" data-testid="status-social-proof">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F6E7EE] text-[#B3184F]"><Sparkles size={15} aria-hidden="true" /></span>
          <div className="pr-4">
            <p className="text-[11px] font-extrabold leading-4 text-[#2A1420]">{toastMessages[toastIndex]}</p>
            <p className="mt-1 text-[9px] font-semibold leading-4 text-[#5E4450]">Sample activity preview — replace with verified live data.</p>
          </div>
          <button type="button" onClick={() => setToastOpen(false)} className="absolute right-2 top-2 rounded-full p-1 text-[#5E4450] hover:bg-[#F6E7EE]" aria-label="Dismiss social proof message" data-testid="button-dismiss-social-proof"><X size={13} aria-hidden="true" /></button>
        </div>
      )}

      {/* ─── Enquiry Modal ─── */}
      {enquiryOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center"
          onClick={(e) => { if (e.target === e.currentTarget) setEnquiryOpen(false); }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="enquiry-modal-title"
        >
          <div className="w-full max-w-[480px] rounded-t-[24px] bg-[#FFF8FA] p-6 shadow-2xl sm:rounded-[24px] sm:p-8">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 id="enquiry-modal-title" className="font-display text-[22px] font-semibold text-[#2A1420] leading-tight">
                  Book an Appointment
                </h3>
                <p className="mt-1 text-[12px] font-semibold text-[#5E4450]">
                  Fill in the details and we'll send your enquiry to WhatsApp.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEnquiryOpen(false)}
                className="rounded-full p-1.5 text-[#5E4450] transition hover:bg-[#F6E7EE]"
                aria-label="Close enquiry form"
              >
                <X size={18} />
              </button>
            </div>

            {/* Trust badge */}
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2.5 border border-emerald-200">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              </span>
              <p className="text-[11px] font-bold text-emerald-800">
                We'll call you back to confirm your slot — no payment needed upfront.
              </p>
            </div>

            {/* Form */}
            <form
              className="mt-5 flex flex-col gap-3.5"
              onSubmit={(e) => {
                e.preventDefault();
                const msg = [
                  `Hi Nail Art Sparkle! I'd like to book an appointment.`,
                  ``,
                  `👤 Name: ${enquiry.name}`,
                  `📱 Phone: ${enquiry.phone}`,
                  `💅 Service: ${enquiry.service}`,
                  `📅 Preferred Date: ${enquiry.date || 'Flexible'}`,
                  `🕐 Preferred Time: ${enquiry.time || 'Flexible'}`,
                  ``,
                  `Please confirm my slot and share pricing details. Thank you!`,
                ].join('\n');
                window.open(whatsappHref(msg), '_blank', 'noopener,noreferrer');
                setEnquiryOpen(false);
              }}
            >
              <div className="grid gap-3.5 sm:grid-cols-2">
                <div>
                  <label htmlFor="enquiry-name" className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#5E4450]">Your Name *</label>
                  <input
                    id="enquiry-name"
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={enquiry.name}
                    onChange={(e) => setEnquiry((p) => ({ ...p, name: e.target.value }))}
                    className="w-full rounded-xl border border-[#B3184F]/20 bg-white px-3.5 py-2.5 text-sm text-[#2A1420] placeholder-[#B3184F]/30 outline-none transition focus:border-[#B3184F]/60 focus:ring-2 focus:ring-[#B3184F]/15"
                  />
                </div>
                <div>
                  <label htmlFor="enquiry-phone" className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#5E4450]">Phone Number *</label>
                  <input
                    id="enquiry-phone"
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={enquiry.phone}
                    onChange={(e) => setEnquiry((p) => ({ ...p, phone: e.target.value }))}
                    className="w-full rounded-xl border border-[#B3184F]/20 bg-white px-3.5 py-2.5 text-sm text-[#2A1420] placeholder-[#B3184F]/30 outline-none transition focus:border-[#B3184F]/60 focus:ring-2 focus:ring-[#B3184F]/15"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="enquiry-service" className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#5E4450]">Service *</label>
                <select
                  id="enquiry-service"
                  required
                  value={enquiry.service}
                  onChange={(e) => setEnquiry((p) => ({ ...p, service: e.target.value }))}
                  className="w-full rounded-xl border border-[#B3184F]/20 bg-white px-3.5 py-2.5 text-sm text-[#2A1420] outline-none transition focus:border-[#B3184F]/60 focus:ring-2 focus:ring-[#B3184F]/15 appearance-none cursor-pointer"
                >
                  <optgroup label="🌟 Highlighted Services">
                    {services.filter((s) => s.isHighlighted).map((s) => (
                      <option key={`high-${s.id}`} value={s.name}>{s.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="💅 Nail Extensions & Overlays">
                    {services.filter((s) => s.category === 'extensions').map((s) => (
                      <option key={`ext-${s.id}`} value={s.name}>{s.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="✨ Trendy Nail Art & Finishes">
                    {services.filter((s) => s.category === 'finishes').map((s) => (
                      <option key={`fin-${s.id}`} value={s.name}>{s.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="🌿 Maintenance & Care">
                    {services.filter((s) => s.category === 'care').map((s) => (
                      <option key={`care-${s.id}`} value={s.name}>{s.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="💍 Special Packages">
                    {services.filter((s) => s.category === 'packages').map((s) => (
                      <option key={`pkg-${s.id}`} value={s.name}>{s.name}</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div className="grid gap-3.5 sm:grid-cols-2">
                <div>
                  <label htmlFor="enquiry-date" className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#5E4450]">Preferred Date</label>
                  <input
                    id="enquiry-date"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={enquiry.date}
                    onChange={(e) => setEnquiry((p) => ({ ...p, date: e.target.value }))}
                    className="w-full rounded-xl border border-[#B3184F]/20 bg-white px-3.5 py-2.5 text-sm text-[#2A1420] outline-none transition focus:border-[#B3184F]/60 focus:ring-2 focus:ring-[#B3184F]/15"
                  />
                </div>
                <div>
                  <label htmlFor="enquiry-time" className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#5E4450]">Preferred Time</label>
                  <select
                    id="enquiry-time"
                    value={enquiry.time}
                    onChange={(e) => setEnquiry((p) => ({ ...p, time: e.target.value }))}
                    className="w-full rounded-xl border border-[#B3184F]/20 bg-white px-3.5 py-2.5 text-sm text-[#2A1420] outline-none transition focus:border-[#B3184F]/60 focus:ring-2 focus:ring-[#B3184F]/15 cursor-pointer"
                  >
                    <option value="">Any time</option>
                    <option value="10:00 AM – 12:00 PM">10:00 AM – 12:00 PM</option>
                    <option value="12:00 PM – 2:00 PM">12:00 PM – 2:00 PM</option>
                    <option value="2:00 PM – 4:00 PM">2:00 PM – 4:00 PM</option>
                    <option value="4:00 PM – 6:00 PM">4:00 PM – 6:00 PM</option>
                    <option value="6:00 PM – 8:00 PM">6:00 PM – 8:00 PM</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-[#B3184F] py-3.5 text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#FFF8FA] shadow-[0_6px_20px_rgba(179,24,79,0.35)] transition hover:bg-[#8C1140] active:scale-[0.98]"
              >
                <MessageCircle size={16} aria-hidden="true" />
                Send Enquiry on WhatsApp
              </button>
              <p className="text-center text-[10px] font-semibold text-[#5E4450]">
                After submitting, we'll reach out on the number you share to confirm your slot.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Single Notification Floating Contact Trigger Widget */}
      <div className="fixed bottom-20 right-4 z-30 sm:bottom-6 sm:right-6">
        {contactOpen && (
          <div
            className="absolute bottom-16 right-0 mb-2 w-[300px] rounded-2xl border border-[#B3184F]/20 bg-[#FFF8FA] p-4 shadow-[0_20px_50px_rgba(140,17,64,0.28)] backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 sm:w-[320px]"
            data-testid="contact-popover"
          >
            <div className="flex items-center justify-between border-b border-[#B3184F]/10 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
                </span>
                <div>
                  <h4 className="font-display text-sm font-semibold text-[#2A1420]">Get in Touch</h4>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#B8862F]">Studio · Usually replies in mins</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setContactOpen(false)}
                className="rounded-full p-1 text-[#5E4450] transition hover:bg-[#F6E7EE]"
                aria-label="Close contact popover"
              >
                <X size={15} />
              </button>
            </div>

            <div className="mt-3 flex flex-col gap-2.5">
              <a
                href={whatsappHref(bookMessage)}
                target="_blank"
                rel="noreferrer"
                onClick={() => setContactOpen(false)}
                className="group flex items-center gap-3.5 rounded-xl border border-emerald-500/25 bg-emerald-50/80 p-3 text-emerald-950 transition hover:border-emerald-500/50 hover:bg-emerald-100/80 shadow-xs"
                data-testid="link-contact-whatsapp"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm transition group-hover:scale-105">
                  <MessageCircle size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-950">WhatsApp Chat</span>
                    <span className="rounded bg-emerald-200/80 px-1.5 py-0.5 text-[9px] font-extrabold text-emerald-900">Fastest</span>
                  </div>
                  <p className="mt-0.5 text-[11px] font-semibold text-emerald-800">Bookings & share reference photos</p>
                </div>
              </a>

              <a
                href={`tel:${CALL_NUMBER}`}
                onClick={() => setContactOpen(false)}
                className="group flex items-center gap-3.5 rounded-xl border border-[#B3184F]/20 bg-[#F6E7EE]/80 p-3 text-[#2A1420] transition hover:border-[#B3184F]/40 hover:bg-[#EFD7E3] shadow-xs"
                data-testid="link-contact-call"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#B3184F] text-white shadow-sm transition group-hover:scale-105">
                  <PhoneCall size={19} />
                </div>
                <div className="flex-1">
                  <span className="block text-xs font-extrabold uppercase tracking-wider text-[#8C1140]">Direct Phone Call</span>
                  <p className="mt-0.5 text-[11px] font-semibold text-[#5E4450]">+91 8310158051 · Talk to studio</p>
                </div>
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => setContactOpen(false)}
                className="group flex items-center gap-3.5 rounded-xl border border-[#B3184F]/20 bg-[#FFF8FA] p-3 text-[#2A1420] transition hover:border-[#B3184F]/40 hover:bg-[#F6E7EE] shadow-xs"
                data-testid="link-contact-instagram"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#FFDC80] via-[#E1306C] to-[#833AB4] text-white shadow-sm transition group-hover:scale-105">
                  <Instagram size={19} />
                </div>
                <div className="flex-1">
                  <span className="block text-xs font-extrabold uppercase tracking-wider text-[#8C1140]">Instagram DM</span>
                  <p className="mt-0.5 text-[11px] font-semibold text-[#5E4450]">{INSTAGRAM_HANDLE} · Follow & Inquire</p>
                </div>
              </a>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            setContactOpen((prev) => !prev);
            setHasNotification(false);
          }}
          className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-[#B3184F] text-[#FFF8FA] shadow-[0_12px_30px_rgba(179,24,79,0.35)] transition-all duration-300 hover:scale-105 hover:bg-[#8C1140] active:scale-95 ${
            contactOpen ? 'rotate-90 bg-[#8C1140]' : ''
          }`}
          aria-label="Contact options"
          aria-expanded={contactOpen}
          data-testid="button-floating-contact"
        >
          {contactOpen ? (
            <X size={24} aria-hidden="true" />
          ) : (
            <MessageCircle size={24} aria-hidden="true" />
          )}

          {hasNotification && !contactOpen && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-extrabold text-white shadow-md ring-2 ring-[#FFF8FA] animate-bounce">
              1
            </span>
          )}
        </button>
      </div>
      </main>

      {/* Mobile-first Thumb Action Bar */}
      <MobileBottomBar onBookClick={() => setEnquiryOpen(true)} />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Router />
    </WouterRouter>
  );
}

export default App;