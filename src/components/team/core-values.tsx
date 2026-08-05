import coreValuesImg from '@/public/images/ns-img-32.jpg';
import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal';
import Image from 'next/image';

const CoreValues = () => {
  return (
    <section className="pt-20 md:pt-25 lg:pt-39">
      <div className="main-container space-y-8 md:space-y-14">
        <TextReveal delay={0.1}>
          <h2 className="text-center">Our Approach to Leadership</h2>
        </TextReveal>

        <div className="grid grid-cols-12 items-center justify-center gap-y-5 pb-5 sm:gap-x-8">
          <RevealAnimation
            asChild={false}
            delay={0.1}
            offset={30}
            className="col-span-12 text-center md:col-span-6 lg:col-span-3"
          >
            <h3 className="text-heading-5">Understanding Publisher Problems</h3>
            <p className="text-tagline-2 text-background-14/60 md:mx-auto md:max-w-[260px]">
              We evaluate decisions from the perspective of publisher value and revenue potential.
            </p>
          </RevealAnimation>

          <RevealAnimation
            asChild={false}
            delay={0.2}
            offset={30}
            className="col-span-12 text-center md:col-span-6 lg:col-span-3"
          >
            <h3 className="text-heading-5">Understanding Technology</h3>
            <p className="text-tagline-2 text-background-14/60 md:mx-auto md:max-w-[260px]">
              Staying close to Ad Manager, SSPs, header bidding, and technical infrastructure.
            </p>
          </RevealAnimation>

          <RevealAnimation
            asChild={false}
            delay={0.3}
            offset={30}
            className="col-span-12 text-center md:col-span-6 lg:col-span-3"
          >
            <h3 className="text-heading-5">Understanding Performance</h3>
            <p className="text-tagline-2 text-background-14/60 md:mx-auto md:max-w-[260px]">
              Analyzing eCPMs, fill rates, viewability, and yield metrics constantly.
            </p>
          </RevealAnimation>

          <RevealAnimation
            asChild={false}
            delay={0.4}
            offset={30}
            className="col-span-12 text-center md:col-span-6 lg:col-span-3"
          >
            <h3 className="text-heading-5">Connecting the Elements</h3>
            <p className="text-tagline-2 text-background-14/60 md:mx-auto md:max-w-[260px]">
              Bridging strategy, operations, and execution into one seamless monetisation system.
            </p>
          </RevealAnimation>
        </div>

        <RevealAnimation asChild={false} delay={0.2} offset={50}>
          <figure className="border-stroke-3 h-[360px] w-full overflow-hidden rounded-[20px] border-8 md:h-[614px]">
            <Image
              src={coreValuesImg}
              alt="Our core values"
              className="size-full rounded-xl object-cover"
            />
          </figure>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default CoreValues;
