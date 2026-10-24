import React from 'react';
import ContactCards from './ContactCards';
import ContactForm from './ContactForm';
import ContactBtuGuide from './ContactBtuGuide';
import ContactBranches from './ContactBranches';

export default function ContactPage() {
  return (
    <div className="max-w-[1360px] mx-auto px-[5%] py-12 relative z-10">
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-xs font-extrabold tracking-widest uppercase text-bn-goldDark dark:text-bn-goldLight block mb-2">
          GET IN TOUCH
        </span>
        <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 m-0">
          Direct Customer Service
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
          Have questions regarding geyser capacity, hob dimensions, or 30W BLDC fan savings? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5">
          <ContactCards />
        </div>
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>

      {/* EXPANDED SIZING GUIDE & REGIONAL HUBS */}
      <ContactBtuGuide />
      <ContactBranches />
    </div>
  );
}
