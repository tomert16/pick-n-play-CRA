import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FieldMeetUpCard from './FieldMeetUpCard'

function FieldMeetUpList({meetUp, loggedInPlayer, handleAddTeammate, fieldMeetUps, setFieldMeetUps}) {
    const navigate = useNavigate();
    const [selectedFieldMeetUp, setSelectedFieldMeetUp] = useState();
    const [showMeetUp, setShowMeetUp] = useState(false);

    const goToMeetUp = (fMeetUp) => {
        setSelectedFieldMeetUp(fMeetUp)
        setShowMeetUp(true);
    }

    const playersTotal = meetUp?.teammates?.length + 1
    const playersNumber = () => {
        if (meetUp.sport.type === "Soccer") {
          return (playersTotal + '/14')
        } if 
          (meetUp.sport.type === "Basketball") {
            return (playersTotal + '/10')
        } if 
        (meetUp.sport.type === "Tennis") {
          return (playersTotal + '/4')
      } if 
      (meetUp.sport.type === "Football") {
        return (playersTotal + '/10')
      } if 
      (meetUp.sport.type === "Volleyball") {
        return (playersTotal + '/10')
      } if 
      (meetUp.sport.type === "Hockey") {
        return (playersTotal + '/10')
      }
    }
    return (
      <Container className='meet-ups-list'>
        <div className="field-meet-ups" onClick={() => goToMeetUp(meetUp)}>
          <div>
          <img className='mu-field-img' src={meetUp.sport.image} />
            <div className="mu-info">
              <h3>{meetUp.sport.type}</h3>
              <p> {meetUp.date}</p>
              <p>Host: {meetUp.player.name}</p>
              <p>{playersNumber()}</p>
            </div>
          </div>
          {/* <p>{meetUp.player.name}</p>
          <div>{meetUp.player_meet_ups.map((teammate) => (<div>{teammate}</div>))}</div> */}
        </div>
        {showMeetUp ? <FieldMeetUpCard 
          meetUp={meetUp} 
          loggedInPlayer={loggedInPlayer}
          setShowMeetUp={setShowMeetUp}
          handleAddTeammate={handleAddTeammate}
          fieldMeetUps={fieldMeetUps}
        setFieldMeetUps={setFieldMeetUps}
          /> : null
      }
      </Container>
    )
  };

  const Container = styled.div`
    margin-bottom: 2rem;
    .field-meet-ups{
      border-style: solid;
      border-radius: 2pc;
      width: 16vw;
      height: 90%;
      position: relative;
      /* top: 3rem; */
      left: 35%;
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

  
  export default FieldMeetUpList;