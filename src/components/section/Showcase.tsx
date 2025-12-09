import React from 'react';
import Link from 'next/link';
// Assuming you are using Lucide-React, if not, replace with your icon set
import { 
  Award, Star, ArrowUpRight, Code, Check, 
  MapPin, Users, Bell, BarChart 
} from 'lucide-react';

export default function Showcase() {
  return (
    <section className="relative py-24 px-4 sm:px-6 overflow-hidden bg-[#0a0a0a]">
      
      {/* 1. Background Texture (Matches Hero) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 2. Header Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-blue-400 text-xs font-bold mb-6 tracking-wide uppercase">
            <Star size={12} className="fill-blue-400" />
            Strategic Partnership Showcase
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
            From Complex Problem to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Scalable Digital Platform
            </span>
          </h2>
          
          <p className="text-lg text-neutral-400 leading-relaxed mb-8">
            The <span className="text-white font-medium">Safe Streets Map</span> isn't just code. It is an example of how 
            **holistic expertise** solves complex challenges to deliver measurable, real-world results.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Badge icon={Award} text="10+ Years Expertise" color="text-purple-400" />
            <Badge icon={Code} text="Full-Stack Architecture" color="text-emerald-400" />
          </div>
        </div>

        {/* 3. The "Bento" Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* A. Main Project Card (Spans 8 columns) */}
          <div className="md:col-span-12 lg:col-span-8 group relative rounded-3xl border border-neutral-800 bg-neutral-900/50 overflow-hidden hover:border-neutral-700 transition-colors duration-300">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60"></div>
            
            {/* Image */}
            <img
              src="./images/map.webp"
              alt="Safe Streets Map Interface"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />

            {/* Floating UI Elements */}
            <div className="absolute top-6 right-6 z-20">
              <a href="https://safestreetsmap.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/20 transition-all">
                Visit Live Site <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Tech Stack (Glassmorphism) */}
            <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-wrap gap-2">
              {['React', 'Node.js', 'MongoDB', 'Mapbox API', 'Tailwind'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-neutral-300 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* B. Strategy Details (Spans 4 columns) */}
          <div className="md:col-span-6 lg:col-span-4 p-8 rounded-3xl border border-neutral-800 bg-neutral-900/50 flex flex-col justify-center relative overflow-hidden group hover:border-neutral-700 transition-colors">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>

            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                <Code className="text-blue-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Holistic Strategy</h3>
              <p className="text-neutral-400 text-sm mb-6">
                Bridging the gap between design, marketing, and development to eliminate silos.
              </p>
              
              <ul className="space-y-4">
                <ListItem title="Integrated Design & UX" desc="Marketing-focused user flows." />
                <ListItem title="Scalable Clean Code" desc="Future-proof architecture." />
                <ListItem title="Risk Minimization" desc="Tested, reliable deployment." />
              </ul>
            </div>
          </div>

          {/* C. Testimonial (Spans 6 columns) */}
          <div className="md:col-span-6 lg:col-span-5 p-8 rounded-3xl border border-neutral-800 bg-neutral-900/50 relative">
            <div className="flex items-start gap-4">
              <div className="min-w-[40px] h-[40px] bg-emerald-500/10 rounded-full flex items-center justify-center">
                 <Users className="text-emerald-400" size={20} />
              </div>
              <div>
                <p className="text-neutral-300 italic mb-4 text-sm leading-relaxed">
                  "The Safe Streets Map completely transformed how our community advocates for safety improvements and data collection. It delivered results, not just features."
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-[1px] bg-neutral-700"></div>
                  <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Community Safety Coalition</span>
                </div>
              </div>
            </div>
          </div>

          {/* D. Highlights Grid (Spans 7 columns) */}
          <div className="md:col-span-12 lg:col-span-7 p-8 rounded-3xl border border-neutral-800 bg-neutral-900/50">
             <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-6">Project Highlights</h3>
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <HighlightBox icon={MapPin} title="Data Mapping" sub="Real-time Reports" color="text-blue-400" />
                <HighlightBox icon={Users} title="Engagement" sub="Viral Mechanics" color="text-emerald-400" />
                <HighlightBox icon={Bell} title="Alert System" sub="Lead Capture" color="text-yellow-400" />
                <HighlightBox icon={BarChart} title="Analytics" sub="Trend Insights" color="text-purple-400" />
             </div>
          </div>
          
        </div>

        {/* 4. Bottom CTA (Full Width) */}
        <div className="mt-6 rounded-3xl p-[1px] bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600">
          <div className="rounded-[23px] bg-[#0a0a0a] p-8 md:px-12 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
             {/* Glow effect */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-blue-500/20 blur-[100px] pointer-events-none"></div>
             
             <div className="relative z-10 text-center md:text-left">
               <h3 className="text-2xl font-bold text-white mb-2">Ready for a Strategic Partner?</h3>
               <p className="text-neutral-400">Stop hiring task-takers. Partner with an expert who minimizes risk.</p>
             </div>

             <div className="relative z-10">
                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3 text-sm font-bold !text-black transition-all bg-white rounded-full hover:bg-neutral-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  Book Strategy Session
                </Link>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// --- Helper Components for cleanliness ---

function Badge({ icon: Icon, text, color }) {
  return (
    <div className="inline-flex items-center px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full">
      <Icon className={`${color} mr-2`} size={16} />
      <span className="text-neutral-300 text-sm font-medium">{text}</span>
    </div>
  );
}

function ListItem({ title, desc }) {
  return (
    <li className="flex items-start">
      <div className="mt-1 mr-3 p-1 rounded-full bg-emerald-500/10">
        <Check className="text-emerald-400" size={12} />
      </div>
      <div>
        <span className="block text-white font-medium text-sm">{title}</span>
        <p className="text-neutral-500 text-xs">{desc}</p>
      </div>
    </li>
  );
}

function HighlightBox({ icon: Icon, title, sub, color }) {
  return (
    <div className="text-center p-4 bg-neutral-950 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-colors">
      <div className={`inline-flex mb-2 ${color}`}>
        <Icon size={18} />
      </div>
      <div className="text-sm font-bold text-neutral-200 mb-1">{title}</div>
      <div className="text-xs text-neutral-500">{sub}</div>
    </div>
  );
}