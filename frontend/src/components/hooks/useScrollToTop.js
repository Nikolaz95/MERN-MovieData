import { useState, useEffect } from 'react';

function useScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 500); // Adjust the threshold as needed
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return { isVisible };
}

export default useScrollToTop;