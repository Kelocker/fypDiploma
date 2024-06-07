import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTimer } from 'react-timer-hook';
import { ACCESS_TOKEN } from '../../constants';
import DashboardNavbar from '../dashboardNavbar';
import '../../css/rank/rankCountdown.css';

const RankCountdown = () => {
    const { id } = useParams();
    const [challenge, setChallenge] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChallenge = async () => {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) {
                setError("Authentication error: No token found");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8000/api/challenges/${id}/`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setChallenge(response.data);
            } catch (error) {
                console.error("Failed to fetch challenge data", error);
                setError("Failed to load challenge data");
            }
        };

        fetchChallenge();
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!challenge) {
        return <div>Loading...</div>;
    }

    const expiryTimestamp = new Date(challenge.end_time);

    return (
        <>
            <DashboardNavbar />
            <div className="RankCountdown-container">
                <div style={{ textAlign: 'center' }}>
                    <h1>Countdown to Challenge End</h1>
                    <MyTimer expiryTimestamp={expiryTimestamp} challengeId={challenge.id} />
                </div>
            </div>
        </>
    );
};

function MyTimer({ expiryTimestamp, challengeId }) {
    const navigate = useNavigate();
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
    } = useTimer({
        expiryTimestamp,
        onExpire: () => {
            console.warn('Timer expired');
            navigate(`/rank-results/${challengeId}`);
        }
    });

    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '100px' }}>
                <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            </div>
            <p>{isRunning ? 'You have no attempt left.' : 'Not running'}</p>
        </div>
    );
}

export default RankCountdown;
