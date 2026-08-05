'use client';

import { AuditFormSection } from '@/src/components/services/audit-form-section';
import ServicesHero from '@/src/components/services/hero';
import ServicesGrid from '@/src/components/services/services-grid';
import WhyChoose from '@/src/components/services/why-choose';
import CTA from '@/src/components/shared/cta';
import { useRef, useState } from 'react';

export default function ServicesPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const auditFormRef = useRef<HTMLDivElement>(null);

  const handleToggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((s) => s !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSelectServiceFromGrid = (serviceId: string) => {
    // Add service if not already selected
    if (!selectedServices.includes(serviceId)) {
      setSelectedServices((prev) => [...prev, serviceId]);
    }
    // Scroll smoothly to audit form section
    if (auditFormRef.current) {
      auditFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <ServicesHero />
      <ServicesGrid onSelectService={handleSelectServiceFromGrid} />
      <WhyChoose />
      <AuditFormSection
        ref={auditFormRef}
        selectedServices={selectedServices}
        onToggleService={handleToggleService}
      />
      <CTA />
    </>
  );
}
