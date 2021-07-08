import { useEffect, useRef } from 'react';

export default (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => window.clearInterval(id);
        }
    }, [delay]);
};
