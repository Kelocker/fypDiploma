import React, { useEffect, useState } from 'react';
import '../css/rank/challengeDashboard.css';
import BoardChallengeRender from '../components/rankComponents/BoardChallengeRender';
import { BoardChallengeCard } from '../components/rankComponents/ChallengeCard';

const ChallengeDashboard = () => {
  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://localhost:8000/api/challenges/`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setChallenges(data);
      } catch (e) {
        setError(e.message);
        console.error(e);
      }
    };

    fetchData();
  }, []);

  const handleSelectChallenge = (challenge) => {
    window.location.href = `/exercise-detail/${challenge.id}`;
  };

  return (
    <div className="Challenge-Dashboard-wrapper">
      <div className="Challenge-Top-Board">
        <BoardChallengeRender />
      </div>

      <div className="Challenge">
        <div className="Weekly-challenge-word">
          Weekly challenge
          {challenges.map((challenge) => (
            <BoardChallengeCard key={challenge.id} challenge={challenge} onSelect={handleSelectChallenge} />
          ))}
        </div>

        <div className="challenge-render"></div>
      </div>
    </div>
  );
};

export default ChallengeDashboard;
