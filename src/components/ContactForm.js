'use client'

import { useEffect, useState } from 'react';
import Honeypot from './Honeypot';
import { submitLead } from '../lib/submitLead';

const EMPTY_FORM = {
  name: '',
  email: '',
  company: '',
  projectType: 'free-review',
  message: '',
  budget: '',
  timeframe: ''
};

export default function ContactForm({ onSubmitSuccess, source = 'contact' }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [renderedAt, setRenderedAt] = useState(0);
  const [honeypot, setHoneypot] = useState('');
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);

  useEffect(() => setRenderedAt(Date.now()), []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const { name, email, company, message, projectType, budget, timeframe } = formData;
      await submitLead({
        source,
        renderedAt,
        honeypot,
        name,
        email,
        company,
        message,
        payload: { 'Project type': projectType, Budget: budget, Timeframe: timeframe },
      });
      setFormData(EMPTY_FORM);
      if (onSubmitSuccess) onSubmitSuccess();
      else setSent(true);
    } catch (err) {
      console.error('Error sending form:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="bg-canvas-2 rounded-lg border border-line p-8 text-center" role="status">
        <h3 className="text-2xl font-bold text-ink mb-2">Message received.</h3>
        <p className="text-muted">I&rsquo;ll reply personally within one business day. A confirmation is on its way to your inbox.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative bg-canvas-2 rounded-lg border border-line p-6 shadow-lg">
      <Honeypot value={honeypot} onChange={setHoneypot} />
      {error && (
        <div className="mb-6 p-4 bg-red-900 bg-opacity-30 border border-red-700 rounded-lg text-red-200">
          <p className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </p>
        </div>
      )}
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-ink/80 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-canvas-3 border border-line rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-ink"
              placeholder="Your name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink/80 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-canvas-3 border border-line rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-ink"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-ink/80 mb-1">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-canvas-3 border border-line rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-ink"
              placeholder="Company name"
            />
          </div>
          
          <div>
            <label htmlFor="projectType" className="block text-sm font-medium text-ink/80 mb-1">
              Project Type
            </label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-canvas-3 border border-line rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-ink"
            >
              <option value="free-review">Free 30-minute review</option>
              <option value="netsuite-integration">NetSuite integration or portal</option>
              <option value="audit">NetSuite integration audit</option>
              <option value="ai-integration">AI integration</option>
              <option value="app-audit">Audit of an app built with AI</option>
              <option value="seo">SEO or technical SEO</option>
              <option value="web-app">Custom web application or WordPress</option>
              <option value="other">Something else</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-ink/80 mb-1">
                Budget
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-canvas-3 border border-line rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-ink"
              >
                <option value="">Select range</option>
                <option value="Under $1k">Under $1,000</option>
                <option value="$1k - $5k">$1,000 - $5,000</option>
                <option value="$5k - $15k">$5,000 - $15,000</option>
                <option value="$15k+">$15,000+</option>
                <option value="Monthly retainer">Ongoing monthly retainer</option>
                <option value="Not sure">Not sure yet</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="timeframe" className="block text-sm font-medium text-ink/80 mb-1">
                Timeframe
              </label>
              <select
                id="timeframe"
                name="timeframe"
                value={formData.timeframe}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-canvas-3 border border-line rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-ink"
              >
                <option value="">Select timeframe</option>
                <option value="ASAP">ASAP</option>
                <option value="1-2 months">1-2 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="6+ months">6+ months</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-ink/80 mb-1">
            Project Details
          </label>
          <textarea
            id="message"
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            rows="8"
            className="w-full px-4 py-2 bg-canvas-3 border border-line rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-ink resize-none"
            placeholder="Which systems are involved (NetSuite, Shopify, a 3PL...), what's broken or missing, and what a good outcome looks like."
          ></textarea>
          <p className="mt-2 text-xs text-muted">
            Please include any relevant details that would help me understand your project better.
          </p>
        </div>
      </div>
      
      <div className="mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-6 rounded-lg text-ink font-medium transition-all duration-300 ${
            isSubmitting 
              ? 'bg-faint cursor-not-allowed' 
              : 'bg-accent hover:bg-accent'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-ink" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            'Send Message'
          )}
        </button>
        <p className="mt-4 text-center text-xs text-muted">
          By submitting this form, you agree to be contacted regarding your request.
        </p>
      </div>
    </form>
  );
}