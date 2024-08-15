import React from 'react';

const Candidate = ({ candidate }) => {
    return (
        <div style={{ border: '1px solid purple', margin: '10px', padding: '10px', borderRadius: '5px' }}>
            <h3 style={{ color: 'purple' }}>{candidate.name}</h3>
            <p>{candidate.description}</p>
            <button style={{ backgroundColor: 'purple', color: 'white', border: 'none', padding: '10px' }}>
                Vote for {candidate.name}
            </button>
        </div>
    );
};

export default Candidate;
