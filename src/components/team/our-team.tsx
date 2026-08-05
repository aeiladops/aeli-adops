import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal';
import { BadgePrimary } from '@/src/components/shared/ui/badge';
import { TeamCard } from '@/src/components/shared/ui/card';
import { TeamMember } from '@/src/interface/interface';
import getMarkDownData from '@/src/utils/getMarkDownData';

const members = getMarkDownData<TeamMember>('src/data/team', false, 'order');

const OurTeam = () => {
  return (
    <section className="overflow-hidden pt-28 md:pt-36 lg:pt-44 pb-12">
      <div className="main-container space-y-12 md:space-y-16">
        
        {/* Executive Header Section */}
        <div className="space-y-4 text-center md:space-y-6">
          <RevealAnimation delay={0.1}>
            <BadgePrimary>Founding Leadership</BadgePrimary>
          </RevealAnimation>

          <TextReveal delay={0.2}>
            <h1 className="text-heading-2 md:text-heading-1 font-bold text-secondary tracking-tight">
              The Visionaries Behind Aeli AdOps
            </h1>
          </TextReveal>

          <TextReveal delay={0.3}>
            <p className="text-tagline-1 text-secondary/70 mx-auto max-w-[680px] leading-relaxed">
              Aeli AdOps is led by hands-on Ad Operations &amp; Ad Tech experts dedicated to solving complex publisher monetization challenges, driving yield growth, and delivering 100% operational transparency.
            </p>
          </TextReveal>

          {/* Stats Bar */}
          <RevealAnimation delay={0.4} className="pt-2">
            <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 rounded-2xl border border-secondary/10 bg-white/80 px-6 py-3.5 shadow-sm backdrop-blur-md text-xs font-bold text-secondary">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>3 Executive Leaders</span>
              </div>
              <span className="text-secondary/20 hidden sm:inline">•</span>
              <div className="flex items-center gap-2">
                <span className="text-primary-600 font-extrabold">100%</span>
                <span>In-House Ad Tech Expertise</span>
              </div>
              <span className="text-secondary/20 hidden sm:inline">•</span>
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 font-extrabold">24/7</span>
                <span>Direct Support &amp; Ops</span>
              </div>
            </div>
          </RevealAnimation>
        </div>

        {/* 3 Executive Leaders Grid */}
        <div className="grid grid-cols-12 gap-y-8 md:gap-x-8 items-stretch">
          {members.map((member, index) => (
            <RevealAnimation key={member.slug} delay={0.1 * (index + 1)} offset={40} className="col-span-12 md:col-span-6 lg:col-span-4 flex">
              <TeamCard
                image={member.image}
                name={member.name}
                title={member.title}
                email={member.email}
                phone={member.phone}
                href={`/team/${member.slug}`}
                className="w-full"
              />
            </RevealAnimation>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurTeam;
