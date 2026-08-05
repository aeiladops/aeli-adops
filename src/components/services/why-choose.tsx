import avatarImgOne from '@/public/images/ns-avatar-11.jpg';
import avatarImgTwo from '@/public/images/ns-avatar-13.jpg';
import avatarImgThree from '@/public/images/ns-avatar-14.jpg';
import featureImg from '@/public/images/pexels-fauxels-3184635.jpg';
import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal';
import { ButtonWhite } from '@/src/components/shared/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const WhyChoose = () => {
  return (
    <section className="pt-20 md:pt-25 lg:pt-39">
      <div className="main-container space-y-10 md:space-y-14">
        <div className="space-y-3 text-center">
          <TextReveal delay={0.1}>
            <h2 className="text-center">One Ecosystem. Multiple Opportunities.</h2>
          </TextReveal>
          <TextReveal delay={0.2}>
            <p className="text-tagline-1 text-secondary/60 mx-auto max-w-[660px]">
              Rather than treating each monetisation component in isolation, we consider how they influence one another: <br />
              <strong className="text-secondary font-medium">Inventory → Demand → Delivery → Viewability → Yield → Revenue</strong> <br />
              That broader perspective helps us identify opportunities that may otherwise be missed.
            </p>
          </TextReveal>
        </div>

        <RevealAnimation
          asChild={false}
          delay={0.2}
          className="relative grid w-full grid-cols-1 gap-8 overflow-hidden rounded-2xl bg-[url('/images/aeli-services-bg-2580x1428.jpg')] bg-cover bg-center bg-no-repeat p-4 md:grid-cols-2 md:p-8 lg:grid-cols-4"
        >
          <RevealAnimation delay={0.2} className="overflow-hidden rounded-xl">
            <figure className="h-[220px] w-full">
              <Image
                src={avatarImgOne}
                alt="Why choose Aeli AdOps"
                className="size-full object-cover object-top"
              />
            </figure>
          </RevealAnimation>

          <RevealAnimation delay={0.3} className="overflow-hidden rounded-xl">
            <figure className="h-[220px] w-full">
              <Image
                src={avatarImgTwo}
                alt="Why choose Aeli AdOps"
                className="size-full object-cover object-top"
              />
            </figure>
          </RevealAnimation>

          <RevealAnimation
            asChild={false}
            delay={0.4}
            className="flex flex-col justify-end rounded-xl bg-white p-5"
          >
            <TextReveal delay={0.2}>
              <h3 className="text-heading-5 text-secondary/90">
                Revenue-Focused Thinking for Publisher Growth
              </h3>
            </TextReveal>
          </RevealAnimation>

          <RevealAnimation
            asChild={false}
            delay={0.5}
            className="flex flex-col justify-end rounded-xl bg-white p-5"
          >
            <TextReveal delay={0.3}>
              <h3 className="text-heading-5 text-secondary/90">
                AdOps Expertise across Trafficking & Reporting
              </h3>
            </TextReveal>
          </RevealAnimation>

          <RevealAnimation
            asChild={false}
            delay={0.2}
            className="flex flex-col justify-end rounded-xl bg-white p-5"
          >
            <TextReveal delay={0.4}>
              <h3 className="text-heading-5 text-secondary/90">
                Continuous Yield & Viewability Optimization
              </h3>
            </TextReveal>
          </RevealAnimation>

          <RevealAnimation
            asChild={false}
            delay={0.3}
            className="flex flex-col justify-end rounded-xl bg-white p-5"
          >
            <TextReveal delay={0.5}>
              <h3 className="text-heading-5 text-secondary/90">
                Technical Precision & Dependable Execution
              </h3>
            </TextReveal>
          </RevealAnimation>

          <RevealAnimation delay={0.4} className="overflow-hidden rounded-xl">
            <figure className="h-[220px] w-full">
              <Image src={featureImg} alt="Why choose Aeli AdOps" className="size-full object-cover object-center" />
            </figure>
          </RevealAnimation>

          <RevealAnimation delay={0.5} className="overflow-hidden rounded-xl">
            <figure className="h-[220px] w-full">
              <Image
                src={avatarImgThree}
                alt="Why choose Aeli AdOps"
                className="size-full object-cover object-top"
              />
            </figure>
          </RevealAnimation>
        </RevealAnimation>

        <RevealAnimation delay={0.1} asChild={false} className="flex justify-center">
          <Link href="/contact">
            <ButtonWhite
              className="mx-auto w-[80%]! md:w-fit!"
              textClassName="text-center text-nowrap max-sm:flex-1 max-sm:pr-8!"
            >
              Explore Your Monetisation Opportunities →
            </ButtonWhite>
          </Link>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default WhyChoose;
