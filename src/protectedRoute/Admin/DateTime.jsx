import React, { useState, useEffect } from 'react';

const getCurrentDateTime = () => {
    return new Date().toLocaleString();
};

const DateTime = () => {
    const [dateTime, setDateTime] = useState(getCurrentDateTime());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDateTime(getCurrentDateTime());
        }, 1000); // Update every second

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, []); // Run only once on component mount

    return <div className="text-right pr-2 text-gray-900 text-xl font-bold">{dateTime}</div>;
};

export default DateTime;
