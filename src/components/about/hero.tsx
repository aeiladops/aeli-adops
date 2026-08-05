import gradientImg from '@/public/images/gradient/opai-29.png';
import aboutHeroImg from '@/public/images/pexels-a-darmel-8133993.jpg';
import CounterNumberOnScroll from '@/src/components/animation/counter-number-on-scroll';
import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal';
import { BadgePrimary } from '@/src/components/shared/ui/badge';
import Image from 'next/image';

const awards = [
  'Built around publisher monetisation and AdOps expertise',
  'Publisher-First approach to advertising strategy',
  'Continuous optimization over one-time fixes',
  'Technical precision combined with strategic thinking',
];

const AboutHero = () => {
  return (
    <section className="relative overflow-hidden pt-[190px]">
      <div className="main-container">
        <div className="space-y-18">
          <div className="space-y-1.5 text-center md:space-y-3">
            <RevealAnimation delay={0.1}>
              <BadgePrimary>Our Story</BadgePrimary>
            </RevealAnimation>

            <TextReveal delay={0.2}>
              <h2>Built From Experience. Focused on Publisher Growth.</h2>
            </TextReveal>

            <TextReveal delay={0.3}>
              <p className="text-background-14/60 md:mx-auto md:max-w-[480px]">
                Aeli AdOps was created around a simple idea: publisher monetisation shouldn&apos;t have to feel unnecessarily complicated.
              </p>
            </TextReveal>
          </div>

          <div className="grid grid-cols-12 items-center justify-center max-md:gap-y-10 md:gap-x-10 lg:items-end lg:gap-x-[90px]">
            <RevealAnimation
              asChild={false}
              delay={0.1}
              direction="left"
              offset={80}
              className="relative col-span-12 h-[500px] w-full overflow-hidden rounded-[20px] p-8 md:col-span-6 lg:col-span-4 lg:max-w-[380px]"
            >
              <figure className="absolute inset-0 size-full" aria-hidden="true">
                <Image src={aboutHeroImg} alt="" className="size-full object-cover" priority />
              </figure>
              <div
                className="from-background-14/70 pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[180px] bg-linear-to-t to-transparent"
                aria-hidden="true"
              />
            </RevealAnimation>

            <RevealAnimation
              asChild={false}
              delay={0.2}
              offset={60}
              className="col-span-12 w-full space-y-6 text-left md:col-span-6 md:space-y-8 lg:col-span-4"
            >
              <h2>Our Core Principles</h2>

              <ul className="space-y-3">
                {awards.map((award) => (
                  <li key={award} className="flex items-start gap-2">
                    <span className="bg-secondary mt-2 size-1.5 shrink-0 rounded-full" />
                    <p className="text-background-14/60">{award}</p>
                  </li>
                ))}
              </ul>
            </RevealAnimation>

            <RevealAnimation
              asChild={false}
              delay={0.3}
              direction="right"
              offset={80}
              className="bg-background-5 relative col-span-12 flex w-full flex-col justify-between overflow-hidden rounded-[20px] p-8 md:col-span-6 md:h-[300px] md:p-12 lg:col-span-4"
            >
              <div
                className="pointer-events-none absolute -top-28 left-[165px] z-0 h-[330px] w-[300px] rotate-60"
                aria-hidden="true"
              >
                <Image src={gradientImg} alt="" className="size-full object-cover blur-[10px]" />
              </div>

              <div className="ns-shape-47 text-[40px] text-white max-md:mb-2 md:text-[56px]" />

              <div className="relative z-10 space-y-2">
                <p className="text-tagline-2 text-white/90">Publisher-First Approach</p>
                <h3 className="text-heading-2 flex items-center text-white">
                  <CounterNumberOnScroll value={100} duration={1.4} />
                  <span>%</span>
                </h3>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
