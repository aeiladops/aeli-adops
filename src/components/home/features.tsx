'use client';

import smartConditionsImg from '@/public/images/ns-img-10.svg';
import multiStepAutomationImg from '@/public/images/ns-img-11.svg';
import realTimeTriggersImg from '@/public/images/ns-img-8.svg';
import appIntegrationsImg from '@/public/images/ns-img-9.svg';
import techSupportSvg from '@/public/images/ns-img-19.svg';
import webMonetizationSvg from '@/public/images/ns-img-20.svg';
import { BadgePrimary } from '@/src/components/shared/ui/badge';
import { ButtonWhite } from '@/src/components/shared/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { fadeUp, staggerContainer, staggerItem } from '@/src/components/animation/motion-variants';

const servicesList = [
  {
    title: 'Yield Optimization',
    description:
      'Improve revenue with data-driven optimization strategies that maximize the value of your ad inventory.',
    image: appIntegrationsImg,
    imageAlt: 'Yield Optimization',
  },
  {
    title: 'Google Ad Manager',
    description:
      'From setup to optimization, we help you manage Google Ad Manager with confidence.',
    image: smartConditionsImg,
    imageAlt: 'Google Ad Manager',
  },
  {
    title: 'Ad Operations',
    description:
      'Reliable campaign management, troubleshooting, trafficking, reporting, and day-to-day AdOps support.',
    image: realTimeTriggersImg,
    imageAlt: 'Ad Operations',
  },
  {
    title: 'Programmatic Direct',
    description:
      'Support for Programmatic Guaranteed, Preferred Deals, Private Marketplace (PMP), and direct monetization strategies.',
    image: multiStepAutomationImg,
    imageAlt: 'Programmatic Direct',
  },
  {
    title: 'Technical Support',
    description:
      'Quick resolution of ad serving issues, implementation challenges, policy concerns, and technical configurations.',
    image: techSupportSvg,
    imageAlt: 'Technical Support',
  },
  {
    title: 'Website Ad Monetization & Optimization',
    description:
      'Improve ad placements, user experience, viewability, and overall monetization performance.',
    image: webMonetizationSvg,
    imageAlt: 'Website Ad Monetization & Optimization',
  },
];

const Features = () => {
  return (
    <section className="pt-20 md:pt-25 lg:pt-39">
      <div className="main-container">
        <div className="space-y-18">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-8 text-center"
          >
            <div className="space-y-5">
              <motion.div variants={fadeUp}>
                <BadgePrimary>Our Services</BadgePrimary>
              </motion.div>

              <div className="space-y-3">
                <motion.h2 variants={fadeUp}>
                  Our Services
                </motion.h2>
                <motion.p variants={fadeUp} className="text-background-14/60 mx-auto max-w-[550px]">
                  From strategy to implementation, Aeli AdOps supports the critical areas behind publisher advertising performance.
                </motion.p>
              </div>
            </div>

            <motion.div variants={fadeUp}>
              <Link href="/services">
                <ButtonWhite
                  className="mx-auto w-[80%]! md:w-fit!"
                  textClassName="text-center text-nowrap max-sm:flex-1 max-sm:pr-8!"
                >
                  Explore All Services
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
            {servicesList.map((service) => (
              <motion.div
                key={service.title}
                variants={staggerItem}
                className="col-span-12 md:col-span-6 lg:col-span-4"
              >
                <motion.div
                  whileHover={{ y: -4, borderColor: '#0052FF' }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="group flex h-[380px] flex-col items-start justify-between rounded-[20px] bg-white p-6 border border-transparent transition-all duration-300 hover:shadow-lg lg:h-[450px]"
                >
                  <div className="space-y-2">
                    <h3 className="text-heading-5 font-bold group-hover:text-primary-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-background-14/60 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <figure className="w-full h-[200px] flex items-center justify-center pt-2 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      className="max-h-[190px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </figure>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;
