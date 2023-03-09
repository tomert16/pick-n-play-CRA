import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FieldMeetUpCard from './FieldMeetUpCard'

function FieldMeetUpList({meetUp, loggedInPlayer, handleAddTeammate}) {
    const navigate = useNavigate();
    const [selectedFieldMeetUp, setSelectedFieldMeetUp] = useState();
    const [showMeetUp, setShowMeetUp] = useState(false);

    const goToMeetUp = (fMeetUp) => {
        setSelectedFieldMeetUp(fMeetUp)
        setShowMeetUp(true);
    }
   
    const playersNumber = () => {
      if (meetUp?.teammates?.length + 1 === 1){
        return `${meetUp?.teammates?.length + 1} player`
      } else{
        return (`${meetUp?.teammates?.length + 1} players`)
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
          /> : null
      }
      </div>
    )
  }
  
  export default FieldMeetUpList;