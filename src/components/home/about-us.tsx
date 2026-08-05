'use client';

import aboutImgPrimary from '@/public/images/pexels-mikael-blomkvist-6476245.jpg';
import aboutImgSecondary from '@/public/images/pexels-yankrukov-7693745.jpg';
import CounterNumberOnScroll from '@/src/components/animation/counter-number-on-scroll';
import RevealAnimation from '@/src/components/animation/reveal-animation';
import { StarIcon } from '@/src/components/shared/icon';
import { BadgePrimary } from '@/src/components/shared/ui/badge';
import { ButtonWhite } from '@/src/components/shared/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { fadeUp, imageReveal, staggerContainer } from '@/src/components/animation/motion-variants';

const AboutUs = () => {
  return (
    <section className="pt-20 md:pt-25 lg:pt-39">
      <div className="main-container">
        <div className="grid grid-cols-12 items-center justify-center gap-y-8 lg:gap-x-8 xl:gap-x-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={imageReveal}
            className="col-span-12 lg:col-span-3"
          >
            <figure className="h-[520px] w-full overflow-hidden rounded-[20px]">
              <Image src={aboutImgPrimary} alt="about-us-img" className="size-full object-cover transition-transform duration-700 hover:scale-105" />
            </figure>
          </motion.div>

          <div className="col-span-12 lg:col-span-9">
            <div className="flex w-full flex-col gap-y-8 xl:gap-y-14">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <div className="flex flex-col items-center justify-center gap-y-8 md:gap-x-8 lg:flex-row xl:gap-x-14">
                  <div className="w-full space-y-5 lg:w-1/2">
                    <BadgePrimary>About Aeli AdOps</BadgePrimary>
                    <motion.h2 variants={fadeUp}>
                      Trusted Publisher Monetization Partner
                    </motion.h2>
                  </div>

                  <div className="w-full space-y-6 lg:w-1/2 lg:space-y-8">
                    <motion.div variants={fadeUp} className="space-y-4">
                      <p>
                        Every publisher is different, and so is every monetization strategy. At Aeli AdOps, we work closely with publishers to understand their inventory, solve technical challenges, improve ad performance, and support long-term revenue growth.
                      </p>
                      <p>
                        Whether you&apos;re managing a growing website or an established publishing network, we&apos;re here to help you build a stronger advertising business.
                      </p>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                      <Link href="/about">
                        <ButtonWhite
                          className="mx-auto w-[80%]! md:mx-0 md:w-fit!"
                          textClassName="text-center text-nowrap max-sm:flex-1 max-sm:pr-8!"
                        >
                          Learn More About Us
                        </ButtonWhite>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              <RevealAnimation delay={0.3}>
                <div className="flex flex-col items-end justify-end gap-y-5 md:flex-row md:gap-x-8 xl:gap-x-14">
                  <div className="w-full space-y-8 md:w-1/2">
                    <div className="flex items-center justify-start gap-x-8">
                      <div className="space-y-1">
                        <h3 className="text-heading-5">
                          <CounterNumberOnScroll value={100} />
                          <span>%</span>
                        </h3>
                        <p className="text-background-14/60">Publisher Focused</p>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-heading-5">
                          <CounterNumberOnScroll value={6} />
                          <span>+</span>
                        </h3>
                        <p className="text-background-14/60">Monetisation Services</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-heading-5 flex items-center gap-x-2">
                        <CounterNumberOnScroll
                          value={4.9}
                          format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
                        />
                        <span className="size-5">
                          <StarIcon className="fill-primary-500 size-4" />
                        </span>
                      </h3>
                      <p className="text-background-14/60">publisher rating</p>
                    </div>
                  </div>

                  <motion.figure
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={imageReveal}
                    className="h-[290px] w-full overflow-hidden rounded-[20px] md:w-1/2"
                  >
                    <Image
                      src={aboutImgSecondary}
                      alt="about-us-img"
                      className="size-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </motion.figure>
                </div>
              </RevealAnimation>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
