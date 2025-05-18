import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check viewport width on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleAboutDropdown = () => {
    setAboutDropdownOpen(!aboutDropdownOpen);
  };

  return (
    <div className="nav">
      {/* Mobile hamburger button */}
      <button 
        className="nav__toggle" 
        aria-label="Toggle navigation menu"
        onClick={toggleMobileMenu}
      >
        <span className="nav__toggle-icon"></span>
      </button>

      {/* Navigation menu */}
      <nav className={`nav__menu ${mobileMenuOpen ? 'nav__menu--open' : ''}`}>
        <ul className="nav__list">
          <li className="nav__item">
            <Link href="/services" className="nav__link">
              <span>Services</span>
            </Link>
          </li>
          
          <li className="nav__item">
            <Link href="/portfolio" className="nav__link">
              <span>Portfolio</span>
            </Link>
          </li>
          
          <li className={`nav__item nav__item--has-children ${aboutDropdownOpen ? 'nav__item--active' : ''}`}>
            <Link href="/about" className="nav__link">
              <span>About</span>
            </Link>
            
            {isMobile ? (
              <>
                <button 
                  className="nav__dropdown-toggle" 
                  onClick={toggleAboutDropdown}
                  aria-label="Toggle about submenu"
                >
                  <span className="nav__dropdown-icon"></span>
                </button>
                
                {aboutDropdownOpen && (
                  <ul className="nav__dropdown">
                    <li className="nav__dropdown-item">
                      <Link href="/about/los-angeles" className="nav__dropdown-link">
                        <span>Los Angeles</span>
                      </Link>
                    </li>
                    <li className="nav__dropdown-item">
                      <Link href="/about/portland" className="nav__dropdown-link">
                        <span>Portland</span>
                      </Link>
                    </li>
                    <li className="nav__dropdown-item">
                      <Link href="/about/irvine" className="nav__dropdown-link">
                        <span>Irvine</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </>
            ) : (
              <div 
                className="nav__dropdown-container"
                onMouseEnter={toggleAboutDropdown}
                onMouseLeave={toggleAboutDropdown}
              >
                {aboutDropdownOpen && (
                  <ul className="nav__dropdown">
                    <li className="nav__dropdown-item">
                      <Link href="/about/los-angeles" className="nav__dropdown-link">
                        <span>Los Angeles</span>
                      </Link>
                    </li>
                    <li className="nav__dropdown-item">
                      <Link href="/about/portland" className="nav__dropdown-link">
                        <span>Portland</span>
                      </Link>
                    </li>
                    <li className="nav__dropdown-item">
                      <Link href="/about/irvine" className="nav__dropdown-link">
                        <span>Irvine</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </li>
          {/* <li className="nav__item">
            <Link href="/blog" className="nav__link">
              <span>Blog</span>
            </Link>
          </li> */}
          <li className="nav__item">
            <Link href="/contact" className="nav__link">
              <span>Contact</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;