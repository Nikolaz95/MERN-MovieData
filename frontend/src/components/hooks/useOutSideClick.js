import { useEffect, useRef } from 'react';

// calls callback when user clicks / taps outside the element with the returned ref
// enabled = false -> no listener (e.g. while the dropdown is closed)
export const useOutsideClick = (callback, enabled = true) => {
    const ref = useRef(null);
    // always call the latest callback without re-adding the listener every render
    const callbackRef = useRef(callback);
    callbackRef.current = callback;

    useEffect(() => {
        if (!enabled) return;

        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callbackRef.current(event);
            }
        };

        // pointerdown works for mouse and touch
        document.addEventListener('pointerdown', handleClickOutside);
        return () => document.removeEventListener('pointerdown', handleClickOutside);
    }, [enabled]);

    return ref;
};
