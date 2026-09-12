import { useState } from 'react';
import {
  MapPin,
  Navigation,
  Copy,
  Check,
  Clock3,
  Car,
  Compass,
  ExternalLink,
  MessageCircle,
  PhoneCall,
  Sparkles,
} from 'lucide-react';

interface StudioLocationProps {
  onBookClick?: () => void;
}

export const STUDIO_ADDRESS = '7th block, 5th cross, 20th Main Rd, Koramangala, Bengaluru, Karnataka 560095';
export const PLUS_CODE = 'WJQ9+GJ Bengaluru, Karnataka';
export const WHATSAPP_NUMBER = '918310158051';
export const CALL_NUMBER = '+918310158051';

export const GOOGLE_MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  STUDIO_ADDRESS,
)}`;

export const GOOGLE_MAPS_SEARCH_URL = `https://maps.google.com/?q=${encodeURIComponent(
  PLUS_CODE,
)}`;

export const APPLE_MAPS_URL = `https://maps.apple.com/?q=${encodeURIComponent(
  STUDIO_ADDRESS,
)}`;

export default function StudioLocation({ onBookClick }: StudioLocationProps) {
  const [addressCopied, setAddressCopied] = useState(false);
  const [plusCodeCopied, setPlusCodeCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(STUDIO_ADDRESS);
      setAddressCopied(true);
      setTimeout(() => setAddressCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleCopyPlusCode = async () => {
    try {
      await navigator.clipboard.writeText(PLUS_CODE);
      setPlusCodeCopied(true);
      setTimeout(() => setPlusCodeCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const whatsappVisitHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi Nail Art Sparkle, I would like to visit your Koramangala studio (7th Block, 20th Main Rd). Please share today's available time slots!",
  )}`;

  return (
    <section id="location" className="relative bg-[#FFF8FA] py-16 sm:py-24 overflow-hidden border-t border-[#B3184F]/10">
      {/* Decorative ambient gradients */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-[#B3184F]/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-[#B8862F]/5 blur-3xl" />

      <div className="sparkle-container relative">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#B3184F]/15 bg-[#F6E7EE] px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#8C1140]">
              <MapPin size={12} className="text-[#B3184F]" aria-hidden="true" />
              Visit Our Koramangala Studio
            </div>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,4.5vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-[#2A1420]">
              Find us in <br />
              <span className="text-[#B3184F]">Koramangala 7th Block.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#5E4450]">
            Nestled on 20th Main Road, our intimate boutique salon is designed for unhurried, private appointments. Pop in for a quiet reset or book our travel artist to come straight to your home.
          </p>
        </div>

        {/* Main Grid: Studio Info Card + Embedded Map */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Left Column: Address & Details (5 cols) */}
          <div className="flex flex-col justify-between rounded-[24px] border border-[#B3184F]/15 bg-white p-6 sm:p-8 shadow-[0_16px_40px_rgba(140,17,64,0.06)] lg:col-span-5">
            <div>
              {/* Studio Status Chip */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#B3184F]/10 pb-5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-xs font-bold text-emerald-800">Open Today · 10:00 AM – 8:00 PM</span>
                </div>
                <span className="rounded-full bg-[#F6E7EE] px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#8C1140]">
                  Slots by Booking
                </span>
              </div>

              {/* Exact Physical Address */}
              <div className="mt-6">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#B8862F]">
                  Physical Studio Address
                </span>
                <p className="mt-2 text-base font-semibold leading-relaxed text-[#2A1420] sm:text-lg">
                  7th block , 5th cross, 20th Main Rd, Koramangala, Bengaluru, Karnataka 560095
                </p>
              </div>

              {/* Plus Code Badge & Copy Tools */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 rounded-xl border border-[#B3184F]/15 bg-[#FFF8FA] px-3 py-1.5 text-xs font-mono font-bold text-[#8C1140]">
                  <Compass size={13} className="text-[#B3184F]" />
                  <span>{PLUS_CODE}</span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1 rounded-lg border border-[#B3184F]/20 bg-[#F6E7EE] px-2.5 py-1.5 text-[11px] font-bold text-[#8C1140] transition hover:bg-[#EFD7E3] active:scale-95"
                  title="Copy full street address"
                  data-testid="button-copy-address"
                >
                  {addressCopied ? (
                    <>
                      <Check size={13} className="text-emerald-600" />
                      <span className="text-emerald-700">Address Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCopyPlusCode}
                  className="inline-flex items-center gap-1 rounded-lg border border-[#B3184F]/20 bg-[#F6E7EE] px-2.5 py-1.5 text-[11px] font-bold text-[#8C1140] transition hover:bg-[#EFD7E3] active:scale-95"
                  title="Copy Google Plus Code"
                  data-testid="button-copy-plus-code"
                >
                  {plusCodeCopied ? (
                    <>
                      <Check size={13} className="text-emerald-600" />
                      <span className="text-emerald-700">Plus Code Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy Plus Code</span>
                    </>
                  )}
                </button>
              </div>

              {/* Travel & Landmark Cards */}
              <div className="mt-6 grid gap-3 pt-3">
                <div className="flex items-start gap-3 rounded-xl bg-[#FFF8FA] p-3 border border-[#B3184F]/10 text-xs">
                  <Car size={16} className="mt-0.5 shrink-0 text-[#B3184F]" />
                  <div>
                    <span className="font-bold text-[#2A1420]">Landmark & Accessibility:</span>
                    <p className="mt-0.5 text-[#5E4450]">
                      Located on 20th Main Rd at 5th Cross corner. Easy cab & auto drop-off point, 2-wheeler & road parking available.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-[#FFF8FA] p-3 border border-[#B3184F]/10 text-xs">
                  <Clock3 size={16} className="mt-0.5 shrink-0 text-[#B8862F]" />
                  <div>
                    <span className="font-bold text-[#2A1420]">Hours of Operation:</span>
                    <p className="mt-0.5 text-[#5E4450]">
                      Monday to Sunday: 10:00 AM – 8:00 PM (Prior WhatsApp confirmation recommended to reserve technician time).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-[#F6E7EE] p-3 border border-[#B3184F]/15 text-xs">
                  <Sparkles size={16} className="mt-0.5 shrink-0 text-[#B3184F]" />
                  <div>
                    <span className="font-bold text-[#8C1140]">Doorstep Service in Bengaluru:</span>
                    <p className="mt-0.5 text-[#5E4450]">
                      Prefer your sofa? We travel across Koramangala, Indiranagar, HSR, Bellandur, JP Nagar & BTM.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-5 border-t border-[#B3184F]/15 flex flex-col gap-2.5 sm:flex-row">
              <a
                href={GOOGLE_MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#B3184F] px-4 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-md transition hover:bg-[#8C1140] active:scale-95"
                data-testid="link-maps-directions"
              >
                <Navigation size={15} />
                Get Driving Directions
              </a>

              <a
                href={whatsappVisitHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-600 bg-emerald-50 px-4 py-3 text-xs font-extrabold uppercase tracking-wider text-emerald-800 transition hover:bg-emerald-100 active:scale-95"
                data-testid="link-maps-whatsapp"
              >
                <MessageCircle size={15} className="text-emerald-600" />
                Ask Location on WhatsApp
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Embedded Google Map (7 cols) */}
          <div className="relative flex flex-col overflow-hidden rounded-[24px] border border-[#B3184F]/20 bg-white shadow-[0_16px_45px_rgba(140,17,64,0.09)] lg:col-span-7">
            {/* Top Bar for Map */}
            <div className="flex items-center justify-between border-b border-[#B3184F]/10 bg-[#FFF8FA] px-5 py-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#B3184F] text-white">
                  <MapPin size={13} />
                </span>
                <span className="font-bold text-[#2A1420]">Nail Art Sparkle · 7th Block Koramangala</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={GOOGLE_MAPS_SEARCH_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:inline-flex items-center gap-1 font-bold text-[#B3184F] hover:underline"
                  data-testid="link-open-google-maps-tab"
                >
                  <span>Google Maps</span>
                  <ExternalLink size={12} />
                </a>
                <a
                  href={APPLE_MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden md:inline-flex items-center gap-1 font-bold text-[#5E4450] hover:underline"
                  data-testid="link-open-apple-maps-tab"
                >
                  <span>Apple Maps</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Embedded Google Maps iFrame */}
            <div className="relative h-[340px] w-full flex-1 sm:min-h-[420px] bg-[#EFD7E3]">
              <iframe
                title="Nail Art Sparkle Koramangala Google Map Location"
                src="https://maps.google.com/maps?q=7th%20block%2C%205th%20cross%2C%2020th%20Main%20Rd%2C%20Koramangala%2C%20Bengaluru%2C%20Karnataka%20560095&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full object-cover"
                data-testid="iframe-google-maps"
              />

              {/* Floating Pin Card Over Map */}
              <div className="pointer-events-none absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs rounded-2xl border border-white/80 bg-white/95 p-3.5 shadow-xl backdrop-blur-md">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#B3184F] text-white shadow-md">
                    <MapPin size={17} />
                  </div>
                  <div className="pointer-events-auto flex-1 text-left">
                    <span className="block font-display text-sm font-semibold text-[#8C1140]">Nail Art Sparkle</span>
                    <p className="mt-0.5 text-[11px] font-medium leading-snug text-[#5E4450]">
                      7th Block, 5th Cross, 20th Main Rd
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <a
                        href={GOOGLE_MAPS_DIRECTIONS_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wide text-[#B3184F] hover:underline"
                        data-testid="link-pin-directions"
                      >
                        <Navigation size={11} /> Start Navigation
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Map Controls Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#B3184F]/10 bg-[#FFF8FA] p-3 text-xs sm:px-6">
              <span className="text-[11px] font-semibold text-[#5E4450]">
                Coordinates: 12.9348° N, 77.6186° E · Plus Code: WJQ9+GJ
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={GOOGLE_MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-[#B3184F] px-3 py-1.5 text-[11px] font-bold text-white transition hover:bg-[#8C1140]"
                >
                  Open in Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
