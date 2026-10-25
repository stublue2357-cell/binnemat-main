import React from 'react';
import AboutHero from './AboutHero';
import AboutStory from './AboutStory';
import AboutStats from './AboutStats';
import AboutTechnology from './AboutTechnology';
import AboutTimeline from './AboutTimeline';
import AboutValues from './AboutValues';

export default function AboutPage() {
  return (
    <div className="max-w-[1360px] mx-auto px-[5%] py-4 sm:py-6 relative z-10 space-y-2">
      <AboutHero />
      <AboutStory />
      <AboutStats />
      <AboutTechnology />
      <AboutTimeline />
      <AboutValues />
    </div>
  );
}
