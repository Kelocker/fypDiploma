import React from 'react'
import '../css/rank/challengeDashboard.css'
import BoardChallengeRender from '../components/rankComponents/BoardChallengeRender'


const ChallengeDashboard = () => {
  return (
    <div className="Challenge-Dashboard-wrapper">

      <div className="Challenge-Top-Board">

        <BoardChallengeRender />

      
    {/* <BoardChallengeCard /> */}
        
        
      </div>

      <div className="Challenge">
        <div className="Weekly-challenge-word">
          Weekly challenge
        </div>



        <div className="challenge-render">

        </div>
       

      </div>

       

      {/* <div className="Challenge">

         Day challenge
         

      </div> */}

    </div>
  )
}

export default ChallengeDashboard