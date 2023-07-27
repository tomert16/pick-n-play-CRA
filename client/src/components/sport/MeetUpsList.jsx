import MeetUpCard from "./MeetUpCard";
import { useState, useEffect } from "react";
import { useNavigate, useParams  } from 'react-router-dom';


function MeetUpsList({ meetUp, setMeetUps, selectedMeetUp, setSelectedMeetUp, loggedInPlayer, meetUps, handleAddTeammate }) {
  const navigate = useNavigate();
  const [showMeetUp, setShowMeetUp] = useState(false);
  const [teammates, setTeammates] = useState();
  const {id} = useParams();
  const handleMeetUpClick = (meetUp) => {
    setSelectedMeetUp(meetUp)
    setShowMeetUp(true)
}

  const playersTotal = meetUp?.teammates?.length + 1
  const playersNumber = () => {
    if (meetUp.sport.sport_type === "Soccer") {
      return (playersTotal + '/14')
    } if 
      (meetUp.sport.sport_type === "Basketball") {
        return (playersTotal + '/10')
    } if 
    (meetUp.sport.sport_type === "Tennis") {
      return (playersTotal + '/4')
  } if 
  (meetUp.sport.sport_type === "Football") {
    return (playersTotal + '/10')
  }

  }

 


  return (
    <div className="meet-ups-list">
        <div className="meet-ups" onClick={() => handleMeetUpClick(meetUp)}>
          <img className="mu-field-img" src={meetUp?.field.img_url} />
          <div className="mu-info">
            <h3>{meetUp.field.name}</h3>
            <p>{meetUp.date}</p>
            <p>Host: {meetUp.player.name}</p>
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
        teammates={teammates}
        setTeammates={setTeammates}
        /> : null}
        
    </div>
  )
}

export default MeetUpsList;