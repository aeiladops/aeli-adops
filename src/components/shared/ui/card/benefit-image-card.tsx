import benefitImage from '@/public/images/aeli-why-choose-2.png';
import { cn } from '@/src/utils/cn';
import Image from 'next/image';
import type { HTMLAttributes } from 'react';

export type BenefitImageCardProps = HTMLAttributes<HTMLDivElement>;

export const BenefitImageCard = ({ className, ...props }: BenefitImageCardProps) => {
  return (
    <div
      className={cn('relative h-[273px] overflow-hidden rounded-[20px] bg-white p-2', className)}
      {...props}
    >
      <Image
        src={benefitImage}
        alt="Global Reach"
        fill
        className="object-contain object-center p-2"
        sizes="(max-width: 768px) 100vw, 25vw"
      />
    </div>
  );
};
