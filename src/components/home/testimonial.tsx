'use client';

import avatar1 from '@/public/images/aeli-testimonial-1.png';
import avatar2 from '@/public/images/aeli-testimonial-2.jpg';
import slideImg1 from '@/public/images/aeli-testimonial-1.png';
import slideImg2 from '@/public/images/aeli-testimonial-2.jpg';
import slideImg3 from '@/public/images/ns-avatar-5.jpg';
import slideImg4 from '@/public/images/ns-avatar-6.jpg';
import slideImg5 from '@/public/images/ns-avatar-7.jpg';
import slideImg6 from '@/public/images/ns-avatar-8.jpg';
import slideImg7 from '@/public/images/ns-avatar-9.jpg';
import slideImg8 from '@/public/images/ns-avatar-10.jpg';
import avatar3 from '@/public/images/ns-avatar-14.jpg';
import CounterNumberOnScroll from '@/src/components/animation/counter-number-on-scroll';
import RevealAnimation from '@/src/components/animation/reveal-animation';
import {
  SlideContent,
  SlideImg,
  SlideItem,
  SlideNavigation,
  SlideNext,
  SlidePrev,
  SplitSlide,
} from '@/src/components/animation/split-slide';
import { ArrowDotLeftIcon, ArrowDotRightIcon, StarIcon } from '@/src/components/shared/icon';
import AvatarItem from '@/src/components/shared/ui/avatar-reveal/avatar-item';
import AvatarReveal from '@/src/components/shared/ui/avatar-reveal/avatar-reveal';
import Image from 'next/image';

const Testimonial = () => {
  return (
    <section className="pt-20 md:pt-25 lg:pt-39">
      <div className="main-container">
        <div className="grid grid-cols-12 items-start justify-center gap-x-5 gap-y-5 lg:gap-y-0 xl:gap-x-14">
          <div className="col-span-12 lg:col-span-4">
            <div className="flex h-[300px] flex-col items-center justify-between lg:h-[355px]">
              <div className="flex flex-row items-center gap-x-4 gap-y-4 md:flex-col lg:flex-row lg:gap-y-0">
                <div className="flex items-center -space-x-4">
                  <AvatarReveal
                    className="flex items-center justify-center -space-x-3.5"
                    direction="left"
                    offset={50}
                    stagger={0.1}
                  >
                    {[avatar1, avatar2, avatar3].map((avatar, index) => (
                      <AvatarItem
                        key={avatar.src}
                        className="outline-background-2 size-11 overflow-hidden rounded-full outline-2"
                      >
                        <Image
                          src={avatar}
                          alt={`avatar-${index + 1}`}
                          className="size-full rounded-full object-cover"
                        />
                      </AvatarItem>
                    ))}
                    <AvatarItem className="font-inter-tight text-tagline-3 text-secondary flex size-11 items-center justify-center rounded-full bg-white font-normal">
                      +497
                    </AvatarItem>
                  </AvatarReveal>
                </div>

                <RevealAnimation delay={0.5} direction="right" offset={50}>
                  <div>
                    <span className="flex items-center justify-start gap-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon key={i} className="fill-primary-500 size-4" />
                      ))}
                    </span>
                    <p className="text-background-14/60 text-tagline-2">
                      Trusted by <CounterNumberOnScroll value={500} />
                      + publishers
                    </p>
                  </div>
                </RevealAnimation>
              </div>

              <div className="w-full space-y-4">
                <RevealAnimation
                  asChild={false}
                  delay={0.4}
                  className="w-full rounded-xl bg-white p-4 text-center"
                >
                  <p className="text-tagline-3">Publisher Satisfaction</p>
                  <div className="text-secondary font-medium">
                    <CounterNumberOnScroll value={96} duration={1.2} />%
                  </div>
                </RevealAnimation>

                <div className="flex items-center gap-x-4">
                  <RevealAnimation
                    asChild={false}
                    delay={0.5}
                    className="w-1/2 rounded-xl bg-white p-4 text-center"
                  >
                    <p className="text-tagline-3">Revenue Uplift</p>
                    <div className="text-secondary font-medium">
                      <CounterNumberOnScroll value={100} duration={1.2} />%
                    </div>
                  </RevealAnimation>

                  <RevealAnimation
                    asChild={false}
                    delay={0.6}
                    className="w-1/2 rounded-xl bg-white p-4 text-center"
                  >
                    <p className="text-tagline-3">Yield Improvement</p>
                    <div className="text-secondary font-medium">
                      <CounterNumberOnScroll value={87} duration={1.2} />%
                    </div>
                  </RevealAnimation>
                </div>
              </div>
            </div>
          </div>

          <RevealAnimation delay={0.6} className="col-span-12 lg:col-span-8">
            <div>
              <SplitSlide>
                <SlideItem>
                  <SlideImg src={slideImg1} alt="testimonial one" />
                  <SlideContent>
                    <p className="text-secondary">
                      &ldquo;Before working with Aeli AdOps, we had no real visibility into why our
                      revenue was underperforming.
                      <span className="mt-5 inline-block">
                        After their audit, they identified specific inventory and pricing issues we
                        hadn&apos;t considered. Revenue improvement was significant and
                        sustained.&rdquo;
                      </span>
                    </p>
                  </SlideContent>
                </SlideItem>

                <SlideItem>
                  <SlideImg src={slideImg2} alt="testimonial two" />
                  <SlideContent>
                    <p className="text-secondary">
                      &ldquo;Our Google Ad Manager setup was messy and we didn&apos;t know where to
                      start fixing it.
                      <span className="mt-5 inline-block">
                        Aeli AdOps came in, audited everything, restructured our inventory, and our
                        fill rate improved dramatically within the first month.&rdquo;
                      </span>
                    </p>
                  </SlideContent>
                </SlideItem>

                <SlideItem>
                  <SlideImg src={slideImg3} alt="testimonial three" />
                  <SlideContent>
                    <p className="text-secondary">
                      &ldquo;We needed reliable AdOps support without hiring full-time. Aeli filled
                      that gap perfectly.
                      <span className="mt-5 inline-block">
                        Campaign trafficking, reporting, troubleshooting — everything runs smoothly
                        now. It&apos;s like having a senior AdOps team without the overhead.&rdquo;
                      </span>
                    </p>
                  </SlideContent>
                </SlideItem>

                <SlideItem>
                  <SlideImg src={slideImg4} alt="testimonial four" />
                  <SlideContent>
                    <p className="text-secondary">
                      &ldquo;The programmatic direct deals we had were underperforming and we
                      couldn&apos;t pinpoint why.
                      <span className="mt-5 inline-block">
                        Aeli AdOps reviewed our deal setup, targeting, and floor pricing. The
                        improvements they recommended led to a noticeable jump in monetisation
                        within weeks.&rdquo;
                      </span>
                    </p>
                  </SlideContent>
                </SlideItem>

                <SlideItem>
                  <SlideImg src={slideImg5} alt="testimonial five" />
                  <SlideContent>
                    <p className="text-secondary">
                      &ldquo;Viewability was something we knew mattered but didn&apos;t know how to
                      optimise systematically.
                      <span className="mt-5 inline-block">
                        Aeli AdOps walked us through practical improvements to our ad placement and
                        inventory structure. Our viewability metrics improved substantially and
                        demand partners noticed.&rdquo;
                      </span>
                    </p>
                  </SlideContent>
                </SlideItem>

                <SlideItem>
                  <SlideImg src={slideImg6} alt="testimonial six" />
                  <SlideContent>
                    <p className="text-secondary">
                      &ldquo;We were running header bidding but felt like we weren&apos;t getting
                      the most out of it.
                      <span className="mt-5 inline-block">
                        Aeli AdOps reviewed our wrapper configuration, timeout settings, and demand
                        partner performance. The adjustments they suggested made a real difference
                        to our overall yield.&rdquo;
                      </span>
                    </p>
                  </SlideContent>
                </SlideItem>

                <SlideItem>
                  <SlideImg src={slideImg7} alt="testimonial seven" />
                  <SlideContent>
                    <p className="text-secondary">
                      &ldquo;What stood out about Aeli AdOps was their publisher-first mindset.
                      <span className="mt-5 inline-block">
                        They didn&apos;t just look at revenue in isolation — they considered the
                        user experience and long-term sustainability of our monetisation setup.
                        That balanced approach gave us real confidence.&rdquo;
                      </span>
                    </p>
                  </SlideContent>
                </SlideItem>

                <SlideItem>
                  <SlideImg src={slideImg8} alt="testimonial eight" />
                  <SlideContent>
                    <p className="text-secondary">
                      &ldquo;The free publisher audit was eye-opening. We expected a generic report
                      but instead got a detailed, specific analysis of our setup.
                      <span className="mt-5 inline-block">
                        Aeli AdOps identified revenue opportunities we didn&apos;t know existed and
                        gave us a clear path forward. That audit alone was worth more than we
                        expected.&rdquo;
                      </span>
                    </p>
                  </SlideContent>
                </SlideItem>

                {/* upper md  */}
                <SlideNavigation className="absolute right-5 bottom-10 z-20 mx-auto mt-6 hidden w-full max-w-[180px] max-[376px]:max-w-[140px] md:flex md:max-w-[220px] lg:max-w-[300px] xl:max-w-[446px]">
                  <SlidePrev>
                    <button type="button" aria-label="Previous testimonial">
                      <ArrowDotLeftIcon className="fill-secondary group-hover:fill-accent size-6 transition-colors duration-500" />
                    </button>
                  </SlidePrev>
                  <SlideNext>
                    <button type="button" aria-label="Next testimonial">
                      <ArrowDotRightIcon className="fill-secondary group-hover:fill-accent size-6 transition-colors duration-500" />
                    </button>
                  </SlideNext>
                </SlideNavigation>

                {/* lower md and below */}
                <SlideNavigation className="mx-auto mt-6 flex w-[220px] md:hidden">
                  <SlidePrev>
                    <button type="button" aria-label="Previous testimonial">
                      <ArrowDotLeftIcon className="fill-secondary group-hover:fill-accent size-6 transition-colors duration-500" />
                    </button>
                  </SlidePrev>
                  <SlideNext>
                    <button type="button" aria-label="Next testimonial">
                      <ArrowDotRightIcon className="fill-secondary group-hover:fill-accent size-6 transition-colors duration-500" />
                    </button>
                  </SlideNext>
                </SlideNavigation>
              </SplitSlide>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
