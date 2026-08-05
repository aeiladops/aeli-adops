import workflowImg from '@/public/images/aeli-features-2580x1428.jpg';
import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal';
import { ButtonWhite } from '@/src/components/shared/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const listItemClass =
  "relative pl-4 text-tagline-2 text-secondary/60 before:absolute before:left-0 before:top-1/2 before:size-1.5 before:-translate-y-1/2 before:rounded-full before:bg-secondary/60 before:content-['']";

const workflowCards = [
  {
    title: 'For Digital News & Media',
    titleClassName: 'text-heading-5 text-secondary/80',
    items: [
      'High-traffic ad layout & viewability optimizations',
      'Dynamic floor pricing and auction competition tuning',
      'Header bidding & SSP demand partner management',
    ],
  },
  {
    title: 'For Niche Content Publishers',
    titleClassName: 'text-heading-4 text-secondary/80',
    items: [
      'Custom ad unit placement without compromising UX',
      'Direct deal setup and programmatic PMP execution',
    ],
  },
];

const WorkFlow = () => {
  return (
    <section className="overflow-hidden pt-20 pb-20 md:pt-25 md:pb-25 lg:pt-39 lg:pb-39">
      <div className="main-container space-y-10 md:space-y-14">
        <div className="space-y-3 text-center md:pb-4">
          <div className="space-y-2 text-center md:space-y-3">
            <TextReveal delay={0.1}>
              <h2>Monetisation solutions tailored for your publication</h2>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-tagline-1 text-secondary/60">
                Aeli AdOps provides hands-on technical and operational expertise designed to match your specific publishing model.
              </p>
            </TextReveal>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-8">
            {workflowCards.map((card, index) => (
              <RevealAnimation
                asChild={false}
                key={card.title}
                delay={0.1 + index * 0.1}
                className="border-stroke-1 bg-accent space-y-7 rounded-xl border-8 p-7 text-left lg:p-10.5"
              >
                <TextReveal delay={0.1}>
                  <h3 className={card.titleClassName}>{card.title}</h3>
                </TextReveal>
                <RevealAnimation asChild={false} delay={0.2}>
                  <ul className="space-y-1.5">
                    {card.items.map((item) => (
                      <li key={item} className={listItemClass}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </RevealAnimation>
              </RevealAnimation>
            ))}
          </div>

          <RevealAnimation
            asChild={false}
            delay={0.3}
            className="border-stroke-1 bg-accent space-y-7 rounded-xl border-8 p-7 text-left lg:p-10.5"
          >
            <TextReveal delay={0.1}>
              <h3 className="text-heading-4 text-secondary/80">For Independent Web Networks</h3>
            </TextReveal>
            <RevealAnimation delay={0.2}>
              <ul className="space-y-1.5">
                <li className={listItemClass}>Cross-domain Google Ad Manager hierarchy setup</li>
                <li className={listItemClass}>Centralized reporting, audit, and revenue analytics</li>
                <li className="max-h-[250px] overflow-hidden rounded-lg">
                  <Image
                    src={workflowImg}
                    alt="Publisher Work Flow"
                    className="size-full object-cover"
                  />
                </li>
              </ul>
            </RevealAnimation>
          </RevealAnimation>
        </div>

        <RevealAnimation delay={0.4} asChild={false} className="flex items-center justify-center">
          <Link href="/publisher-audit">
            <ButtonWhite
              className="w-full md:w-auto"
              textClassName="text-center text-nowrap max-sm:flex-1 max-sm:pr-8!"
            >
              Get a Free Publisher Audit
            </ButtonWhite>
          </Link>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default WorkFlow;
