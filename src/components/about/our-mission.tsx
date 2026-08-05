import missionImg from '@/public/images/aeli-about-2580x1460.jpg';
import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal';
import { BadgePrimary } from '@/src/components/shared/ui/badge';
import Image from 'next/image';

const OurMission = () => {
  return (
    <section className="overflow-hidden pt-20 md:pt-25 lg:pt-39">
      <div className="main-container">
        <div className="space-y-12 md:space-y-18">
          <div className="grid grid-cols-12 items-center gap-y-12 md:gap-x-16 lg:gap-x-20 xl:gap-x-25">
            <div className="col-span-12 space-y-3 md:col-span-6 md:space-y-4">
              <RevealAnimation delay={0.1}>
                <BadgePrimary>Our Mission</BadgePrimary>
              </RevealAnimation>

              <div className="space-y-3">
                <TextReveal delay={0.2}>
                  <h2>Building a Better Future for Publisher Monetisation.</h2>
                </TextReveal>
                <TextReveal delay={0.3}>
                  <p className="text-background-14/60">
                    Our mission is to help digital publishers build smarter, clearer, and more sustainable advertising businesses.
                  </p>
                </TextReveal>
              </div>
            </div>

            <RevealAnimation
              asChild={false}
              delay={0.3}
              offset={50}
              className="col-span-12 space-y-2 md:col-span-3"
            >
              <h3>Publisher First</h3>
              <p className="text-background-14/60">
                Start with what creates sustainable value for publishers. Every decision is made through the lens of long-term publisher growth.
              </p>
            </RevealAnimation>

            <RevealAnimation
              asChild={false}
              delay={0.4}
              direction="right"
              offset={50}
              className="col-span-12 space-y-2 md:col-span-3"
            >
              <h3>Clarity & Precision</h3>
              <p className="text-background-14/60">
                Make complicated advertising systems easier to understand and operate. Treat implementation with attention to detail.
              </p>
            </RevealAnimation>
          </div>

          <RevealAnimation delay={0.3} offset={80}>
            <figure className="max-h-[650px] overflow-hidden rounded-[20px]">
              <Image src={missionImg} alt="Our mission" className="size-full object-cover" />
            </figure>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
