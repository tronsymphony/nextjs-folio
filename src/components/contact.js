'use client'

import { useState } from 'react';
import ContactForm from '../components/ContactForm';

// Define your styles here since the styles import was in the original code
const styles = {
  page: 'py-16 md:py-20  mt-20',
  pagedForm: 'py-12 md:py-16 bg-gray-800',
  container: 'container mx-auto px-4 max-w-4xl',
  title: '!text-4xl md:text-5xl font-bold gradient-title5 mb-6',
  subtitle: '!text-xl md:text-2xl font-semibold text-gray-200 mb-4 flex align-center',
  text: 'text-gray-300 mb-4 !text-lg'
};

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleFormSubmit = () => {
    setFormSubmitted(true);
    // You might want to reset this after some time or have a way to create a new message
    setTimeout(() => setFormSubmitted(false), 8000);
  };
  
  return (
    <>
      <section className={styles.page} data-scroll-section>
        <div className={styles.container}>
          <h1 className={styles.title}>Let&apos;s Collaborate</h1>
          
          <p className={styles.text}>
            Whether you&apos;re a startup looking to build your MVP, an established business seeking technical expertise, or a fellow developer in need of collaboration, I&apos;m here to help bring your ideas to life.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
              <h2 className={styles.subtitle}>
                <span className="inline-block p-2 bg-blue-900 rounded-full mr-3">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </span>
                Project Inquiries
              </h2>
              <p className="text-gray-300 mb-4">
                Ready to discuss your project needs? Fill out the form below with details about your requirements, timeline, and budget. I&apos;ll get back to you within 24 hours.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-400 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300 text-sm">Full project scoping and requirements analysis</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-400 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300 text-sm">Detailed project proposal and timeline</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-400 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300 text-sm">Custom solutions tailored to your needs</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
              <h2 className={styles.subtitle}>
                <span className="inline-block p-2 bg-purple-900 rounded-full mr-3">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
                Consultation Calls
              </h2>
              <p className="text-gray-300 mb-4">
                Need advice on a technical problem or project scope? Schedule a consultation call with me to discuss your requirements and explore how we can work together.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-400 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300 text-sm">30 or 60-minute focused consultation</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-400 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300 text-sm">Technical guidance and recommendations</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-400 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300 text-sm">Follow-up action items and documentation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.pagedForm} data-scroll-section>
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">Get In Touch</h2>
            <p className="text-gray-300">
              Fill out the form below and I&apos;ll get back to you as soon as possible
            </p>
          </div>
          
          {formSubmitted ? (
            <div className="bg-green-900 bg-opacity-30 border border-green-700 rounded-lg p-6 text-center">
              <svg className="w-12 h-12 text-green-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="text-xl font-bold text-white mb-2">Message Sent Successfully!</h3>
              <p className="text-gray-300">
                Thank you for reaching out. I&apos;ll respond to your inquiry within 24 hours.
              </p>
            </div>
          ) : (
            <ContactForm onSubmitSuccess={handleFormSubmit} />
          )}
        </div>
      </section>
    </>
  );
}