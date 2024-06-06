import React from 'react'
import '../../css/rank/challengeCard.css'
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';




const BoardChallengeCard = ({ challenge, onSelect }) => {
  return (
    <div className="Board-wrapper Challenge-Card-Wrapper">
      <CardActionArea onClick={() => onSelect(challenge)}>
        <div className="Board-media Challenge-Card-Media"></div>
        <div className="Board-content challenge-Card-Content">
          <Typography gutterBottom variant="h6" component="div">
            {challenge.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {challenge.description}
          </Typography>
        </div>
      </CardActionArea>
    </div>
  );
};




const ChallengeCard = () => {
    return (
        <div className="Challenge-Card-Wrapper">
             <CardActionArea>

            <div className="Challenge-Card-Media">
            

            </div>

            <div className="challenge-Card-Content">
                <Typography gutterBottom variant="h6" component="div">
                    Lizard
                </Typography>
                <Typography variant="body3" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>

            </div>

            </CardActionArea>

        </div>
    )
}

export { BoardChallengeCard, ChallengeCard };
