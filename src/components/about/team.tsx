import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal';
import { BadgePrimary } from '@/src/components/shared/ui/badge';
import { ButtonPrimary } from '@/src/components/shared/ui/button';
import { TeamCard } from '@/src/components/shared/ui/card';
import { TeamMember } from '@/src/interface/interface';
import getMarkDownData from '@/src/utils/getMarkDownData';
import Link from 'next/link';

const teamMembers = getMarkDownData<TeamMember>('src/data/team', false, 'order');

const AboutTeam = () => {
  return (
    <section className="pt-20 md:pt-25 lg:pt-39">
      <div className="main-container space-y-10 md:space-y-14">
        <div className="space-y-1.5 text-center md:space-y-3 md:pb-6">
          <RevealAnimation delay={0.1}>
            <BadgePrimary>Leadership Team</BadgePrimary>
          </RevealAnimation>

          <TextReveal delay={0.2}>
            <h2>The Leadership Behind Aeli AdOps</h2>
          </TextReveal>

          <TextReveal delay={0.3}>
            <p className="text-background-14/60 mx-auto max-w-[640px]">
              Our leadership team combines deep ad operations expertise, strategic vision, and technical excellence to empower publishers with maximum yield and transparent operations.
            </p>
          </TextReveal>
        </div>

        <div className="grid grid-cols-12 gap-y-8 md:gap-x-8">
          {teamMembers.map((member, index) => (
            <RevealAnimation
              key={member.slug || member.name}
              delay={0.1 + index * 0.1}
              className="col-span-12 md:col-span-6 lg:col-span-4"
            >
              <TeamCard
                image={member.image}
                name={member.name}
                title={member.title}
                href={`/team/${member.slug}`}
              />
            </RevealAnimation>
          ))}
        </div>

        <RevealAnimation delay={0.1} asChild={false} offset={40} className="flex justify-center">
          <Link href="/team" className="inline-flex">
            <ButtonPrimary
              className="md:w-auto!"
              textClassName="text-center text-nowrap max-sm:flex-1 max-sm:pr-8!"
            >
              Meet our experts
            </ButtonPrimary>
          </Link>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default AboutTeam;
