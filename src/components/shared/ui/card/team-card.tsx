import { cn } from '@/src/utils/cn';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

export type TeamCardProps = Readonly<{
  image: StaticImageData | string;
  name: string;
  title: string;
  href: string;
  email?: string;
  phone?: string;
  className?: string;
}>;

export const TeamCard = ({ image, name, title, href, email, phone, className }: TeamCardProps) => (
  <div className={cn('col-span-12 md:col-span-6 lg:col-span-4', className)}>
    <div
      className="group relative mx-auto h-[460px] w-full overflow-hidden rounded-3xl border border-secondary/15 bg-slate-900 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary-500/50 hover:shadow-2xl hover:shadow-primary-500/10"
      aria-label={`${name} - ${title}`}
    >
      {/* Background Image with Zoom Effect */}
      <figure className="relative h-full w-full overflow-hidden">
        <Image
          src={image}
          fill
          alt={name}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
      </figure>

      {/* Role Pill Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-900/70 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md shadow-sm">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          {title.includes('MD') ? 'FOUNDER & MD' : title.includes('Co-Founder') ? 'CO-FOUNDER' : 'TECHNICAL HEAD'}
        </span>
      </div>

      {/* Glassmorphic Info Card */}
      <div className="absolute bottom-4 left-4 right-4 z-20 space-y-3 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md transition-all duration-500 group-hover:bg-slate-950/80 group-hover:border-primary-500/40">
        <div>
          <Link href={href}>
            <h3 className="text-xl font-bold text-white tracking-tight hover:text-primary-400 transition-colors">
              {name}
            </h3>
          </Link>
          <p className="text-xs font-semibold text-primary-300 mt-0.5">{title}</p>
        </div>

        {/* Quick Contact & View Profile Links */}
        <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 font-bold text-white hover:text-primary-400 transition-colors"
          >
            <span>View Profile</span>
            <span className="text-primary-400 transition-transform group-hover:translate-x-1">→</span>
          </Link>

          <a
            href={`https://wa.me/917095185429?text=${encodeURIComponent(`Hi ${name}, I would like to connect with Aeli AdOps leadership.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 hover:bg-[#25D366] hover:text-white transition-all"
          >
            <span>💬 Chat</span>
          </a>
        </div>
      </div>
    </div>
  </div>
);
