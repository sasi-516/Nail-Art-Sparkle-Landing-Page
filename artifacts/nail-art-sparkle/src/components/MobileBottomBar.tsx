import {
  MessageCircle,
  PhoneCall,
  Navigation,
  Sparkles,
} from 'lucide-react';
import {
  GOOGLE_MAPS_DIRECTIONS_URL,
  WHATSAPP_NUMBER,
  CALL_NUMBER,
} from './StudioLocation';

interface MobileBottomBarProps {
  onBookClick: () => void;
}

export default function MobileBottomBar({ onBookClick }: MobileBottomBarProps) {
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hi Nail Art Sparkle, I would like to book a nail appointment at your Koramangala studio or home service. Please let me know what slots are available!',
  )}`;

  return (
    <aside
      className="fixed bottom-0 inset-x-0 z-40 block sm:hidden border-t border-[#B3184F]/15 bg-[#FFF8FA]/95 backdrop-blur-xl shadow-[0_-6px_25px_rgba(140,17,64,0.12)]"
      aria-label="Mobile quick actions"
    >
      <div className="grid grid-cols-4 items-center px-2 py-2 safe-bottom">
        {/* 1. WhatsApp */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="group flex flex-col items-center justify-center py-1 text-center transition active:scale-95"
          data-testid="bottom-bar-whatsapp"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]/15 text-[#128C7E] transition group-hover:bg-[#25D366] group-hover:text-white">
            <MessageCircle size={17} />
          </div>
          <span className="mt-1 text-[10px] font-extrabold uppercase tracking-tight text-[#2A1420]">
            WhatsApp
          </span>
        </a>

        {/* 2. Call */}
        <a
          href={`tel:${CALL_NUMBER}`}
          className="group flex flex-col items-center justify-center py-1 text-center transition active:scale-95"
          data-testid="bottom-bar-call"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B3184F]/10 text-[#8C1140] transition group-hover:bg-[#B3184F] group-hover:text-white">
            <PhoneCall size={16} />
          </div>
          <span className="mt-1 text-[10px] font-extrabold uppercase tracking-tight text-[#2A1420]">
            Call Us
          </span>
        </a>

        {/* 3. Directions */}
        <a
          href={GOOGLE_MAPS_DIRECTIONS_URL}
          target="_blank"
          rel="noreferrer"
          className="group flex flex-col items-center justify-center py-1 text-center transition active:scale-95"
          data-testid="bottom-bar-directions"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B8862F]/15 text-[#8C1140] transition group-hover:bg-[#B8862F] group-hover:text-white">
            <Navigation size={16} />
          </div>
          <span className="mt-1 text-[10px] font-extrabold uppercase tracking-tight text-[#2A1420]">
            Map
          </span>
        </a>

        {/* 4. Book Now Button */}
        <button
          type="button"
          onClick={onBookClick}
          className="group flex flex-col items-center justify-center py-1 text-center transition active:scale-95"
          data-testid="bottom-bar-book"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B3184F] text-white shadow-xs">
            <Sparkles size={16} />
          </div>
          <span className="mt-1 text-[10px] font-extrabold uppercase tracking-tight text-[#B3184F]">
            Book Set
          </span>
        </button>
      </div>
    </aside>
  );
}
