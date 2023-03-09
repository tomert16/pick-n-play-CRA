import MeetUpCard from "./MeetUpCard";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


function MeetUpsList({ meetUp, setMeetUps, selectedMeetUp, setSelectedMeetUp, loggedInPlayer, selectedSport, meetUps, handleAddTeammate }) {
  const navigate = useNavigate();
  const [showMeetUp, setShowMeetUp] = useState(false);

  const handleMeetUpClick = (meetUp) => {
    setSelectedMeetUp(meetUp)
    setShowMeetUp(true)
}


const playersNumber = () => {
  if (meetUp?.teammates?.length + 1 === 1){
    return `${meetUp?.teammates?.length + 1} player`
  } else{
    return (`${meetUp?.teammates?.length + 1} players`)
  }
}



  return (
    <div className="meet-ups-list">
        <div className="meet-ups" onClick={() => handleMeetUpClick(meetUp)}>
          <img className="mu-field-img" src={meetUp?.field.img_url} />
          <div className="mu-info">
            <p>{meetUp.date}</p>
            <p>{meetUp.field.name}</p>
            <p>{playersNumber()}</p>
          </div>
        </div>
        {showMeetUp ? <MeetUpCard 
        meetUp={meetUp} 
        meetUps={meetUps}
        setMeetUps={setMeetUps}
        selectedMeetUp={selectedMeetUp}
        setSelectedMeetUp={setSelectedMeetUp}
        loggedInPlayer={loggedInPlayer}
        showMeetUp={showMeetUp}
        setShowMeetUp={setShowMeetUp}
        handleAddTeammate={handleAddTeammate}
        /> : null}
        
    </div>
  )
}

export default MeetUpsList;