import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav style={{ padding: '20px', backgroundColor: 'purple', color: 'white' }}>
            <Link to="/" style={{ color: 'white', marginRight: '20px' }}>Vote</Link>
            <Link to="/results" style={{ color: 'white' }}>Results</Link>
        </nav>
    );
};

export default Navigation;
