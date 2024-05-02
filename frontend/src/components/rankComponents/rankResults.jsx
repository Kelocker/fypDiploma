import React from 'react'
import '../../css/rank/rankDisplay.css'
import UserRank from './userRank'

const RankResults = () => {
  return (
    <div className="rank-wrapper">

            <div className="rank-container">


            <div className="leaderboard-rank">

                <h1>Leaderboard</h1>

            </div>


                <div className="your-rank">


                    <h1>Congrats!</h1>
                    <br />
                    <span>Rank #21 Coolest User</span>


                </div>

               

                <div className="rank-label">


                    <div className="Rank-label">
                        Rank
                    </div>

                    <div className="Username-label">
                        Username
                    </div>

                    <div className="time-finish-label">
                        Time finish
                    </div>

                    

                </div>



                <div className="all-rank">

                    

                
                    <UserRank />
                    <UserRank />
                    <UserRank />
                    <UserRank />
                    <UserRank />

                    <UserRank />
                    <UserRank />
                    <UserRank />
                    <UserRank />
                    <UserRank />

                    <UserRank />
                    <UserRank />
                    <UserRank />
                    <UserRank />
                    <UserRank />

                    <UserRank />
                    <UserRank />
                    <UserRank />
                    <UserRank />
                    <UserRank /> 
                 

                    

                </div>

                <div className="rank-end">

                </div>
            
            </div>
    </div>
  )
}

export default RankResults