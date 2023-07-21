import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    }
    
    }
    return (
      <div className='meet-ups-list'>
        <div className="meet-ups" onClick={() => goToMeetUp(meetUp)}>
          <div>
          <img className='mu-field-img' src={meetUp.sport.image} />
            <div className="mu-info">
              <h3>{meetUp.sport.type}</h3>
              <h4>{meetUp.date}</h4>
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
      </div>
    )
  }
  
  export default FieldMeetUpList;