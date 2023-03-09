import { useState } from 'react'

function FieldMeetUpCard({meetUp, loggedInPlayer, setShowMeetUp, fieldMeetUps, setFieldMeetUps}) {

  const handleBackClick = () => {
    setShowMeetUp(false)
  }

  // const handleJoinMeetUp = () => {
  //   const join = {
  //     "meet_up_id": meetUp.id,
  //     "player_id": loggedInPlayer.id
  //   }

  //   fetch (`/join_meet_ups`, 
  //   {method: "POST",
  //   headers: { "Content-Type": "application/json"},
  //   body: JSON.stringify(join)
  //   }).then((resp) => {
  //     if (resp.ok){
  //       resp.json() .then((teammate) => )
  //     }
  //   })
  // }


  return (
    <div className='meet-up-card-div'>
      <div className="meet-up-card">
        <h3>{meetUp.sport.type}</h3>
        <h4>{meetUp.date}</h4>
        <h4>Players:</h4>
        <p>{meetUp.player.name}</p>
        <div>{meetUp.teammates.map((teammate) => (<p>{teammate}</p>))}</div>
        <button type='button' onClick={() => handleBackClick()}>Back</button>
      </div>
    </div>
  )
}

export default FieldMeetUpCard;