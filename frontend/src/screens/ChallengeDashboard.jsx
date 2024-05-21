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
        Weekly challenge

        {/* Weekly challenge */}
       

      </div>

       

      <div className="Challenge">

         {/* Day challenge */}
         

      </div>

    </div>
  )
}

export default ChallengeDashboard