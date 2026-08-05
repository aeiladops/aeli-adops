'use client';

import { BadgePrimary } from '@/src/components/shared/ui/badge';
import { ButtonWhite } from '@/src/components/shared/ui/button';
import { BenefitCard, BenefitImageCard, BenefitRoiCard } from '@/src/components/shared/ui/card';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeUp, staggerContainer, staggerItem } from '@/src/components/animation/motion-variants';

const benefitCards = [
  { title: 'Publisher-focused solutions', iconClass: 'ns-shape-1' },
  { title: 'Transparent communication', iconClass: 'ns-shape-2' },
  { title: 'Reliable technical support', iconClass: 'ns-shape-3' },
  { title: 'Data-driven recommendations', iconClass: 'ns-shape-4' },
  { title: 'Long-term partnership', iconClass: 'ns-shape-5' },
];

const Benefits = () => {
  return (
    <section className="pt-20 md:pt-25 lg:pt-39">
      <div className="main-container">
        <div className="space-y-10 lg:space-y-18">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-8 text-center"
          >
            <div className="space-y-5">
              <motion.div variants={fadeUp}>
                <BadgePrimary>Publisher-First Approach</BadgePrimary>
              </motion.div>

              <div className="space-y-3">
                <motion.h2 variants={fadeUp}>
                  Why Choose Aeli AdOps?
                </motion.h2>
                <motion.p variants={fadeUp} className="text-background-14/60 mx-auto max-w-[620px]">
                  Everything we do starts with understanding your business. We focus on practical solutions that help publishers grow revenue while maintaining a great user experience.
                </motion.p>
              </div>
            </div>

            <motion.div variants={fadeUp} className="flex items-center justify-center">
              <Link href="/publisher-audit">
                <ButtonWhite
                  className="mx-auto w-[80%]! md:w-fit!"
                  textClassName="text-center text-nowrap max-sm:flex-1 max-sm:pr-8!"
                >
                  Request a Free Audit
                </ButtonWhite>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-12 items-center justify-center gap-y-5 md:gap-4"
          >
            <motion.div variants={staggerItem} className="col-span-12 md:col-span-6 lg:col-span-3">
              <BenefitCard title={benefitCards[0].title} iconClass={benefitCards[0].iconClass} />
            </motion.div>

            <motion.div variants={staggerItem} className="col-span-12 md:col-span-6 lg:col-span-3">
              <BenefitCard title={benefitCards[1].title} iconClass={benefitCards[1].iconClass} />
            </motion.div>

            <motion.div variants={staggerItem} className="col-span-12 md:col-span-6 lg:col-span-3">
              <BenefitCard title={benefitCards[2].title} iconClass={benefitCards[2].iconClass} />
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="col-span-12 row-span-2 md:col-span-6 lg:col-span-3"
            >
              <BenefitRoiCard />
            </motion.div>

            <motion.div variants={staggerItem} className="col-span-12 md:col-span-6 lg:col-span-3">
              <BenefitCard title={benefitCards[3].title} iconClass={benefitCards[3].iconClass} />
            </motion.div>

            <motion.div variants={staggerItem} className="col-span-12 md:col-span-6 lg:col-span-3">
              <BenefitImageCard />
            </motion.div>

            <motion.div variants={staggerItem} className="col-span-12 md:col-span-6 lg:col-span-3">
              <BenefitCard title={benefitCards[4].title} iconClass={benefitCards[4].iconClass} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
