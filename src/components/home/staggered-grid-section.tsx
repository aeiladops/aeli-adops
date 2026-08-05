'use client';

import { StaggeredGrid } from '@/src/components/ui/staggered-grid';
import type { BentoItem } from '@/src/components/ui/staggered-grid';
import { FaGithub, FaSlack, FaTwitter, FaLinkedin } from 'react-icons/fa';

const bentoItems: BentoItem[] = [
  {
    id: 1,
    title: 'Ad Operations',
    subtitle: 'Streamlined',
    description: 'Comprehensive ad operations management',
    icon: <FaGithub className="w-5 h-5" />,
    image: '/images/pexels-alphatradezone-5833878.jpg',
  },
  {
    id: 2,
    title: 'Analytics',
    subtitle: 'Real-time',
    description: 'Deep performance analytics',
    icon: <FaSlack className="w-5 h-5" />,
    image: '/images/pexels-fauxels-3184635.jpg',
  },
  {
    id: 3,
    title: 'Revenue',
    subtitle: 'Maximized',
    description: 'Revenue optimization strategies',
    icon: <FaTwitter className="w-5 h-5" />,
    image: '/images/pexels-mikael-blomkvist-6476245.jpg',
  },
  {
    id: 4,
    title: 'Connect',
    subtitle: 'Together',
    description: 'Publisher community and support',
    icon: <FaLinkedin className="w-5 h-5" />,
    image: '/images/pexels-a-darmel-8133993.jpg',
  },
];

// Grid cell images from the project's public images
const gridImages = [
  '/images/opai-img-133.jpg',
  '/images/opai-img-135.jpg',
  '/images/ns-img-29.jpg',
  '/images/ns-img-30.jpg',
  '/images/opai-img-137.jpg',
  '/images/opai-img-138.jpg',
];

export default function StaggeredGridSection() {
  return (
    <section className="bg-white w-full">
      <StaggeredGrid
        images={gridImages}
        bentoItems={bentoItems}
        centerText="Aeli AdOps"
        showFooter={false}
        className="bg-white"
        credits={{
          madeBy: { text: 'Aeli AdOps', href: '/' },
          moreDemos: { text: 'Explore Features', href: '/features' },
        }}
      />
    </section>
  );
}
