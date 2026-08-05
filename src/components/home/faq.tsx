import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal';
import {
  Accordion,
  AccordionAction,
  AccordionContent,
  AccordionIcon,
  AccordionItem,
  AccordionTitle,
} from '@/src/components/shared/ui/accordion';
import { BadgePrimary } from '@/src/components/shared/ui/badge';
import { ButtonWhite } from '@/src/components/shared/ui/button';
import Link from 'next/link';

const faqItems = [
  {
    value: 'what-does-aeli-adops-do',
    question: 'What does Aeli AdOps do?',
    answer:
      'Aeli AdOps helps digital publishers with advertising operations, monetisation, yield optimization, Google Ad Manager, programmatic direct, technical support, and website advertising optimization.',
  },
  {
    value: 'who-does-aeli-work-with',
    question: 'Who does Aeli AdOps work with?',
    answer:
      'Our services are designed primarily for digital publishers looking to improve or simplify their advertising and monetisation operations.',
  },
  {
    value: 'what-is-yield-optimization',
    question: 'What is yield optimization?',
    answer:
      'Yield optimization focuses on improving how advertising inventory generates value by examining factors such as demand, pricing, inventory, fill rate, viewability, and performance.',
  },
  {
    value: 'do-you-provide-gam-support',
    question: 'Do you provide Google Ad Manager support?',
    answer:
      'Yes. Aeli AdOps provides support around Google Ad Manager operations, including inventory, campaigns, creatives, targeting, delivery, reporting, troubleshooting, and optimization-related workflows.',
  },
  {
    value: 'what-is-included-in-free-audit',
    question: 'What is included in the Free Publisher Audit?',
    answer:
      'The initial audit focuses on key areas including revenue, viewability, fill rate, and the publisher\'s broader monetisation setup based on the information available for review.',
  },
  {
    value: 'how-do-i-get-started',
    question: 'How do I get started?',
    answer:
      'Contact our team or request a Free Publisher Audit. Tell us about your website and current monetisation setup, and we\'ll discuss the appropriate next steps.',
  },
];

const FAQ = () => {
  return (
    <section className="pt-20 md:pt-25 lg:pt-39">
      <div className="main-container">
        <div className="flex flex-col items-start justify-center gap-y-6 overflow-hidden lg:flex-row lg:gap-x-18 lg:gap-y-0">
          <RevealAnimation delay={0.1} direction="left" offset={100} className="w-full lg:w-1/2">
            <div className="space-y-14 text-center lg:text-left">
              <div className="space-y-5">
                <RevealAnimation delay={0.1}>
                  <BadgePrimary>FAQs</BadgePrimary>
                </RevealAnimation>

                <div className="space-y-3">
                  <TextReveal delay={0.2}>
                    <h2>Frequently Asked Questions</h2>
                  </TextReveal>
                  <TextReveal delay={0.3}>
                    <p className="text-background-14/60 mx-auto max-w-[450px] lg:mx-0">
                      We&apos;ve gathered the most common questions about our publisher monetisation and Ad Operations services.
                    </p>
                  </TextReveal>
                </div>
              </div>

              <Link href="/contact" className="flex justify-center lg:justify-start">
                <ButtonWhite
                  className="mx-auto w-[80%]! md:mx-0 md:w-fit!"
                  textClassName="text-center max-sm:flex-1 max-sm:px-0! max-sm:pr-8!"
                >
                  Contact Us
                </ButtonWhite>
              </Link>
            </div>
          </RevealAnimation>

          <RevealAnimation delay={0.2} direction="right" offset={100} className="w-full lg:w-1/2">
            <Accordion defaultOpen={faqItems[0].value} className="space-y-4" aria-label="FAQ">
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.value}
                  value={item.value}
                  className="group rounded-[20px] bg-white px-4 md:px-6"
                >
                  <AccordionAction
                    showIcon={false}
                    className="flex w-full cursor-pointer items-center justify-between gap-x-4 pt-6 transition-all duration-400 ease-in-out group-data-[state=closed]:pb-6 group-data-[state=open]:pb-4 md:pt-8 md:group-data-[state=closed]:pb-8"
                  >
                    <AccordionTitle>{item.question}</AccordionTitle>
                    <AccordionIcon className="shrink-0" />
                  </AccordionAction>
                  <AccordionContent contentClassName="text-tagline-3 sm:text-tagline-2 font-inter-tight cursor-text pb-8 text-left">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
