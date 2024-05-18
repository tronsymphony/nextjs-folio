// components/BackToTopButton.js
import { useEffect, useState } from 'react';

const BackToTopButton = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {showButton && (
                <button
                    onClick={scrollToTop}
                    className="btn btn-primary"
                    style={{
                        position: 'fixed',
                        bottom: '10px',
                        right: '10px',
                        cursor: 'pointer',
                        zIndex: 1000,
                        padding: '3px 5px',
                        minWidth: 0,
                        backgroundColor: 'rgb(22 23 26 / 66%)',
                        border: '2px solid #b4e300',
                        color: '#b4e300',
                    }}
                >
                    Back to Top
                </button >
            )}
        </>
    );
};

export default BackToTopButton;
