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
                        left: '10px',
                        cursor: 'pointer',
                        zIndex: 1000,
                        padding: '3px 5px',
                        minWidth: 0,
                        width: '30px',
                        height: '30px',
                        backgroundColor: 'rgb(22 23 26 / 66%)',
                        border: '1px solid #b4e300',
                        color: '#b4e300',
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.99 7.5 3.75-3.75m0 0 3.75 3.75m-3.75-3.75v16.499H4.49" />
                    </svg>

                </button >
            )}
        </>
    );
};

export default BackToTopButton;
