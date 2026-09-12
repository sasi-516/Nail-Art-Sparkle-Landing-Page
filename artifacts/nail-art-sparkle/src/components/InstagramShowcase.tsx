import { useState } from 'react';
import {
  Instagram,
  Sparkles,
  ExternalLink,
  MessageCircle,
  Heart,
  Share2,
  Bookmark,
  Check,
} from 'lucide-react';

export const INSTAGRAM_URL =
  'https://www.instagram.com/_nailartsparkle?igsh=OGppNGt4azNsMXdw';
export const INSTAGRAM_HANDLE = '@_nailartsparkle';
const WHATSAPP_NUMBER = '918310158051';

interface NailPost {
  id: string;
  title: string;
  category: string;
  image: string;
  likes: number;
  tags: string[];
}

const instagramPosts: NailPost[] = [
  {
    id: '1',
    title: 'Glazed Rose Chrome & Gold Foil',
    category: 'Trending',
    image: '/images/hero.jpg',
    likes: 342,
    tags: ['#GlazedNails', '#ChromeSet', '#Koramangala'],
  },
  {
    id: '2',
    title: 'Bridal Pearl & Micro-Gold Accents',
    category: 'Bridal Special',
    image: '/images/bridal.jpg',
    likes: 589,
    tags: ['#BridalNailsBangalore', '#WeddingSeason', '#SparkleNails'],
  },
  {
    id: '3',
    title: 'Velvet Cat-Eye in Rose Mauve',
    category: 'Gel Art',
    image: '/images/cat_eye.jpg',
    likes: 412,
    tags: ['#CatEyeGel', '#VelvetNails', '#StudioSparkle'],
  },
  {
    id: '4',
    title: 'Minimal French with Gold Tip',
    category: 'Classics',
    image: '/images/minimal.jpg',
    likes: 278,
    tags: ['#MicroFrench', '#MinimalNails', '#Indiranagar'],
  },
  {
    id: '5',
    title: 'Custom Almond Extensions Ombré',
    category: 'Extensions',
    image: '/images/acrylic.jpg',
    likes: 461,
    tags: ['#AcrylicExtensions', '#AlmondShape', '#NailInspo'],
  },
  {
    id: '6',
    title: 'Party Sparkling Gems & Crystals',
    category: 'Party Glam',
    image: '/images/party.jpg',
    likes: 520,
    tags: ['#PartyNails', '#CrystalArt', '#BengaluruBeauty'],
  },
];

export default function InstagramShowcase() {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShareProfile = async () => {
    try {
      await navigator.clipboard.writeText(INSTAGRAM_URL);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Fallback
    }
  };

  const getWhatsappInquiry = (postTitle: string) => {
    const text = `Hi Nail Art Sparkle! I saw the "${postTitle}" set on your Instagram @_nailartsparkle and would love to get this done. Could you please let me know pricing and available appointments at your Koramangala studio or home visit?`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="instagram" className="bg-[#FFF8FA] py-16 sm:py-24 border-t border-[#B3184F]/10">
      <div className="sparkle-container">
        {/* Instagram Profile Header Badge */}
        <div className="rounded-[28px] border border-[#B3184F]/15 bg-gradient-to-r from-[#FFF8FA] via-[#F6E7EE] to-[#FFF8FA] p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            {/* Profile Info */}
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="group relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#FFDC80] via-[#E1306C] to-[#833AB4] p-[3px] shadow-lg transition hover:scale-105"
                title="Follow @_nailartsparkle on Instagram"
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#FFF8FA] text-[#B3184F]">
                  <Instagram size={36} className="transition group-hover:scale-110" />
                </div>
              </a>

              <div>
                <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="font-display text-2xl font-bold tracking-tight text-[#2A1420] hover:text-[#B3184F] transition"
                    data-testid="link-instagram-handle-header"
                  >
                    {INSTAGRAM_HANDLE}
                  </a>
                  <span className="rounded-full bg-[#B3184F]/10 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#8C1140]">
                    Verified Studio
                  </span>
                </div>
                <p className="mt-1 text-xs font-semibold text-[#5E4450]">
                  Koramangala 7th Block, Bengaluru · Gel, Extensions, Bridal & Custom Art
                </p>
                <p className="mt-0.5 text-[11px] font-medium text-[#B8862F]">
                  Tag us or DM your moodboard for instant slot confirmation
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E1306C] via-[#C13584] to-[#833AB4] px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-md transition hover:opacity-95 active:scale-95"
                data-testid="button-follow-instagram"
              >
                <Instagram size={16} />
                Follow on Instagram
                <ExternalLink size={13} />
              </a>

              <button
                type="button"
                onClick={handleShareProfile}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#B3184F]/25 bg-white px-4 py-3 text-xs font-bold text-[#8C1140] transition hover:bg-[#F6E7EE] active:scale-95"
                title="Copy Instagram profile link"
                data-testid="button-share-instagram"
              >
                {copiedLink ? (
                  <>
                    <Check size={14} className="text-emerald-600" />
                    <span className="text-emerald-700">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 size={14} />
                    <span>Share Feed</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Section Subhead */}
        <div className="mt-12 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#B8862F]">
              <Sparkles size={12} />
              Fresh from our feed
            </div>
            <h3 className="mt-2 font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-tight text-[#2A1420]">
              Recent Works on <span className="text-[#B3184F]">Instagram</span>
            </h3>
          </div>
          <p className="max-w-xs text-xs leading-5 text-[#5E4450]">
            Tap any set below to inquire directly about it on WhatsApp with the photo reference already attached!
          </p>
        </div>

        {/* Photo Grid */}
        <div className="mt-8 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6 sm:gap-4">
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#B3184F]/15 bg-white shadow-xs transition duration-300 hover:-translate-y-1.5 hover:shadow-lg"
            >
              {/* Image Container with 1:1 Aspect Ratio */}
              <div className="relative aspect-square overflow-hidden bg-[#EFD7E3]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Badge Category */}
                <div className="absolute left-2.5 top-2.5 rounded-md bg-[#2A1420]/75 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white backdrop-blur-xs">
                  {post.category}
                </div>

                {/* Hover overlay with Instagram & WhatsApp buttons */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#2A1420]/65 p-3 opacity-0 backdrop-blur-xs transition duration-200 group-hover:opacity-100">
                  <span className="text-center font-display text-xs font-semibold text-white line-clamp-2">
                    {post.title}
                  </span>

                  <a
                    href={getWhatsappInquiry(post.title)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-2.5 py-1.5 text-[10px] font-bold text-white shadow-xs transition hover:bg-[#20bd5a]"
                    data-testid={`link-ig-whatsapp-${post.id}`}
                  >
                    <MessageCircle size={12} />
                    <span>Get this Set</span>
                  </a>

                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[9px] font-semibold text-white backdrop-blur transition hover:bg-white/30"
                  >
                    <Instagram size={11} />
                    <span>View Post</span>
                  </a>
                </div>
              </div>

              {/* Card Footer info */}
              <div className="p-2.5 flex flex-col justify-between flex-1">
                <span className="font-display text-xs font-semibold text-[#2A1420] line-clamp-1">
                  {post.title}
                </span>

                <div className="mt-2 flex items-center justify-between text-[10px] text-[#5E4450]">
                  <span className="flex items-center gap-1 text-[#B3184F] font-bold">
                    <Heart size={11} fill="currentColor" /> {post.likes}
                  </span>
                  <span className="font-mono text-[9px] text-[#B8862F]">{post.tags[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-[#F6E7EE] p-4 text-center sm:flex-row sm:text-left sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#B3184F] text-white">
              <Instagram size={18} />
            </span>
            <div>
              <p className="text-xs font-extrabold text-[#2A1420]">
                Want to browse our full 500+ design lookbook?
              </p>
              <p className="text-[11px] text-[#5E4450]">
                Visit <span className="font-bold text-[#8C1140]">@_nailartsparkle</span> on Instagram for daily stories & limited slot announcements.
              </p>
            </div>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#B3184F] px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-white transition hover:bg-[#8C1140]"
            data-testid="link-ig-visit-bottom"
          >
            <span>Open @_nailartsparkle</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}
