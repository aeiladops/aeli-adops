import { LogoOrbit, OrbitHub, OrbitItem, OrbitRing } from '@/src/components/animation/logo-orbit';
import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal';
import { BadgePrimary } from '@/src/components/shared/ui/badge';
import { ButtonWhite } from '@/src/components/shared/ui/button';
import { integrationOrbitLogos } from '@/src/data/integration-orbit-logos';
import Link from 'next/link';

const Integration = () => {
  return (
    <section className="relative pt-20 md:pt-25 lg:pt-36">
      <div className="main-container relative overflow-hidden pb-32">
        <div className="relative z-30 space-y-8 lg:space-y-12">
          <div className="space-y-4 text-center">
            <RevealAnimation delay={0.1}>
              <BadgePrimary>AdTech Ecosystem</BadgePrimary>
            </RevealAnimation>

            <div className="space-y-3">
              <TextReveal delay={0.2}>
                <h2 className="mx-auto max-w-[660px] text-heading-3 md:text-heading-2 font-bold text-secondary tracking-tight leading-tight">
                  You Build the Audience.<br className="hidden sm:inline" /> We Simplify Every Ad Opportunity.
                </h2>
              </TextReveal>
              
              <TextReveal delay={0.3}>
                <p className="text-tagline-1 text-secondary/70 mx-auto max-w-[560px] font-normal leading-relaxed">
                  From impression to revenue—we handle the AdOps, demand partners, and yield optimization so you can focus on creating great content.
                </p>
              </TextReveal>
            </div>
          </div>

          <RevealAnimation delay={0.4} className="flex items-center justify-center">
            <Link href="/contact">
              <ButtonWhite>Explore Our Services</ButtonWhite>
            </Link>
          </RevealAnimation>
        </div>

        <RevealAnimation
          asChild={false}
          delay={0.5}
          className="absolute top-[-18%] left-1/2 -translate-x-1/2 md:top-[-72%] lg:top-[-115%] xl:top-[-137%]"
        >
          <LogoOrbit speed={0.3}>
            <OrbitRing>
              <OrbitHub>
                {integrationOrbitLogos.map((logo, index) => (
                  <OrbitItem key={`${logo.alt}-${index}`} src={logo.src} alt={logo.alt} />
                ))}
              </OrbitHub>
            </OrbitRing>
          </LogoOrbit>
        </RevealAnimation>

        <div className="pointer-events-none absolute top-0 left-0 z-20 h-[100px] w-full bg-[linear-gradient(to_bottom,#f2f5fa,transparent)]" />
      </div>
    </section>
  );
};

export default Integration;
