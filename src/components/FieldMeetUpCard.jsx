import { useState, useEffect } from 'react'
import FieldMeetUpList from './FieldMeetUpList';

function FieldMeetUpCard({meetUp, loggedInPlayer, setShowMeetUp, fieldMeetUps, setFieldMeetUps}) {
  const [joinToggle, setJoinToggle] = useState(true);
  const handleBackClick = () => {
    setShowMeetUp(false)
  }
  const handleJoinTeam = () => {
    const join = {
      "meet_up_id": meetUp.id,
      "player_id": loggedInPlayer.id
    }
  
    fetch('/join_meet_up', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(join)
    })
      .then((resp) => resp.json())
      .then((newTeammate) => {
        const updatedMeetUps = fieldMeetUps.map((mu) => {
          if (mu.id === meetUp.id) {
            return {
              ...mu,
              teammates: [...mu.teammates, `${loggedInPlayer.first_name} ${loggedInPlayer.last_name}`]
            }
          }
          return mu
        })
        setFieldMeetUps(updatedMeetUps)
      })
  }

  const handleDropMeetUp = (id) => {
    fetch(`/player_meet_ups/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "meet_up_id": meetUp.id,
        "player_id": loggedInPlayer.id
      })
    })
      .then(data => {
        // Filter out the deleted player from the meetUps state
        const updatedMeetUps = fieldMeetUps.map(meetUp => {
          return {
            ...meetUp,
            teammates: meetUp.teammates.filter(teammate => teammate.id !== id)
          }
        });
  
        // Update the meetUps state with the new data
        setFieldMeetUps(updatedMeetUps);
        alert("Meet Up Dropped!");
      })
      .catch(error => {
        console.error("Error deleting player:", error);
      });
  }

  
  const totalPlayers = meetUp?.teammates.length + 1;
  useEffect(() => {
      if (meetUp?.sport.type === 'Soccer' && totalPlayers >= 14){
          console.log('full meet up', meetUp.teammates.length);
          setJoinToggle(!joinToggle)
      }else if (meetUp?.sport.type === 'Basketball' && totalPlayers >= 10){
          console.log('full meet up', meetUp.teammates.length);
          setJoinToggle(!joinToggle)
      }else if (meetUp?.sport.type === 'Tennis' && totalPlayers >= 4){
          console.log('full meet up', meetUp.teammates.length);
          setJoinToggle(!joinToggle)
      }else if (meetUp?.sport.type === 'Football' && totalPlayers >= 10){
          console.log('full meet up', meetUp.teammates.length);
          setJoinToggle(!joinToggle)
      }
  },[])

  return (
    <div className='meet-up-card-div'>
      <div className="field-meet-up-card">
        <h3>{meetUp.sport.type}</h3>
        <img src={meetUp.sport.image} />
        <h4>{meetUp.date}</h4>
        <div>Total Player: {totalPlayers}</div>
        <li>{meetUp.player.name}</li>
        <div>{meetUp.teammates.map((teammate) => (<li className="teammates">{teammate}</li>))}</div>
        {joinToggle ? <button type="button" value="Join Meet Up" onClick={() => {handleJoinTeam(loggedInPlayer)}
           
            }>Join Meet Up</button>
          :
          <p>Full</p>}
           <button type='button' onClick={() => handleDropMeetUp()}>Drop Meet Up</button>
        <button className="back-btn" type='button' onClick={() => handleBackClick()}>X</button>
      </div>
    </div>
  )
}

export default FieldMeetUpCard;