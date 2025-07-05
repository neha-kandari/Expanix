import CursorGlow from '../components/CursorGlow';
import HeroSection from '@/components/HeroSection';
import WhatWeDoSection from "@/components/WhatWeDoSection";
import BenefitsSection from '@/components/BenefitsSection';
import SplineClient from '@/components/SplineClient';

export default function Home() {
  return (
    <>
      <CursorGlow />
      <HeroSection>
        <SplineClient />
      </HeroSection>
      <WhatWeDoSection />
      <BenefitsSection/>
    </>
  );
}
