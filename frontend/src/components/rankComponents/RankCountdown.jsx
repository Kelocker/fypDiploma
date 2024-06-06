import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ACCESS_TOKEN } from '../../constants';

const RankCountdown = () => {
    const { id } = useParams();
    const [challenge, setChallenge] = useState(null);
    const [error, setError] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);

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
                calculateTimeLeft(response.data.end_time);
            } catch (error) {
                console.error("Failed to fetch challenge data", error);
                setError("Failed to load challenge data");
            }
        };

        fetchChallenge();
    }, [id]);

    const calculateTimeLeft = (endTime) => {
        const endDate = new Date(endTime);
        const now = new Date();
        const difference = endDate - now;

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = null;
        }

        setTimeLeft(timeLeft);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            if (challenge) {
                calculateTimeLeft(challenge.end_time);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [challenge]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!challenge) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Countdown to Challenge End</h1>
            {timeLeft ? (
                <div>
                    <p>{timeLeft.days} Days</p>
                    <p>{timeLeft.hours} Hours</p>
                    <p>{timeLeft.minutes} Minutes</p>
                    <p>{timeLeft.seconds} Seconds</p>
                </div>
            ) : (
                <div>The challenge has ended!</div>
            )}
        </div>
    );
};

export default RankCountdown;
