'use client';

import globeImg from '@/public/images/ns-img-26.svg';
import { BadgePrimary } from '@/src/components/shared/ui/badge';
import { ButtonPrimary } from '@/src/components/shared/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { fadeUp, staggerContainer } from '@/src/components/animation/motion-variants';

const CTA = () => {
  return (
    <section className="pt-20 md:pt-25 lg:pt-39">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="main-container"
      >
        <div className="relative overflow-hidden rounded-2xl bg-white px-5 pt-20 pb-20 md:px-16 md:pt-39 md:pb-39 lg:pt-60">
          <motion.figure
            animate={{ y: [-6, 6, -6], rotate: [0, 2, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-15 left-1/2 z-10 size-[639px] -translate-x-1/2"
          >
            <Image src={globeImg} alt="globe" className="size-full object-cover opacity-80" />
          </motion.figure>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="relative z-20 space-y-8"
          >
            <div className="space-y-5 text-center">
              <motion.div variants={fadeUp}>
                <BadgePrimary>Get Started</BadgePrimary>
              </motion.div>

              <div className="space-y-3">
                <motion.h2 variants={fadeUp} className="mx-auto max-w-[700px]">
                  Ready to Grow Your Advertising Revenue?
                </motion.h2>
                <motion.p variants={fadeUp} className="text-background-14/60 mx-auto max-w-[620px]">
                  Whether you need help with Google Ad Manager, Ad Operations, technical support, or publisher monetization, Aeli AdOps is ready to support your growth.
                </motion.p>
              </div>
            </div>

            <motion.div variants={fadeUp} className="flex justify-center">
              <Link href="/contact">
                <ButtonPrimary
                  className="mx-auto md:mx-0 md:w-fit!"
                  textClassName="text-center text-nowrap max-sm:flex-1 max-sm:pr-8!"
                >
                  Contact Us →
                </ButtonPrimary>
              </Link>
            </motion.div>
          </motion.div>

          <div
            className="absolute bottom-0 left-0 z-10 h-[300px] w-full rounded-b-[20px] lg:h-[390px]"
            style={{
              background:
                'linear-gradient(180deg, rgba(255, 255, 255, 0) -59.75%, rgba(255, 255, 255, 0.5) -10.1%, rgba(255, 255, 255, 0.8) 30.12%, #fff 70.98%)',
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
