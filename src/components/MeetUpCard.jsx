import { format, set } from 'date-fns'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";

function MeetUpCard({ selectedMeetUp, setSelectedMeetUp, loggedInPlayer, meetUp, showMeetUp, setShowMeetUp }) {
    const navigate = useNavigate();
    const [teammates, setTeammates] = useState([]);
    const [joinToggle, setJoinToggle] = useState(true);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000)
    },[])

    const handleJoinTeam = () => {
        const join = {
            "meet_up_id": meetUp.id,
            "player_id": loggedInPlayer.id
        }
      
        fetch (`/join_meet_ups`, 
        {method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(join)
      }).then((resp) => {
            if (resp.ok) {
                resp.json() .then((teammate) => setSelectedMeetUp([...selectedMeetUp.player_meet_ups, teammate]))
      
            }
        })
      }
      
        

    const handleDropMeetUp = () => {
        fetch (`/drop_meet_up`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                "meet_up_id": meetUp.id,
                "player_id": loggedInPlayer.id
            })
        })
        navigate('/sportinfo')
        alert("Meet Up Dropped!")
    }

    const handleBackClick = () => {
        setShowMeetUp(false)
    }

useEffect(() => {
    const totalPlayers = meetUp?.player_meet_ups.length + 1;

    if (meetUp?.sport.sport_type === 'Soccer' && totalPlayers >= 14){
        console.log('full meet up', meetUp.player_meet_ups.length);
        setJoinToggle(!joinToggle)
    }else if (meetUp?.sport.sport_type === 'Basketball' && totalPlayers >= 10){
        console.log('full meet up', meetUp.player_meet_ups.length);
        setJoinToggle(!joinToggle)
    }else if (meetUp?.sport.sport_type === 'Tennis' && totalPlayers >= 4){
        console.log('full meet up', meetUp.player_meet_ups.length);
        setJoinToggle(!joinToggle)
    }else if (meetUp?.sport.sport_type === 'Football' && totalPlayers >= 10){
        console.log('full meet up', meetUp.player_meet_ups.length);
        setJoinToggle(!joinToggle)
    }
},[])
console.log(selectedMeetUp)
  return (
    <div>
        
      <div className="meet-up-card">
        <div>{meetUp?.date}</div>
        <img src={meetUp?.field.img_url} />
        <div>{meetUp?.field.name}</div>
        <div>{meetUp?.player.name}</div> 

        <div>{meetUp.player_meet_ups.map((player) => (<div key={player.id}>{player.player.name}</div>))}</div>
        {joinToggle ? <button type="button "onClick={() => 
            handleJoinTeam(meetUp)
            }>
            Join Meet Up
          </button>
          :
          <p>Full</p>}
        <button type='button' onClick={handleDropMeetUp}>Drop Meet Up</button>
        <button type='button' onClick={() => handleBackClick()}>Back</button>
    </div>
    </div>  
    
  )
}

export default MeetUpCard