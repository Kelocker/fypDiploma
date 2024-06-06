import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useTimer } from 'react-timer-hook';
import { ACCESS_TOKEN } from '../../constants';

const RankCountdown = () => {
    const { id } = useParams();
    const [challenge, setChallenge] = useState(null);
    const [error, setError] = useState(null);

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
        <div style={{ textAlign: 'center' }}>
            <h1>Countdown to Challenge End</h1>
            <MyTimer expiryTimestamp={expiryTimestamp} />
        </div>
    );
};

function MyTimer({ expiryTimestamp }) {
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '100px' }}>
                <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            </div>
            <p>{isRunning ? 'Running' : 'Not running'}</p>
            <button onClick={start}>Start</button>
            <button onClick={pause}>Pause</button>
            <button onClick={resume}>Resume</button>
            <button onClick={() => {
                // Restarts to the initial expiry timestamp
                restart(expiryTimestamp)
            }}>Restart</button>
        </div>
    );
}

export default RankCountdown;
