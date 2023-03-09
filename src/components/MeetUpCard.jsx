import { format, set } from 'date-fns'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";

function MeetUpCard({ loggedInPlayer, meetUp, setMeetUps, setShowMeetUp, meetUps, handleAddTeammate}) {
    const navigate = useNavigate();
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
        // debugger
        fetch (`/join_meet_ups`, 
        {method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(join)
      }).then((resp) => {
            if (resp.ok) {
                resp.json() .then((teammate) => {
                    //debugger
                    handleAddTeammate(teammate)}
                    )
      
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

    const totalPlayers = meetUp?.teammates.length + 1;
useEffect(() => {
    if (meetUp?.sport.sport_type === 'Soccer' && totalPlayers >= 14){
        console.log('full meet up', meetUp.teammates.length);
        setJoinToggle(!joinToggle)
    }else if (meetUp?.sport.sport_type === 'Basketball' && totalPlayers >= 10){
        console.log('full meet up', meetUp.teammates.length);
        setJoinToggle(!joinToggle)
    }else if (meetUp?.sport.sport_type === 'Tennis' && totalPlayers >= 4){
        console.log('full meet up', meetUp.teammates.length);
        setJoinToggle(!joinToggle)
    }else if (meetUp?.sport.sport_type === 'Football' && totalPlayers >= 10){
        console.log('full meet up', meetUp.teammates.length);
        setJoinToggle(!joinToggle)
    }
},[])
  return (
    <div className='meet-up-card-div'>
      <div className="meet-up-card">
        <div>{meetUp?.field.name}</div>
        <img src={meetUp?.field.img_url} />
        <div>{meetUp?.date}</div>
        <div>{totalPlayers}</div>
        <div>{meetUp?.player.name}</div> 
        <div>{meetUp.teammates.map((player) => (<div key={player.id}>{player}</div>))}</div>
        {joinToggle ? <button type="button" value="Join Meet Up" onClick={() => {handleJoinTeam()}
           
            }>Join Meet Up</button>
          :
          <p>Full</p>}
        <button type='button' onClick={() => handleDropMeetUp()}>Drop Meet Up</button>
        <button className="back-btn" type='button' onClick={() => handleBackClick()}>X</button>
    </div>
    </div>  
    
  )
}

export default MeetUpCard