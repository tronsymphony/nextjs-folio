// Single source of truth for site-wide facts, links, and offer pricing.
// Anything set to null is intentionally unset: the UI hides it rather than
// showing a placeholder, so nothing fake ever ships.

export const SITE_URL = 'https://casa-dev.com';
export const SITE_NAME = 'Casa Dev';

export const PERSON = {
  name: 'Nitya Hoyos',
  jobTitle: 'Oracle NetSuite & Custom Front-End Engineer',
  yearsExperience: 15,
  location: 'Los Angeles, California',
  email: 'nityahoyos@gmail.com',
  telephone: '+1-424-384-9528',
  linkedin: 'https://www.linkedin.com/in/nityananda-h-b5a65080/',
  github: 'https://github.com/tronsymphony',
  knowsAbout: [
    'Oracle NetSuite',
    'SuiteScript',
    'SuiteQL',
    'SuiteCommerce',
    'ERP integration',
    'Next.js',
    'React',
    'Angular',
    'Headless commerce',
  ],
};

// Booking. Cal.com username/event slug, e.g. 'nitya/netsuite-fit-call'.
// TODO(owner): create the event on cal.com and set this.
export const CAL_LINK = null;

// Offer ladder. TODO(owner): set real numbers; null hides the figure.
export const OFFERS = {
  audit: {
    name: 'NetSuite Integration Audit',
    price: null, // e.g. 3500 (USD)
    durationDays: 10,
    stripePaymentLink: null, // e.g. 'https://buy.stripe.com/...'
    creditedOnProceed: true, // audit fee credited toward implementation
  },
  implementationFrom: null, // e.g. 15000 (USD), "typical engagements start at"
  retainerFrom: null, // e.g. 3000 (USD / month)
};

export const formatUSD = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
