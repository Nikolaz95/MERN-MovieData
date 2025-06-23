import { useState, useEffect } from 'react';

function useCurrentYear() {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const updateYear = setInterval(() => {
            const newYear = new Date().getFullYear();
            if (newYear !== currentYear) {
                setCurrentYear(newYear);
            }
        }, 1000); // Check for updates every second

        return () => clearInterval(updateYear);
    }, [currentYear]);

    return currentYear;
}

export default useCurrentYear;
