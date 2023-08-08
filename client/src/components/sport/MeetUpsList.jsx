import MeetUpCard from "./MeetUpCard";
import { useState, useEffect } from "react";
import { useNavigate, useParams  } from 'react-router-dom';
import styled from "styled-components";


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
    } if 
    (meetUp.sport.sport_type === "Volleyball") {
      return (playersTotal + '/10')
    } if 
    (meetUp.sport.sport_type === "Hockey") {
      return (playersTotal + '/10')
    }
  }
 


  return (
    <Container className="meet-ups-list">
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
        selectedMeetUp={selectedMeetUp}
        setSelectedMeetUp={setSelectedMeetUp}
        loggedInPlayer={loggedInPlayer}
        showMeetUp={showMeetUp}
        setShowMeetUp={setShowMeetUp}
        teammates={teammates}
        setTeammates={setTeammates}
        /> : null}
        
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: 5rem;
  .meet-ups{
    border-style: solid;
    border-radius: 2pc;
    width: 16vw;
    height: 90%;
    position: relative;
    /* top: 3rem; */
    left: 36%;
    top: 2rem;
    margin-bottom: 4rem;
    cursor: pointer;
    background-color: white;
  }
  .mu-field-img{
    width: 100%;
    height: 13pc;
    position: relative;
    border-top-left-radius: 2pc;
    border-top-right-radius: 2pc;

  }
  .mu-info{
    /* position: relative; */
    margin-top: 3rem;
    text-align: center;
  }
`;


export default MeetUpsList;