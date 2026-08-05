import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal';
import { BadgePrimary } from '@/src/components/shared/ui/badge';

const ServicesHero = () => {
  return (
    <section className="relative overflow-hidden pt-20 md:pt-25 lg:pt-39">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 size-[500px] rounded-full bg-primary-200/15 blur-[120px]" />
        <div className="absolute -right-40 top-20 size-[400px] rounded-full bg-ns-cyan/10 blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-primary-100/10 blur-[140px]" />
      </div>

      <div className="main-container relative z-10">
        <div className="space-y-10 md:space-y-14">
          <div className="mx-auto max-w-[850px] space-y-5 text-center">
            {/* Badge */}
            <RevealAnimation delay={0.1} instant>
              <div className="flex justify-center">
                <BadgePrimary>Request a Service</BadgePrimary>
              </div>
            </RevealAnimation>

            {/* Heading */}
            <TextReveal delay={0.2}>
              <h1 className="mx-auto max-w-[800px]">
                Let&apos;s Grow Your Publisher{' '}
                <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                  Revenue Together
                </span>
              </h1>
            </TextReveal>

            {/* Subtitle */}
            <TextReveal delay={0.3}>
              <p className="text-tagline-1 text-secondary/60 mx-auto max-w-[700px]">
                Tell us a little about your website and the services you&apos;re looking for. Our
                team will review your request and get in touch with you to discuss the best solution
                for your publishing business.
              </p>
            </TextReveal>
          </div>

          {/* Decorative stats bar */}
          <RevealAnimation delay={0.4}>
            <div className="mx-auto flex max-w-[750px] items-center justify-center gap-8 rounded-2xl border border-secondary/8 bg-white/80 px-8 py-5 shadow-sm backdrop-blur-sm md:gap-14">
              <div className="text-center">
                <p className="text-heading-5 md:text-heading-4 font-semibold text-secondary">
                  500+
                </p>
                <p className="text-tagline-3 text-secondary/50">Publishers Served</p>
              </div>
              <div className="h-10 w-px bg-secondary/10" />
              <div className="text-center">
                <p className="text-heading-5 md:text-heading-4 font-semibold text-secondary">
                  9+
                </p>
                <p className="text-tagline-3 text-secondary/50">Specialized Services</p>
              </div>
              <div className="h-10 w-px bg-secondary/10" />
              <div className="text-center">
                <p className="text-heading-5 md:text-heading-4 font-semibold text-secondary">
                  24h
                </p>
                <p className="text-tagline-3 text-secondary/50">Response Time</p>
              </div>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
