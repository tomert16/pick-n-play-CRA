import MeetUpCard from "./MeetUpCard";
import { useNavigate } from 'react-router-dom';


function MeetUpsList({ meetUp, setMeetUps, selectedMeetUp, setSelectedMeetUp }) {
  const navigate = useNavigate();

  const handleMeetUpClick = (meetUp) => {
    setSelectedMeetUp(meetUp)
    navigate(`/meetup`)
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
        <div onClick={() => handleMeetUpClick(meetUp)}>
          <div>{meetUp.date}</div>
          <div>{meetUp.field.name}</div>
          <div>{meetUp.player.name}</div>
          <div>{playersNumber()}</div>
        </div>
        
    </div>
  )
}

export default MeetUpsList;