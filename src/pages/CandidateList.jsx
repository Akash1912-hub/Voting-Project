import React from 'react';
import Candidate from './Candidate';

const candidates = [
    { id: 1, name: 'T1', description: 'Candidate for change', votes: 0 },
    { id: 2, name: 'T2', description: 'Candidate for progress', votes: 0 },
    { id: 3, name: 'T3', description: 'Candidate for the future', votes: 0 },
];

const CandidateList = () => {
    return (
        <div>
            <h2 style={{ color: 'purple' }}>Candidates</h2>
            {candidates.map(candidate => (
                <Candidate key={candidate.id} candidate={candidate} />
            ))}
        </div>
    );
};

export default CandidateList;
