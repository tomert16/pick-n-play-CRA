import { useState, useEffect } from 'react'

function FieldMeetUpCard({meetUp, loggedInPlayer, setShowMeetUp, fieldMeetUps, setFieldMeetUps, handleAddTeammate}) {
  const [joinToggle, setJoinToggle] = useState(true);
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
  const handleJoinTeam = () => {
    const join = {
        "meet_up_id": meetUp.id,
        "player_id": loggedInPlayer.id
    }
    // debugger
    fetch (`/player_meet_ups`, 
    {method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(join)
  }).then((resp) => {
      debugger
        if (resp.ok) {
            resp.json() .then((newTeammate) => {
                debugger
                handleAddTeammate(newTeammate)}
                )
  
        }
    })
  }
  const totalPlayers = meetUp?.teammates.length + 1;
  useEffect(() => {
      if (meetUp?.sport.sport === 'Soccer' && totalPlayers >= 14){
          console.log('full meet up', meetUp.teammates.length);
          setJoinToggle(!joinToggle)
      }else if (meetUp?.sport.sport === 'Basketball' && totalPlayers >= 10){
          console.log('full meet up', meetUp.teammates.length);
          setJoinToggle(!joinToggle)
      }else if (meetUp?.sport.sport === 'Tennis' && totalPlayers >= 4){
          console.log('full meet up', meetUp.teammates.length);
          setJoinToggle(!joinToggle)
      }else if (meetUp?.sport.sport === 'Football' && totalPlayers >= 10){
          console.log('full meet up', meetUp.teammates.length);
          setJoinToggle(!joinToggle)
      }
  },[])

  return (
    <div className='meet-up-card-div'>
      <div className="field-meet-up-card">
        <h3>{meetUp.sport.type}</h3>
        <h4>{meetUp.date}</h4>
        <div>Total Player: {totalPlayers}</div>
        <h4>Players:</h4>
        <p>{meetUp.player.name}</p>
        <div>{meetUp.teammates.map((teammate) => (<p>{teammate}</p>))}</div>
        {joinToggle ? <button type="button" value="Join Meet Up" onClick={() => {handleJoinTeam(loggedInPlayer)}
           
            }>Join Meet Up</button>
          :
          <p>Full</p>}
        <button className="back-btn" type='button' onClick={() => handleBackClick()}>X</button>
      </div>
    </div>
  )
}

export default FieldMeetUpCard;