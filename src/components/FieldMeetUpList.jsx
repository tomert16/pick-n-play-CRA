import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function FieldMeetUpCard({meetUp}) {
    const navigate = useNavigate();

    const [selectedFieldMeetUp, setSelectedFieldMeetUp] = useState();
    const goToMeetUp = (fMeetUp) => {
        setSelectedFieldMeetUp(fMeetUp)
        navigate('/fieldmeetup')
    }
    return (
      <div onClick={() => goToMeetUp(meetUp)}>
          <h3>{meetUp.sport}</h3>
          <h4>{meetUp.date}</h4>
          <p>{meetUp.player.name}</p>
          <p>{meetUp.teammates.map((teammate) => (<div>{teammate}</div>))}</p>
      </div>
    )
  }
  
  export default FieldMeetUpCard;