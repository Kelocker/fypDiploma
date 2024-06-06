import React from 'react'
import '../../css/rank/rankResults.css'

const UserRank = ({ result }) => {

  return (
    // username, timing



    <div className="User-Rank-Wrapper">

        <div className="User-Rank-Container">

            <div className="User-Rank">

                {result.rank}

            </div>

            <div className="User-Name">

                {/* {username} */}
                {result.user}

            </div>

            <div className="User-Time">

                {/* {timing} */}
                {/* 12.09.80 */}

            </div>

        </div>



    </div>
  )
}

export default UserRank