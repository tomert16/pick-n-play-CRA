import { format, set } from 'date-fns'
import { useState, useEffect } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";

function MeetUpCard({ loggedInPlayer, meetUp, setShowMeetUp, teammates, setTeammates, meetUps, setMeetUps}) {
    const navigate = useNavigate();
    const [joinToggle, setJoinToggle] = useState(true);
    

   
    const totalPlayers = meetUp.teammates.length + 1;
    useEffect(() => {
        if (meetUp.sport.sport_type === 'Soccer' && totalPlayers >= 14){
            console.log('full meet up', meetUp.teammates.length);
            setJoinToggle(!joinToggle)
        }else if (meetUp.sport.sport_type === 'Basketball' && totalPlayers >= 10){
            console.log('full meet up', meetUp.teammates.length);
            setJoinToggle(!joinToggle)
        }else if (meetUp.sport.sport_type === 'Tennis' && totalPlayers >= 4){
            console.log('full meet up', meetUp.teammates.length);
            setJoinToggle(!joinToggle)
        }else if (meetUp.sport.sport_type === 'Football' && totalPlayers >= 10){
            console.log('full meet up', meetUp.teammates.length);
            setJoinToggle(!joinToggle)
        }
    },[])

   

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
            const updatedMeetUps = meetUps.map((mu) => {
              if (mu.id === meetUp.id) {
                return {
                  ...mu,
                  teammates: [...mu.teammates, `${loggedInPlayer.first_name} ${loggedInPlayer.last_name}`]
                }
              }
              return mu
            })
            setMeetUps(updatedMeetUps)
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
            const updatedMeetUps = meetUps.map(meetUp => {
              return {
                ...meetUp,
                teammates: meetUp.teammates.filter(teammate => teammate.id !== id)
              }
            });
      
            // Update the meetUps state with the new data
            setMeetUps(updatedMeetUps);
            alert("Meet Up Dropped!");
          })
          .catch(error => {
            console.error("Error deleting player:", error);
          });
      }

    const handleBackClick = () => {
        setShowMeetUp(false)
    }



  return (
    <div className='meet-up-card-div'>
      <div className="meet-up-card">
        <h3>{meetUp.field.name}</h3>
        <img src={meetUp.field.img_url} />
        <h4>{meetUp.date}</h4>
        <h4>Total Players: {totalPlayers}</h4>
        <li>{meetUp.player.name}</li> 
        <div>{meetUp.teammates.map((player) => (<li className="teammates">{player}</li>))}</div>
        {joinToggle ? <button type="button" value="Join Meet Up" onClick={() => handleJoinTeam(loggedInPlayer)}>Join Meet Up</button>
          :
          <p>Full</p>}
        <button type='button' onClick={() => handleDropMeetUp()}>Drop Meet Up</button>
        <button className="back-btn" type='button' onClick={() => handleBackClick()}>X</button>
    </div>
    </div>  
    
  )
}

export default MeetUpCard