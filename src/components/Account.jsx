import { useEffect, useState } from 'react'
import NavBar from './NavBar'

function Account({ loggedInPlayer, playerInfo, setPlayerInfo, meetUps, meetUpTeammates, setMeetUpTeammates }) {
    
    // const fetchTeammates = () => {
    //     fetch (`/player_meet_ups`)
    //     .then (r => r.json())
    //     .then(data => setMeetUpTeammates(data))
    // }
    // useEffect(() => {
    //     fetchTeammates();
    // },[])




  return (
    <div className="account-info-page">
      <div className='header-div'>
        <NavBar loggedInPlayer={loggedInPlayer} />
      </div>
       <div className="bar-info-container">
          <h1 className="bar-info-name"> Profile  Info</h1>
          <div className="details-reviews-container">
            <div className='bar-info-details'>
              <h2 className="user-info-title">Name: </h2> 
              <p className="user-info-detail">{`${loggedInPlayer?.first_name} ${loggedInPlayer?.last_name}`}</p>
              <h2 className="user-info-title">Email:  </h2>
              <p className="user-info-detail">{loggedInPlayer?.email}</p>
              <h2 className="user-info-title">Password:  </h2>
              <p className="user-info-detail">{loggedInPlayer?.password} ***********</p>
          </div>
          <div className='user-review-container'>
            <h3 className='your-reviews'>Your Created Meet Ups</h3>
            <div className='scroll-reviews'>{loggedInPlayer.meet_ups.map((meetUp) => (<div className="your-meet-ups">
                <h2>{meetUp.sport.sport_type}</h2>
                <h3 className='mu-date'>{meetUp.date}</h3>
                <h3>{meetUp.field.name}</h3>
            </div>))}
            </div>
          </div>
        </div>
        <div className='user-joined-container'>
          <h3 className='your-joined'>Your Joined Meet Ups</h3>
          <div className='scroll-meet-ups'>{loggedInPlayer.player_meet_ups.map((meetUp) => (<div className="your-joined-meet-ups">
            <h2>{meetUp.sport}</h2>
            <h3>{meetUp.date}</h3>
            <h3>{meetUp.field.name}</h3>
          </div>))}</div>
        </div>
        
       </div>
    </div>
  )
}

export default Account