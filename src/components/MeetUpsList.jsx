import MeetUpCard from "./MeetUpCard";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


function MeetUpsList({ meetUp, setMeetUps, selectedMeetUp, setSelectedMeetUp, loggedInPlayer }) {
  const navigate = useNavigate();
  const [showMeetUp, setShowMeetUp] = useState(false);

  const handleMeetUpClick = (meetUp) => {
    setSelectedMeetUp(meetUp)
    // navigate(`/meetup`)
    setShowMeetUp(true)
}


const playersNumber = () => {
  if (meetUp.player_meet_ups.length + 1 === 1){
    return `${meetUp.player_meet_ups.length + 1} player`
  } else{
    return (`${meetUp.player_meet_ups.length + 1} players`)
  }
}



    
  return (
    <div>
        <div className="meet-ups-list" onClick={() => handleMeetUpClick(meetUp)}>
          <img className="mu-field-img" src={meetUp.field.img_url} />
          <div className="mu-info">
            <p>{meetUp.date}</p>
            <p>{meetUp.field.name}</p>
            <p>{meetUp.player.name}</p>
            <p>{playersNumber()}</p>
          </div>
        </div>
        {showMeetUp ? <MeetUpCard 
        meetUp={meetUp} 
        setMeetUps={setMeetUps}
        selectedMeetUp={selectedMeetUp}
        setSelectedMeetUp={setSelectedMeetUp}
        loggedInPlayer={loggedInPlayer}
        showMeetUp={showMeetUp}
        setShowMeetUp={setShowMeetUp}
        /> : null}
        
    </div>
  )
}

export default MeetUpsList;