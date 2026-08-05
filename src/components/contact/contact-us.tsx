'use client';

import contactHeroImg from '@/public/images/aeli-contact-hero.jpg';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import ContactForm from '@/src/components/contact/contact-form';

/* ─────── Animation Variants ─────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
  }),
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay },
  }),
};

/* ─────── Contact Info Items ─────── */
const contactItems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: 'Contact',
    value: 'contact@aeliadops.com',
    href: 'mailto:contact@aeliadops.com',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: 'Info',
    value: 'info@aeliadops.com',
    href: 'mailto:info@aeliadops.com',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M11.999 0C5.373 0 0 5.373 0 12c0 2.117.555 4.1 1.524 5.823L.057 23.804a.75.75 0 00.92.92l5.981-1.467A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.708 9.708 0 01-4.952-1.354l-.355-.213-3.685.903.922-3.584-.233-.37A9.718 9.718 0 012.25 12C2.25 6.615 6.614 2.25 12 2.25c5.386 0 9.75 4.365 9.75 9.75S17.386 21.75 12 21.75z" />
      </svg>
    ),
    label: 'WhatsApp',
    value: '+91 70951 85429',
    href: 'https://wa.me/917095185429',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: 'Location',
    value: 'View on Google Maps',
    href: 'https://maps.app.goo.gl/XSdqskBr5xrmNxCv6',
  },
];

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/theaeliacademy?igsh=bGV6d2hib2tuaGRp',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/917095185429',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M11.999 0C5.373 0 0 5.373 0 12c0 2.117.555 4.1 1.524 5.823L.057 23.804a.75.75 0 00.92.92l5.981-1.467A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.708 9.708 0 01-4.952-1.354l-.355-.213-3.685.903.922-3.584-.233-.37A9.718 9.718 0 012.25 12C2.25 6.615 6.614 2.25 12 2.25c5.386 0 9.75 4.365 9.75 9.75S17.386 21.75 12 21.75z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:contact@aeliadops.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

/* ─────── Animated Contact Info Card ─────── */
function ContactInfoCard({
  item,
  index,
}: {
  item: (typeof contactItems)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.a
      ref={ref}
      href={item.href}
      target={item.href.startsWith('http') ? '_blank' : undefined}
      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      variants={fadeUp}
      custom={0.1 * index}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group flex items-start gap-4 rounded-2xl border border-secondary/10 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition-shadow duration-300 hover:shadow-md"
    >
      <div className="bg-accent/10 text-accent flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
        {item.icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-tagline-3 text-secondary/50 mb-0.5 font-normal uppercase tracking-wider">
          {item.label}
        </p>
        <p className="text-tagline-2 text-secondary truncate font-medium">{item.value}</p>
      </div>
      <div className="text-secondary/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </motion.a>
  );
}

/* ─────── Main Component ─────── */
const ContactUs = () => {
  const heroRef = useRef(null);
  const formSectionRef = useRef(null);
  const mapSectionRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const formInView = useInView(formSectionRef, { once: true, margin: '-80px' });
  const mapInView = useInView(mapSectionRef, { once: true, margin: '-80px' });

  return (
    <section className="pt-20 md:pt-25 lg:pt-39">
      <div className="main-container">
        <div className="space-y-16 lg:space-y-24">

          {/* ── Header ── */}
          <div ref={heroRef} className="space-y-4 text-center">
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate={heroInView ? 'visible' : 'hidden'}
            >
              <span className="bg-accent/10 text-accent rounded-full px-4 py-1.5 text-sm font-medium">
                Get In Touch
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              custom={0.1}
              initial="hidden"
              animate={heroInView ? 'visible' : 'hidden'}
              className="mx-auto max-w-[700px]"
            >
              Let&apos;s Connect.{' '}
              <span className="font-serif italic" style={{ color: '#2563eb', fontFamily: 'Georgia, "Times New Roman", serif' }}>Collaborate.</span> Grow.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={0.2}
              initial="hidden"
              animate={heroInView ? 'visible' : 'hidden'}
              className="text-tagline-1 text-secondary/60 mx-auto max-w-[620px]"
            >
              Every publisher&apos;s monetisation journey is different. Whether you&apos;re looking
              to improve advertising performance, simplify Ad Operations, troubleshoot a technical
              issue, or get a Free Publisher Audit — we&apos;d be happy to hear from you.
            </motion.p>

            {/* Social Links */}
            <motion.div
              variants={fadeUp}
              custom={0.3}
              initial="hidden"
              animate={heroInView ? 'visible' : 'hidden'}
              className="flex items-center justify-center gap-3 pt-2"
            >
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group border-secondary/15 text-secondary/50 hover:border-accent hover:text-accent hover:bg-accent/5 flex size-10 items-center justify-center rounded-full border bg-white/80 backdrop-blur-sm transition-all duration-300"
                >
                  {social.icon}
                </Link>
              ))}
            </motion.div>
          </div>

          {/* ── Contact Info Cards ── */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactItems.map((item, i) => (
              <ContactInfoCard key={item.label} item={item} index={i} />
            ))}
          </div>

          {/* ── Form + Image ── */}
          <div ref={formSectionRef} className="overflow-hidden rounded-3xl border border-secondary/10 bg-gradient-to-br from-white/80 to-white/40 shadow-lg backdrop-blur-md">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Form Side */}
              <motion.div
                variants={fadeLeft}
                custom={0.1}
                initial="hidden"
                animate={formInView ? 'visible' : 'hidden'}
                className="space-y-8 p-8 md:p-12"
              >
                <div className="space-y-2">
                  <motion.h3
                    variants={fadeUp}
                    custom={0.2}
                    initial="hidden"
                    animate={formInView ? 'visible' : 'hidden'}
                    className="text-heading-4"
                  >
                    Send us a message
                  </motion.h3>
                  <motion.p
                    variants={fadeUp}
                    custom={0.3}
                    initial="hidden"
                    animate={formInView ? 'visible' : 'hidden'}
                    className="text-tagline-2 text-secondary/60"
                  >
                    Fill out the form and our team will get back to you within 24 hours.
                  </motion.p>
                </div>

                <motion.div
                  variants={fadeUp}
                  custom={0.4}
                  initial="hidden"
                  animate={formInView ? 'visible' : 'hidden'}
                >
                  <ContactForm />
                </motion.div>
              </motion.div>

              {/* Image Side */}
              <motion.div
                variants={fadeRight}
                custom={0.2}
                initial="hidden"
                animate={formInView ? 'visible' : 'hidden'}
                className="relative min-h-[400px] overflow-hidden lg:min-h-full"
              >
                <Image
                  src={contactHeroImg}
                  alt="Contact Aeli AdOps"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {/* Overlay with contact info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 space-y-4 p-8">
                  <motion.div
                    variants={fadeUp}
                    custom={0.4}
                    initial="hidden"
                    animate={formInView ? 'visible' : 'hidden'}
                    className="space-y-3"
                  >
                    <p className="text-tagline-3 font-medium tracking-widest text-white/60 uppercase">
                      Reach us directly
                    </p>
                    <div className="space-y-2">
                      <a
                        href="mailto:contact@aeliadops.com"
                        className="group flex items-center gap-2 text-white/90 transition-colors hover:text-white"
                      >
                        <span className="size-1.5 rounded-full bg-emerald-400" />
                        <span className="text-tagline-2 font-normal">contact@aeliadops.com</span>
                      </a>
                      <a
                        href="mailto:info@aeliadops.com"
                        className="group flex items-center gap-2 text-white/90 transition-colors hover:text-white"
                      >
                        <span className="size-1.5 rounded-full bg-emerald-400" />
                        <span className="text-tagline-2 font-normal">info@aeliadops.com</span>
                      </a>
                      <a
                        href="https://wa.me/917095185429"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-white/90 transition-colors hover:text-white"
                      >
                        <span className="size-1.5 rounded-full bg-green-400" />
                        <span className="text-tagline-2 font-normal">WhatsApp: +91 70951 85429</span>
                      </a>
                    </div>
                  </motion.div>

                  {/* Social pills */}
                  <motion.div
                    variants={fadeUp}
                    custom={0.5}
                    initial="hidden"
                    animate={formInView ? 'visible' : 'hidden'}
                    className="flex flex-wrap gap-2"
                  >
                    <a
                      href="https://www.instagram.com/theaeliacademy?igsh=bGV6d2hib2tuaGRp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                      @theaeliacademy
                    </a>
                    <a
                      href="https://wa.me/917095185429"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                    >
                      WhatsApp Us
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── Google Maps Embed ── */}
          <div ref={mapSectionRef} className="space-y-6">
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate={mapInView ? 'visible' : 'hidden'}
              className="text-center"
            >
              <h3 className="text-heading-5">Find Us</h3>
              <p className="text-tagline-2 text-secondary/60 mt-2">
                Visit us or{' '}
                <a
                  href="https://maps.app.goo.gl/XSdqskBr5xrmNxCv6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  open in Google Maps
                </a>
              </p>
            </motion.div>

            <motion.div
              variants={scaleIn}
              custom={0.1}
              initial="hidden"
              animate={mapInView ? 'visible' : 'hidden'}
              className="overflow-hidden rounded-2xl border border-secondary/10 shadow-md"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122340.82879316!2d78.3432!3d17.385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIzJzA2LjAiTiA3OMKwMjAnMzUuMiJF!5e0!3m2!1sen!2sin!4v1000000000000"
                width="100%"
                height="420"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Aeli AdOps Location"
              />
            </motion.div>

            {/* Quick action links below map */}
            <motion.div
              variants={fadeUp}
              custom={0.2}
              initial="hidden"
              animate={mapInView ? 'visible' : 'hidden'}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              <a
                href="https://maps.app.goo.gl/XSdqskBr5xrmNxCv6"
                target="_blank"
                rel="noopener noreferrer"
                className="group border-secondary/20 text-secondary hover:border-accent hover:text-accent flex items-center gap-2 rounded-full border bg-white/80 px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:shadow-sm"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Get Directions
              </a>
              <a
                href="https://wa.me/917095185429"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-emerald-600 hover:shadow-md"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M11.999 0C5.373 0 0 5.373 0 12c0 2.117.555 4.1 1.524 5.823L.057 23.804a.75.75 0 00.92.92l5.981-1.467A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.708 9.708 0 01-4.952-1.354l-.355-.213-3.685.903.922-3.584-.233-.37A9.718 9.718 0 012.25 12C2.25 6.615 6.614 2.25 12 2.25c5.386 0 9.75 4.365 9.75 9.75S17.386 21.75 12 21.75z" />
                </svg>
                Chat on WhatsApp
              </a>
              <a
                href="https://www.instagram.com/theaeliacademy?igsh=bGV6d2hib2tuaGRp"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:shadow-md"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                Follow on Instagram
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactUs;
