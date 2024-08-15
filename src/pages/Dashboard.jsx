import React, { useEffect, useState } from 'react';
import "../styles/Dashboard.css";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaVoteYea } from 'react-icons/fa';
import bulb from '../assets/bulb.png';
import glass from '../assets/glass.png';
import horse from '../assets/horse.png';
import jar from '../assets/jar.png';
import lock from '../assets/lock.png';

import VideoCapture from './VideoCapture';

const dummyCandidates = [
    {
        logo: bulb,np
        name: "John",
        party: "PPP",
        description: "Party A is focused on economic growth and sustainable development."
    },
    {
        logo: glass,
        name: "Ram",
        party: "MMP",
        description: "Party B is dedicated to healthcare reform and education."
    },
    {
        logo: horse,
        name: "sam",
        party: "kku",
        description: "Party C aims to improve environmental protection and renewable energy."
    },
    {
        logo: jar,
        name: "iman",
        party: "lOE",
        description: "Party D focuses on social justice and equal opportunity for all."
    },
    {
        logo: lock,
        name: "lokesh",
        party: "NkK",
        description: "Party D focuses on social justice and equal opportunity for all."
    }
];

const Dashboard = () => {
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");
    const [data, setData] = useState({});
    const [candidates, setCandidates] = useState([]);
    const [freeze, setFreeze] = useState(false);
    const navigate = useNavigate();

    // Fetch candidates data from dummy data
    const fetchCandidates = async () => {
        // Simulating API call with dummy data
        setCandidates(dummyCandidates);
    }

    const fetchLuckyNumber = async () => {
        let axiosConfig = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        try {
            const response = await axios.get("http://localhost:3000/api/v1/dashboard", axiosConfig);
            setData({ msg: response.data.msg, luckyNumber: response.data.secret });
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleResultClick = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/results");
            navigate('/result', { state: { results: response.data } });
        } catch (error) {
            toast.error("Failed to fetch results");
        }
    };

    const handleVoteClick = (candidateName) => {
        if (freeze) {
            toast.error("Voting is disabled due to multiple faces detected.");
            return;
        }

        const isConfirmed = window.confirm(`Are you sure you want to vote for ${candidateName}?`);
        if (isConfirmed) {
            toast.success("Thanks for voting!");
            navigate('/logout');
            // Add your vote submission logic here if needed
        }
    };

    useEffect(() => {
        if (token === "") {
            navigate("/login");
            toast.warn("Please login first to access dashboard");
        } else {
            fetchLuckyNumber();
            fetchCandidates(); // Call the function to load dummy data
        }
    }, [token]);

    const onFacesDetected = (faceCount) => {
        if (faceCount > 1) {
            setFreeze(true);
            toast.error("Multiple faces detected. Voting is disabled.");
        } else {
            setFreeze(false);
        }
    };

    return (
        <div className={`dashboard-main ${freeze ? 'freeze' : ''}`}>
            <h2 className='first'> <span className='sec'>Secured </span><span className='tt'>Voting</span> <span className='third'> System!</span></h2>

            <VideoCapture onFacesDetected={onFacesDetected} />

            <table className='candidates-table'>
                <thead>
                    <tr>
                        <th>Logo</th>
                        <th>Name</th>
                        <th>Party</th>
                        <th>Description</th>
                        <th>Vote</th>
                    </tr>
                </thead>

                <tbody>
                    {candidates.length > 0 ? (
                        candidates.map((candidate, index) => (
                            <tr key={index}>
                                <td>
                                    <img
                                        src={candidate.logo || "default.png"}
                                        alt={candidate.name}
                                        className="candidate-logo"
                                    />
                                </td>
                                <td>{candidate.name}</td>
                                <td>{candidate.party}</td>
                                <td>{candidate.description}</td>
                                <td>
                                    <button className="vote-button" onClick={() => handleVoteClick(candidate.name)}>
                                        <FaVoteYea /> Vote
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No candidates available</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Link to="/logout" className="logout-button">Logout</Link> <br />
            <button onClick={handleResultClick} className="Result-button">Result</button>
        </div>
    )
}

export default Dashboard;
