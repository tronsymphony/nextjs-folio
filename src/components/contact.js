'use client'

import { useState } from 'react';
import ContactForm from '../components/ContactForm';
import { 
  Briefcase, Calendar, Check, 
  MessageSquare, Mail, ArrowRight 
} from 'lucide-react';

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleFormSubmit = () => {
    setFormSubmitted(true);
    // Reset after 8 seconds
    setTimeout(() => setFormSubmitted(false), 8000);
  };
  
  return (
    <>
      <section className="relative pt-32 pb-20 px-4 sm:px-6 bg-[#0a0a0a] min-h-screen overflow-hidden" data-scroll-section>
        
        {/* 1. Background Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="container mx-auto max-w-6xl relative z-10">
          
          {/* 2. Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs font-bold mb-6 tracking-wide uppercase">
              <Mail size={12} /> Get in Touch
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter">
              Let&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Collaborate.</span>
            </h1>
            <p className="text-xl text-neutral-400 leading-relaxed">
              Whether you&apos;re a startup looking to build an MVP or an established business seeking technical expertise, I&apos;m here to bring your strategic vision to life.
            </p>
          </div>

          {/* 3. Options Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            
            {/* Option A: Project Inquiries */}
            <div className="group relative p-8 rounded-3xl border border-neutral-800 bg-neutral-900/30 hover:border-blue-500/50 transition-colors duration-300">
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-400">
                  <Briefcase size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Project Inquiries</h2>
                <p className="text-neutral-400 mb-8 leading-relaxed h-auto md:h-16">
                  Ready to discuss your project needs? Fill out the form below with your requirements, timeline, and budget.
                </p>
                <ul className="space-y-3">
                  {[
                    "Full project scoping & analysis",
                    "Detailed proposal & timeline",
                    "Custom tailored solutions"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-blue-500 shrink-0" />
                      <span className="text-neutral-300 text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Option B: Consultation */}
            <div className="group relative p-8 rounded-3xl border border-neutral-800 bg-neutral-900/30 hover:border-purple-500/50 transition-colors duration-300">
              <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 text-purple-400">
                  <Calendar size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Consultation Calls</h2>
                <p className="text-neutral-400 mb-8 leading-relaxed h-auto md:h-16">
                  Need advice on a technical problem? Schedule a focused call to discuss architecture or strategy.
                </p>
                <ul className="space-y-3">
                  {[
                    "30 or 60-minute focused session",
                    "Technical guidance & audits",
                    "Actionable follow-up items"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-purple-500 shrink-0" />
                      <span className="text-neutral-300 text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* 4. Form Section */}
          <div className="max-w-3xl mx-auto relative">
            
            {/* Form Container */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
              
              {/* Decorative Top Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>

              <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-white mb-2">Send a Message</h2>
                <p className="text-neutral-500">
                  Fill out the form below and I&apos;ll get back to you within 24 hours.
                </p>
              </div>
              
              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                    <Check className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent Successfully!</h3>
                  <p className="text-neutral-400 max-w-md mx-auto">
                    Thank you for reaching out. I have received your inquiry and will be in touch shortly.
                  </p>
                  
                  {/* Optional: Add a visual timer or progress bar here if you want to show when it resets */}
                </div>
              ) : (
                /* NOTE: Ensure your <ContactForm /> component styles 
                   inputs with: bg-neutral-950 border-neutral-800 text-white focus:border-blue-500
                */
                <ContactForm onSubmitSuccess={handleFormSubmit} />
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}