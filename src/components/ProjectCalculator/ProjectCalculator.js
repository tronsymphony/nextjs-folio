import { useState, useEffect } from 'react';
import styles from './ProjectCalculator.module.scss';

const ProjectCalculator = () => {
  // State for all form selections
  const [projectType, setProjectType] = useState('');
  const [features, setFeatures] = useState([]);
  const [timeframe, setTimeframe] = useState('normal');
  const [maintenance, setMaintenance] = useState(false);
  const [designPackage, setDesignPackage] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [costBreakdown, setCostBreakdown] = useState({});

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Project types with base costs
  const projectTypes = [
    { id: 'small-business', name: 'Small Business Website', baseCost: 2500 },
    { id: 'e-commerce', name: 'E-commerce Store', baseCost: 5000 },
    { id: 'web-app', name: 'Web Application', baseCost: 8000 },
    { id: 'mobile-app', name: 'Mobile App', baseCost: 10000 },
  ];

  // Available features with costs
  const availableFeatures = {
    'small-business': [
      { id: 'content-management', name: 'Content Management System', cost: 800 },
      { id: 'contact-form', name: 'Custom Contact Form', cost: 300 },
      { id: 'blog', name: 'Blog Section', cost: 600 },
      { id: 'seo', name: 'SEO Optimization Package', cost: 750 },
      { id: 'analytics', name: 'Analytics Integration', cost: 400 },
    ],
    'e-commerce': [
      { id: 'product-management', name: 'Product Management System', cost: 1200 },
      { id: 'payment-gateway', name: 'Payment Gateway Integration', cost: 800 },
      { id: 'inventory', name: 'Inventory Management', cost: 1500 },
      { id: 'shipping-integration', name: 'Shipping Integration', cost: 900 },
      { id: 'customer-accounts', name: 'Customer Accounts', cost: 700 },
      { id: 'product-reviews', name: 'Product Reviews', cost: 600 },
    ],
    'web-app': [
      { id: 'user-auth', name: 'User Authentication', cost: 1200 },
      { id: 'data-integration', name: 'Third-party Data Integration', cost: 1800 },
      { id: 'dashboard', name: 'Custom Dashboard', cost: 2500 },
      { id: 'notifications', name: 'Notification System', cost: 900 },
      { id: 'file-uploads', name: 'File Upload System', cost: 800 },
      { id: 'api-development', name: 'API Development', cost: 2000 },
    ],
    'mobile-app': [
      { id: 'ios', name: 'iOS Development', cost: 4000 },
      { id: 'android', name: 'Android Development', cost: 4000 },
      { id: 'push-notifications', name: 'Push Notifications', cost: 800 },
      { id: 'offline-mode', name: 'Offline Mode', cost: 1500 },
      { id: 'location-services', name: 'Location Services', cost: 1200 },
      { id: 'in-app-purchases', name: 'In-App Purchases', cost: 1800 },
    ],
  };

  // Design package options
  const designPackages = [
    { id: 'no-design', name: 'No Design (Use Existing Design/Template)', cost: 0 },
    { id: 'basic-design', name: 'Basic Design Package', cost: 1200, description: 'Simple, clean design with basic branding elements and standard layouts.' },
    { id: 'premium-design', name: 'Premium Design Package', cost: 2500, description: 'Custom professional design with unique branding, advanced layouts, and visual elements.' },
    { id: 'elite-design', name: 'Elite Design Package', cost: 4500, description: 'Bespoke high-end design with complete brand identity, custom illustrations, animations, and unique visual effects.' },
  ];

  // Timeframe multipliers
  const timeframeMultipliers = {
    urgent: 1.5,  // 50% rush fee
    normal: 1,    // standard timeframe
    relaxed: 0.9  // 10% discount for flexible timeline
  };

  // Monthly maintenance options
  const maintenanceOptions = {
    'small-business': 150,
    'e-commerce': 350,
    'web-app': 500,
    'mobile-app': 650
  };

  // Reset features when project type changes
  useEffect(() => {
    setFeatures([]);
  }, [projectType]);

  // Calculate total cost whenever inputs change
  useEffect(() => {
    if (!projectType) {
      setTotalCost(0);
      setCostBreakdown({});
      return;
    }

    // Find base project cost
    const selectedProject = projectTypes.find(p => p.id === projectType);
    const baseCost = selectedProject ? selectedProject.baseCost : 0;

    // Calculate features cost
    const featureCost = features.reduce((total, featureId) => {
      const feature = availableFeatures[projectType].find(f => f.id === featureId);
      return total + (feature ? feature.cost : 0);
    }, 0);

    // Calculate design cost
    const selectedDesign = designPackages.find(d => d.id === designPackage);
    const designCost = selectedDesign ? selectedDesign.cost : 0;

    // Apply timeframe multiplier
    const subtotal = (baseCost + featureCost + designCost) * timeframeMultipliers[timeframe];

    // Add monthly maintenance if selected
    const monthlyMaintenance = maintenance ? maintenanceOptions[projectType] : 0;

    // Set total cost
    setTotalCost(Math.round(subtotal));

    // Create cost breakdown
    setCostBreakdown({
      baseCost,
      featureCost,
      designCost,
      timeframeFactor: timeframeMultipliers[timeframe],
      subtotal: Math.round(subtotal),
      monthlyMaintenance
    });

  }, [projectType, features, designPackage, timeframe, maintenance]);

  // Toggle feature selection
  const handleFeatureToggle = (featureId) => {
    setFeatures(prevFeatures =>
      prevFeatures.includes(featureId)
        ? prevFeatures.filter(id => id !== featureId)
        : [...prevFeatures, featureId]
    );
  };

  // Handle contact form submission - updated to use API route
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Prepare project details
      const selectedProject = projectTypes.find(p => p.id === projectType);
      const selectedFeatures = features.map(f =>
        availableFeatures[projectType].find(feat => feat.id === f)?.name
      );
      const selectedDesignPackage = designPackages.find(d => d.id === designPackage)?.name || 'None';

      // Send data to API route
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          projectDetails: {
            projectType: selectedProject?.name,
            features: selectedFeatures,
            designPackage: selectedDesignPackage,
            timeframe,
            maintenance,
            estimatedCost: totalCost,
            monthlyMaintenance: maintenance ? maintenanceOptions[projectType] : 0
          }
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send email');
      }

      // Show success message
      setFormSubmitted(true);
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitError('There was an error sending your request. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black">
      <div className={styles.calculatorContainer}>
        <div className={styles.calculatorHeader}>
          <h3 className={styles.calculatorTitleSub}>Project Estimator</h3>
          <h2 className={styles.calculatorTitle}>Transparent Pricing <br /> <span className={styles.highlight}>Without The Guesswork</span></h2>
          <p className={styles.calculatorDescription}>
            Realistic estimates based on standard pricing structures. Select your project type, features, and design level to generate a customized quote instantly.
          </p>
        </div>

        {/* Project Type Selection */}
        <div className={styles.section}>
          <h3>1. What type of project do you need?</h3>
          <div className={styles.projectTypeGrid}>
            {projectTypes.map((type) => (
              <div
                key={type.id}
                className={`${styles.projectTypeCard} ${projectType === type.id ? styles.selected : ''}`}
                onClick={() => setProjectType(type.id)}
              >
                <h4>{type.name}</h4>
                <p>Starting at ${type.baseCost.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        {projectType && (
          <>
            {/* Design Package Selection */}
            <div className={styles.section}>
              <h3>2. Choose a Design Package</h3>
              <div className={styles.designPackageGrid}>
                {designPackages.map((design) => (
                  <div
                    key={design.id}
                    className={`${styles.designPackageCard} ${designPackage === design.id ? styles.selected : ''}`}
                    onClick={() => setDesignPackage(design.id)}
                  >
                    <h4>{design.name}</h4>
                    <p className={styles.designPackagePrice}>
                      {design.cost > 0 ? `$${design.cost.toLocaleString()}` : 'Included'}
                    </p>
                    {design.description && (
                      <p className={styles.designPackageDescription}>{design.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Features Selection */}
            <div className={styles.section}>
              <h3>3. Select additional features</h3>
              <div className={styles.featuresGrid}>
                {availableFeatures[projectType].map((feature) => (
                  <div
                    key={feature.id}
                    className={`${styles.featureCard} ${features.includes(feature.id) ? styles.selected : ''}`}
                    onClick={() => handleFeatureToggle(feature.id)}
                  >
                    <div className={styles.featureCheckbox}>
                      <span className={styles.checkbox}>
                        <input
                          type="checkbox"
                          checked={features.includes(feature.id)}
                          onChange={() => { }} // Handled by the div click
                          id={`feature-${feature.id}`}
                        />
                      </span>
                      <label htmlFor={`feature-${feature.id}`}>{feature.name}</label>
                    </div>
                    <p>${feature.cost.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeframe Selection */}
            <div className={styles.section}>
              <h3>4. When do you need this completed?</h3>
              <div className={styles.timeframeOptions}>
                <div
                  className={`${styles.timeframeCard} ${timeframe === 'urgent' ? styles.selected : ''}`}
                  onClick={() => setTimeframe('urgent')}
                >
                  <h4>Urgent</h4>
                  <p>As soon as possible (+50% rush fee)</p>
                </div>
                <div
                  className={`${styles.timeframeCard} ${timeframe === 'normal' ? styles.selected : ''}`}
                  onClick={() => setTimeframe('normal')}
                >
                  <h4>Standard</h4>
                  <p>Regular timeline (standard rate)</p>
                </div>
                <div
                  className={`${styles.timeframeCard} ${timeframe === 'relaxed' ? styles.selected : ''}`}
                  onClick={() => setTimeframe('relaxed')}
                >
                  <h4>Flexible</h4>
                  <p>No rush (10% discount)</p>
                </div>
              </div>
            </div>

            {/* Maintenance Option */}
            <div className={styles.section}>
              <h3>5. Do you need ongoing maintenance?</h3>
              <div className={styles.maintenanceOption}>
                <div
                  className={`${styles.maintenanceCard} ${maintenance ? styles.selected : ''}`}
                  onClick={() => setMaintenance(!maintenance)}
                >
                  <div className={styles.maintenanceCheckbox}>
                    <span className={styles.checkbox}>
                      <input
                        type="checkbox"
                        checked={maintenance}
                        onChange={() => { }} // Handled by the div click
                        id="maintenance-option"
                      />
                    </span>
                    <label htmlFor="maintenance-option">
                      Monthly Maintenance & Support
                    </label>
                  </div>
                  <p>${maintenanceOptions[projectType]}/month</p>
                </div>
                <div className={styles.maintenanceDetails}>
                  <p>Includes: security updates, bug fixes, small content changes, and monthly performance report</p>
                </div>
              </div>
            </div>

            {/* Cost Estimate */}
            <div className={styles.costEstimate}>
              <h3>Project Estimate</h3>
              <div className={styles.costBreakdown}>
                <div className={styles.costItem}>
                  <span>Base Cost:</span>
                  <span>${costBreakdown.baseCost?.toLocaleString() || 0}</span>
                </div>
                <div className={styles.costItem}>
                  <span>Design Package:</span>
                  <span>${costBreakdown.designCost?.toLocaleString() || 0}</span>
                </div>
                <div className={styles.costItem}>
                  <span>Feature Additions:</span>
                  <span>${costBreakdown.featureCost?.toLocaleString() || 0}</span>
                </div>
                <div className={styles.costItem}>
                  <span>Timeframe Adjustment:</span>
                  <span>× {costBreakdown.timeframeFactor || 1}</span>
                </div>
                <div className={`${styles.costItem} ${styles.totalCost}`}>
                  <span>Estimated One-Time Total:</span>
                  <span>${totalCost.toLocaleString()}</span>
                </div>
                {maintenance && (
                  <div className={styles.costItem}>
                    <span>Monthly Maintenance:</span>
                    <span>${costBreakdown.monthlyMaintenance?.toLocaleString() || 0}/mo</span>
                  </div>
                )}
              </div>

              <button
                className={styles.getQuoteButton}
                onClick={() => setFormVisible(true)}
                disabled={totalCost === 0}
              >
                Get Detailed Quote
              </button>
            </div>
          </>
        )}

        {/* Contact Form */}
        {formVisible && !formSubmitted && (
          <div className={styles.contactFormContainer}>
            <h3>Request Your Detailed Quote</h3>
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={`${styles.formGroup} ${styles.formGroupspan2}`} >

                <label htmlFor="message">Additional Details</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me more about your project needs..."
                  rows={4}
                />
              </div>
              <div className={styles.formSummary}>
                <h4>Your Project Summary</h4>
                <p><strong>Type:</strong> {projectTypes.find(p => p.id === projectType)?.name}</p>
                <p><strong>Design Package:</strong> {designPackages.find(d => d.id === designPackage)?.name || 'None'}</p>
                <p><strong>Features:</strong> {features.length > 0 ?
                  features.map(f => availableFeatures[projectType].find(feat => feat.id === f)?.name).join(', ') :
                  'No additional features'}</p>
                <p><strong>Timeframe:</strong> {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}</p>
                <p><strong>Maintenance:</strong> {maintenance ? 'Yes' : 'No'}</p>
                <p><strong>Estimated Cost:</strong> ${totalCost.toLocaleString()}</p>
                {maintenance && <p><strong>Monthly Maintenance:</strong> ${maintenanceOptions[projectType]}/month</p>}
              </div>
              {submitError && (
                <div className={styles.errorMessage}>
                  {submitError}
                </div>
              )}
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Request'}
              </button>
            </form>
          </div>
        )}

        {/* Thank You Message */}
        {formSubmitted && (
          <div className={styles.thankYouMessage}>
            <h3>Thank You!</h3>
            <p>I&apos;ve received your project details and will contact you within 1 business day with a detailed quote and next steps.</p>
            <p>A confirmation email has been sent to your inbox.</p>
            <button
              onClick={() => {
                setFormSubmitted(false);
                setFormVisible(false);
              }}
              className={styles.backButton}
            >
              Create Another Estimate
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCalculator;