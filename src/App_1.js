import React, { useEffect, useState } from 'react';
import 'aframe';
import 'ar.js';

function App() {
    const [errorDetected, setErrorDetected] = useState(false);

    useEffect(() => {
        const handleDetection = async () => {
            const response = await fetch('http://localhost:5000/detect'); // Assuming you set up a Flask route
            const data = await response.json();
            if (data.detected) {
                setErrorDetected(true);
            }
        };

        const interval = setInterval(handleDetection, 1000); // Check every second

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {errorDetected ? (
                <div style={{ color: 'red' }}>
                    Error: External device detected! The application is freezing.
                </div>
            ) : (
                <a-scene embedded arjs>
                    <a-box position='0 0.5 0' material='color: red;'></a-box>
                </a-scene>
            )}
        </div>
    );
}

export default App;