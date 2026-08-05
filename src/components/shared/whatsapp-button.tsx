'use client';

import { usePathname } from 'next/navigation';

const WHATSAPP_NUMBER = '917095185429'; // +91 7095185429
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi! I'd like to request a Free Publisher Audit for my website. Please let me know the next steps."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export default function WhatsAppButton() {
  const pathname = usePathname();

  // Hide on admin pages
  if (pathname?.startsWith('/admin')) return null;

  return (
    <>
      <style>{`
        @keyframes wa-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.55);
          }
          70% {
            box-shadow: 0 0 0 14px rgba(37, 211, 102, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
          }
        }

        .wa-btn {
          animation: wa-pulse 2.2s ease-out infinite;
        }

        .wa-btn:hover {
          animation: none;
          transform: scale(1.1);
        }

        .wa-tooltip {
          opacity: 0;
          transform: translateX(10px);
          transition: opacity 0.25s ease, transform 0.25s ease;
          pointer-events: none;
          white-space: nowrap;
        }

        .wa-wrapper:hover .wa-tooltip {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>

      <div
        className="wa-wrapper fixed bottom-6 right-6 z-[9999] flex items-center gap-3"
        aria-label="Chat on WhatsApp"
      >
        {/* Tooltip */}
        <div className="wa-tooltip rounded-xl bg-white px-4 py-2.5 shadow-xl ring-1 ring-black/5">
          <p className="text-[13px] font-semibold text-gray-800">
            Request a <span className="text-[#25D366]">Free Audit</span>
          </p>
          <p className="text-[11px] text-gray-500">Reply in minutes</p>
        </div>

        {/* WhatsApp Button */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="wa-btn flex h-[58px] w-[58px] cursor-pointer items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform duration-200"
          aria-label="Chat on WhatsApp — Request a Free Audit"
        >
          {/* Official WhatsApp SVG logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="30"
            height="30"
            fill="white"
            aria-hidden="true"
          >
            <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.363.62 4.617 1.707 6.579L2.667 29.333l6.944-1.68A13.29 13.29 0 0016.004 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16.004 2.667zm0 24.267a11.022 11.022 0 01-5.611-1.538l-.403-.24-4.123.999.97-4.024-.265-.42A11.006 11.006 0 015 16c0-6.075 4.929-11.005 11.004-11.005S27.009 9.925 27.009 16 22.08 26.934 16.004 26.934zm6.047-8.24c-.33-.166-1.958-.967-2.262-1.078-.304-.11-.525-.166-.747.166-.22.33-.858 1.078-1.052 1.298-.194.22-.39.248-.72.083-.33-.165-1.394-.514-2.655-1.638-.98-.872-1.643-1.95-1.836-2.28-.193-.33-.02-.51.146-.674.15-.148.33-.385.497-.578.166-.193.22-.33.33-.55.11-.22.055-.413-.028-.579-.082-.165-.747-1.8-1.022-2.466-.27-.648-.544-.56-.747-.57l-.635-.01c-.22 0-.578.082-.881.413-.304.33-1.16 1.133-1.16 2.763s1.188 3.205 1.354 3.426c.165.22 2.338 3.57 5.664 5.006.792.342 1.41.546 1.892.699.795.253 1.518.217 2.09.132.637-.095 1.958-.8 2.235-1.573.276-.773.276-1.435.193-1.573-.08-.138-.303-.22-.634-.386z" />
          </svg>
        </a>
      </div>
    </>
  );
}
