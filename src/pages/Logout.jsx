import React, { useEffect } from 'react'
import "../styles/Logout.css";
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    const navigate = useNavigate();
    
    useEffect(() => {
        localStorage.removeItem("auth");
        setTimeout(() => {
            navigate("/");
        }, 3000);
    }, []);

  return (
    <div className='logout-main'>
    <h1>Thanks for Voting</h1>
    <p>Return to landing page in 3 seconds...</p>
  </div>
  )
}

export default Logout