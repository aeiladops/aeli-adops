'use client';

import processCardOneImg from '@/public/images/pexels-fauxels-3184635.jpg';
import processCardOneOverlay from '@/public/images/ns-img-12.svg';
import processCardTwoOverlay from '@/public/images/ns-img-13.png';
import processCardThreeOverlay from '@/public/images/ns-img-14.svg';
import processCardFourOverlay from '@/public/images/ns-img-15.svg';
import processCardFourImg from '@/public/images/pexels-rdne-7414216.jpg';
import processCardThreeImg from '@/public/images/process-3.png';
import processCardTwoImg from '@/public/images/process-2.png';
import {
  CardRevealWithProcess,
  CardsWrapper,
  ProcessCard,
  ProcessContent,
  ProcessImg,
  ProcessImgWrapper,
  ProcessStep,
  ProcessTimeline,
} from '@/src/components/animation/card-reveal-with-process';
import RevealAnimation from '@/src/components/animation/reveal-animation';
import { BadgePrimary } from '@/src/components/shared/ui/badge';
import { ButtonWhite } from '@/src/components/shared/ui/button';
import { motion } from 'framer-motion';
import { StaticImageData } from 'next/image';
import Link from 'next/link';
import { fadeUp, staggerContainer } from '@/src/components/animation/motion-variants';

type ProcessCardData = {
  image: StaticImageData | string;
  imageAlt: string;
  overlay: StaticImageData | string;
  overlayAlt: string;
  title: string;
  description: string;
  details: { title: string; description: string }[];
};

const processCards: ProcessCardData[] = [
  {
    image: processCardOneImg,
    imageAlt: '1. Understand Your Website',
    overlay: processCardOneOverlay,
    overlayAlt: 'process-step-1',
    title: '1. Understand Your Website',
    description:
      'We learn about your business, audience, and advertising goals.',
    details: [
      {
        title: 'Business & Audience Analysis',
        description: 'We align on your long-term publishing targets and audience needs.',
      },
      {
        title: 'Monetization Goals',
        description: 'Understanding your unique inventory and revenue parameters.',
      },
    ],
  },
  {
    image: processCardTwoImg,
    imageAlt: '2. Analyze Your Setup',
    overlay: processCardTwoOverlay,
    overlayAlt: 'process-step-2',
    title: '2. Analyze Your Setup',
    description:
      'We review your Google Ad Manager, inventory, and monetization performance.',
    details: [
      {
        title: 'Google Ad Manager Audit',
        description: 'In-depth assessment of price floors, yield, and viewability.',
      },
      {
        title: 'Performance Diagnostic',
        description: 'Pinpoint fill rate gaps and inventory optimization points.',
      },
    ],
  },
  {
    image: processCardThreeImg,
    imageAlt: '3. Optimize & Support',
    overlay: processCardThreeOverlay,
    overlayAlt: 'process-step-3',
    title: '3. Optimize & Support',
    description:
      'We implement improvements, solve technical issues, and help you maximize your ad revenue.',
    details: [
      {
        title: 'Technical Implementation',
        description: 'Seamless execution of yield strategies and technical fixes.',
      },
      {
        title: 'AdOps Workflow Support',
        description: 'Dependable day-to-day operations and campaign management.',
      },
    ],
  },
  {
    image: processCardFourImg,
    imageAlt: '4. Continue Growing',
    overlay: processCardFourOverlay,
    overlayAlt: 'process-step-4',
    title: '4. Continue Growing',
    description:
      'We monitor performance and work with you to improve results over time.',
    details: [
      {
        title: 'Performance Monitoring',
        description: 'Regular check-ins and performance tuning.',
      },
      {
        title: 'Long-term Growth',
        description: 'Proactive strategies that adapt to market and demand shifts.',
      },
    ],
  },
];

const Process = () => {
  return (
    <section className="pt-20 md:pt-25 lg:pt-39">
      <div className="main-container">
        <div className="space-y-10 lg:space-y-18">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex w-auto flex-col items-center justify-center gap-x-18 md:mx-auto md:w-[500px] lg:w-auto lg:flex-row"
          >
            <div className="space-y-5 text-center lg:w-1/2 lg:text-left">
              <motion.div variants={fadeUp}>
                <BadgePrimary>A Simple Process</BadgePrimary>
              </motion.div>
              <motion.h2 variants={fadeUp}>
                How We Work
              </motion.h2>
            </div>
            <div className="space-y-8 text-center lg:w-1/2 lg:text-left">
              <motion.p variants={fadeUp} className="text-background-14/60">
                A simple, structured 4-step process designed to elevate your publisher advertising performance sustainably.
              </motion.p>
              <motion.div variants={fadeUp} className="inline-block w-full md:w-auto">
                <Link href="/publisher-audit">
                  <ButtonWhite className="mx-auto w-[80%]! md:w-fit!">Learn About Our Approach</ButtonWhite>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <RevealAnimation delay={0.3}>
            <CardRevealWithProcess cardCount={processCards.length}>
              <ProcessTimeline className="flex w-full flex-row items-center justify-center md:hidden">
                {processCards.map((card, index) => (
                  <ProcessStep
                    key={card.title}
                    index={index}
                    label={String(index + 1).padStart(2, '0')}
                  />
                ))}
              </ProcessTimeline>

              <CardsWrapper>
                {processCards.map((card, index) => (
                  <ProcessCard key={card.title} index={index}>
                    <ProcessImgWrapper>
                      <ProcessImg
                        index={index}
                        image={card.image}
                        imageAlt={card.imageAlt}
                        overlay={card.overlay}
                        overlayAlt={card.overlayAlt}
                      />
                    </ProcessImgWrapper>
                    <ProcessContent
                      index={index}
                      title={card.title}
                      description={card.description}
                      details={card.details}
                    />
                  </ProcessCard>
                ))}
              </CardsWrapper>

              <ProcessTimeline className="hidden w-[5%] flex-col items-center justify-center md:flex">
                {processCards.map((card, index) => (
                  <ProcessStep
                    key={card.title}
                    index={index}
                    label={String(index + 1).padStart(2, '0')}
                  />
                ))}
              </ProcessTimeline>
            </CardRevealWithProcess>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default Process;
