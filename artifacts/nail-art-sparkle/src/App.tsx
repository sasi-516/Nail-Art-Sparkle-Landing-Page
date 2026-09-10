import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronUp,
  Clock3,
  Gem,
  Heart,
  Home as HomeIcon,
  Instagram,
  MapPin,
  Menu,
  Phone,
  Scissors,
  Sparkles,
  Star,
  X,
} from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import NotFound from '@/pages/not-found';

const WHATSAPP_NUMBER = '919731142888';
const CALL_NUMBER = '+919731142888';

const whatsappHref = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const images = {
  hero:
    'https://images.pexels.com/photos/3997382/pexels-photo-3997382.jpeg?auto=compress&cs=tinysrgb&w=1400',
  salon:
    'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=1000',
  home:
    'https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg?auto=compress&cs=tinysrgb&w=1000',
  bridal:
    'https://images.pexels.com/photos/10281101/pexels-photo-10281101.jpeg?auto=compress&cs=tinysrgb&w=1200',
  gallery: [
    'https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg?auto=compress&cs=tinysrgb&w=900',
    'https://images.pexels.com/photos/7755221/pexels-photo-7755221.jpeg?auto=compress&cs=tinysrgb&w=900',
    'https://images.pexels.com/photos/3997392/pexels-photo-3997392.jpeg?auto=compress&cs=tinysrgb&w=900',
    'https://images.pexels.com/photos/3764014/pexels-photo-3764014.jpeg?auto=compress&cs=tinysrgb&w=900',
    'https://images.pexels.com/photos/3997931/pexels-photo-3997931.jpeg?auto=compress&cs=tinysrgb&w=900',
  ],
};

const services = [
  {
    name: 'Polished gel set',
    detail: 'Clean, glossy colour that wears beautifully for up to 3 weeks.',
    price: 'from ₹899',
    duration: '60–75 min',
    tags: ['Everyday', 'Gloss finish'],
    image: images.gallery[0],
  },
  {
    name: 'Acrylic extensions',
    detail: 'Shape, strength and length tailored to your hands and your plans.',
    price: 'from ₹1,299',
    duration: '90–120 min',
    tags: ['Statement', 'Custom shape'],
    image: images.gallery[1],
  },
  {
    name: 'Minimal nail art',
    detail: 'Tiny florals, micro French, chrome details and your exact mood.',
    price: 'from ₹1,099',
    duration: '75–90 min',
    tags: ['Detail work', 'Personalised'],
    image: images.gallery[2],
  },
  {
    name: 'Bridal nails',
    detail: 'A calm, considered set for close-up moments, rituals and photographs.',
    price: 'from ₹1,799',
    duration: '90–120 min',
    tags: ['Bridal', 'Trial available'],
    image: images.bridal,
  },
  {
    name: 'Party-ready set',
    detail: 'Reflective chrome, glitter, gems or a colour story that gets noticed.',
    price: 'from ₹1,499',
    duration: '90 min',
    tags: ['Party', 'High shine'],
    image: images.gallery[3],
  },
  {
    name: 'Removal + refresh',
    detail: 'Gentle removal, shape reset and a fresh finish without rushing your nails.',
    price: 'from ₹499',
    duration: '45–60 min',
    tags: ['Nail care', 'Reset'],
    image: images.home,
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

function Home() {
  const [offerOpen, setOfferOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqIndex, setFaqIndex] = useState<number | null>(0);
  const [toastOpen, setToastOpen] = useState(true);
  const [toastIndex, setToastIndex] = useState(0);
  const [seconds, setSeconds] = useState(8 * 60 + 47);
  const location = useLocation();
  const revealObserver = useRef<IntersectionObserver | null>(null);

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
  }, [location]);

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
    'Hi Nail Art Sparkle, I would love to book an appointment. Please share your next available slots.';

  return (
    <main className="sparkle-noise min-h-[100dvh] overflow-hidden bg-[#FFF8FA] text-[#2A1420]">
      {offerOpen && (
        <aside className="sticky top-0 z-50 bg-[#8C1140] text-[#FFF8FA]" aria-label="Limited time offer">
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

      <header className={`sticky z-40 border-b border-[#B3184F]/10 bg-[#FFF8FA]/88 backdrop-blur-xl ${offerOpen ? 'top-[38px]' : 'top-0'}`}>
        <div className="sparkle-container flex min-h-[72px] items-center justify-between gap-6">
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

          <nav className="hidden items-center gap-7 text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#5E4450] lg:flex" aria-label="Main navigation">
            <a href="#services" className="transition hover:text-[#B3184F]" data-testid="link-nav-services">Services</a>
            <a href="#story" className="transition hover:text-[#B3184F]" data-testid="link-nav-story">Our way</a>
            <a href="#work" className="transition hover:text-[#B3184F]" data-testid="link-nav-work">Our work</a>
            <a href="#faq" className="transition hover:text-[#B3184F]" data-testid="link-nav-faq">FAQ</a>
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <a href="tel:+919731142888" className="sparkle-quiet-button" data-testid="link-call-header">
              <Phone size={14} aria-hidden="true" />
              <span className="hidden xl:inline">Call studio</span>
            </a>
            <a href={whatsappHref(bookMessage)} target="_blank" rel="noreferrer" className="sparkle-primary-button" data-testid="link-book-header">
              Book a set <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>

          <button
            type="button"
            className="rounded-full border border-[#B3184F]/20 p-2.5 text-[#8C1140] sm:hidden"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
        </div>
        {menuOpen && (
          <nav className="sparkle-container grid gap-1 border-t border-[#B3184F]/10 py-3 sm:hidden" aria-label="Mobile navigation">
            {[
              ['Services', '#services'],
              ['Our way', '#story'],
              ['Our work', '#work'],
              ['FAQ', '#faq'],
            ].map(([label, href]) => (
              <a key={href} href={href} className="rounded-xl px-3 py-3 text-xs font-extrabold uppercase tracking-[0.12em] text-[#5E4450] hover:bg-[#F6E7EE]" data-testid={`link-mobile-${label.toLowerCase().replace(' ', '-')}`}>
                {label}
              </a>
            ))}
            <a href={whatsappHref(bookMessage)} target="_blank" rel="noreferrer" className="sparkle-primary-button mt-2" data-testid="link-book-mobile">
              Book a set <ArrowRight size={14} aria-hidden="true" />
            </a>
          </nav>
        )}
      </header>

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
              <div className="sparkle-eyebrow">The menu</div>
              <h2 className="mt-5 max-w-[600px] font-display text-[clamp(2.6rem,5vw,4.9rem)] font-semibold leading-[0.96] tracking-[-0.05em]">
                Pick a mood.<br /><span className="text-[#B3184F]">We’ll make it yours.</span>
              </h2>
            </div>
            <a href={whatsappHref(bookMessage)} target="_blank" rel="noreferrer" className="sparkle-quiet-button" data-testid="link-menu-enquiry">
              Ask for a recommendation <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <article key={service.name} className={`sparkle-reveal sparkle-delay-${(index % 3) + 1} flex flex-col overflow-hidden rounded-[18px] border border-[#B3184F]/10 bg-[#FFF8FA] shadow-[0_10px_30px_rgba(140,17,64,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(140,17,64,0.12)]`}>
                <div className="sparkle-image-frame h-[215px] bg-[#EFD7E3]">
                  <img src={service.image} alt={`${service.name} nail style`} className="sparkle-image" loading="lazy" />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => <span key={tag} className="rounded-full bg-[#EFD7E3] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#8C1140]">{tag}</span>)}
                  </div>
                  <h3 className="mt-4 font-display text-[25px] font-semibold leading-tight tracking-[-0.035em]">{service.name}</h3>
                  <p className="mt-2 min-h-[48px] text-sm leading-6 text-[#5E4450]">{service.detail}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-[#B3184F]/10 pt-4">
                    <div>
                      <span className="block text-sm font-extrabold text-[#8C1140]">{service.price}</span>
                      <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.1em] text-[#5E4450]">{service.duration}</span>
                    </div>
                    <a href={whatsappHref(`Hi Nail Art Sparkle, I am interested in the ${service.name}. Please share availability and details.`)} target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B3184F] text-[#FFF8FA] transition hover:bg-[#8C1140]" aria-label={`Book ${service.name}`} data-testid={`link-book-service-${index}`}>
                      <ArrowRight size={16} aria-hidden="true" />
                    </a>
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
            <a href="tel:+919731142888" className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full border border-[#FFF8FA]/50 px-6 text-xs font-extrabold uppercase tracking-[0.08em] text-[#FFF8FA] transition hover:bg-[#8C1140]" data-testid="link-call-final"><Phone size={14} aria-hidden="true" /> Call the studio</a>
          </div>
        </div>
      </section>

      <footer className="bg-[#2A1420] py-12 text-[#FFF8FA] sm:py-16">
        <div className="sparkle-container grid gap-10 md:grid-cols-[1.3fr_0.7fr_0.7fr]">
          <div>
            <a href="#top" className="flex items-center gap-3" data-testid="link-footer-logo">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B3184F]"><Gem size={18} aria-hidden="true" /></span>
              <span className="font-display text-2xl">Nail Art Sparkle</span>
            </a>
            <p className="mt-5 max-w-[340px] text-sm leading-6 text-[#EFD7E3]">A neighbourhood nail studio in Bangalore for polished plans, personal details and the occasional little extra.</p>
            <div className="mt-6 flex gap-3">
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#FFF8FA]/20 text-[#EFD7E3] transition hover:border-[#B8862F] hover:text-[#B8862F]" aria-label="Instagram" data-testid="link-instagram"><Instagram size={15} aria-hidden="true" /></a>
              <a href={whatsappHref(bookMessage)} target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#FFF8FA]/20 text-[#EFD7E3] transition hover:border-[#B8862F] hover:text-[#B8862F]" aria-label="WhatsApp" data-testid="link-whatsapp-footer"><Phone size={15} aria-hidden="true" /></a>
            </div>
          </div>
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#B8862F]">Visit</div>
            <p className="mt-4 text-sm leading-6 text-[#EFD7E3]">Koramangala, Bangalore<br />Studio visits by appointment</p>
            <a href="https://maps.google.com/?q=Koramangala+Bangalore" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-[#FFF8FA] underline decoration-[#B8862F] underline-offset-4" data-testid="link-map"><MapPin size={13} aria-hidden="true" /> Open in Maps</a>
          </div>
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#B8862F]">Service areas</div>
            <p className="mt-4 text-sm leading-6 text-[#EFD7E3]">Koramangala<br />Indiranagar · HSR Layout<br />HSR · BTM · JP Nagar<br />Nearby areas on request</p>
          </div>
        </div>
        <div className="sparkle-container mt-12 flex flex-col justify-between gap-3 border-t border-[#FFF8FA]/15 pt-5 text-[10px] font-bold uppercase tracking-[0.11em] text-[#EFD7E3]/65 sm:flex-row">
          <span>© 2025 Nail Art Sparkle</span>
          <span>Made for your next close-up</span>
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

      <div className="fixed bottom-4 right-3 z-40 flex flex-col gap-2 sm:bottom-6 sm:right-6">
        <a href={`tel:${CALL_NUMBER}`} className="flex h-12 w-12 items-center justify-center rounded-full border border-[#B3184F]/15 bg-[#FFF8FA] text-[#8C1140] shadow-[0_10px_22px_rgba(140,17,64,0.16)] transition hover:-translate-y-1" aria-label="Call Nail Art Sparkle" data-testid="link-floating-call"><Phone size={18} aria-hidden="true" /></a>
        <a href={whatsappHref(bookMessage)} target="_blank" rel="noreferrer" className="flex h-14 w-14 items-center justify-center rounded-full bg-[#B3184F] text-[#FFF8FA] shadow-[0_12px_26px_rgba(179,24,79,0.28)] transition hover:-translate-y-1 hover:bg-[#8C1140]" aria-label="Book via WhatsApp" data-testid="link-floating-whatsapp"><Phone size={21} aria-hidden="true" /></a>
      </div>
    </main>
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