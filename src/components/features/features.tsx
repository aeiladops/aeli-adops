import avatarImgOne from '@/public/images/ns-avatar-13.jpg';
import avatarImgTwo from '@/public/images/ns-avatar-14.jpg';
import featureImgOne from '@/public/images/aeli-features-2580x1428.jpg';
import featureImgTwo from '@/public/images/aeli-features-1290x622.jpg';
import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal';
import { BadgePrimary } from '@/src/components/shared/ui/badge';
import Image from 'next/image';

const featureCards = [
  {
    type: 'image' as const,
    src: featureImgOne,
    alt: 'Core AdOps Features',
  },
  {
    type: 'card' as const,
    variant: 'white' as const,
    title: 'Yield Optimization',
    description:
      'Continuous analysis of pricing floors, unified auctions, and bid density to maximize impression revenue.',
  },
  {
    type: 'image' as const,
    src: avatarImgTwo,
    alt: 'Publisher Monetisation',
  },
  {
    type: 'card' as const,
    variant: 'white' as const,
    title: 'GAM & Header Bidding',
    description: 'Expert setup, line-item structure, and wrapper tuning for seamless ad server operation.',
  },
  {
    type: 'card' as const,
    variant: 'accent' as const,
    title: 'Programmatic Direct',
    description: 'Streamlined PMP and Preferred Deal setup to attract premium advertisers and direct demand.',
  },
  {
    type: 'image' as const,
    src: featureImgTwo,
    alt: 'AdOps Analytics',
  },
  {
    type: 'card' as const,
    variant: 'accent' as const,
    title: 'Technical AdOps Support',
    description: 'Rapid troubleshooting for ad delivery, viewability issues, discrepancy resolution, and tag health.',
  },
  {
    type: 'image' as const,
    src: avatarImgOne,
    alt: 'Publisher Support',
  },
];

const FeaturesSection = () => {
  return (
    <section className="pt-20 pb-13 md:pt-25 md:pb-20 lg:pt-39 lg:pb-28 xl:pb-36">
      <div className="main-container space-y-10 md:space-y-14">
        <div className="space-y-3 text-center md:pb-4">
          <div className="space-y-2 text-center md:space-y-3">
            <RevealAnimation delay={0.1}>
              <BadgePrimary>Monetisation Pillars</BadgePrimary>
            </RevealAnimation>

            <TextReveal delay={0.2}>
              <h2 className="mx-auto max-w-[650px]">Everything your ad operations stack needs</h2>
            </TextReveal>

            <TextReveal delay={0.3}>
              <p className="text-tagline-1 text-secondary/60">
                A robust suite of publisher solutions designed to optimize yield,
                <br className="hidden md:block" />
                streamline GAM workflows, and maximize your website revenue.
              </p>
            </TextReveal>
          </div>
        </div>

        <RevealAnimation
          delay={0.1}
          asChild={false}
          className="relative grid w-full grid-cols-1 gap-8 overflow-hidden rounded-2xl bg-[url('/images/aeli-features-bg-2580x1428.jpg')] bg-cover bg-center bg-no-repeat p-4 md:grid-cols-2 md:p-8 lg:grid-cols-4"
        >
          {featureCards.map((item) => {
            if (item.type === 'image') {
              return (
                <figure key={item.src.src} className="overflow-hidden rounded-xl">
                  <Image src={item.src} alt={item.alt} className="size-full object-cover" />
                </figure>
              );
            }

            const isAccent = item.variant === 'accent';

            return (
              <div
                key={item.title}
                className={`flex flex-col justify-between rounded-xl p-10.5 ${
                  isAccent ? 'bg-background-4' : 'bg-white'
                }`}
              >
                <TextReveal delay={0.1}>
                  <h3 className={`text-heading-4 ${isAccent ? '' : 'text-secondary/80'}`}>
                    {item.title}
                  </h3>
                </TextReveal>
                <TextReveal delay={0.2}>
                  <p className={`text-tagline-2 ${isAccent ? '' : 'text-secondary/50'}`}>
                    {item.description}
                  </p>
                </TextReveal>
              </div>
            );
          })}
        </RevealAnimation>
      </div>
    </section>
  );
};

export default FeaturesSection;
