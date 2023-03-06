import { useEffect, useState } from 'react';
import { format, setDate } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import MeetUpList from './MeetUpsList';

function SportInfo({ selectedSport, meetUps, setMeetUps, loggedInPlayer, setSelectedMeetUp, selectedMeetUp, fields }) {
    const navigate = useNavigate();
    const [dateInput, setDateInput] = useState("");
    const [locationInput, setLocationInput] = useState();
   
  


    const fetchMeetUps = async() => {
        const req = await fetch(`/meet_ups`)
        const resp = await req.json()
        setMeetUps(resp)
    }
    useEffect(() => {
        fetchMeetUps();
        },[]);
    
   

    
    
    
    const createMeetUps = (e) => {
        e.preventDefault();
        
        const newMeetUp = {
            "date": new Date(dateInput),
            "field_id": parseInt(locationInput),
            "sport_id": selectedSport.id,
            "player_id": loggedInPlayer.id
            
        }
        console.log(newMeetUp)
        
        fetch('/meet_ups',{
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(newMeetUp)
        }).then ((r) => {
            if (r.ok) {
                r.json() .then((meetUp) => setMeetUps([...meetUps, meetUp]))
            }
        })
    };
    
    if (!meetUps.length === 0) return null;
    const filteredMeetUps = meetUps.filter((meetUp) =>{
        //debugger
        console.log(meetUp)
        return meetUp.sport.id === selectedSport.id
    })
    // const handleMeetUpClick = (meetUp) => {
        //     setSelectedMeetUp(meetUp)
        //     navigate('/meetup')
    const handleBackClick = () => {
        navigate('/home')
      }
   
    return (
        <div>
        <div>{selectedSport?.sport_type}</div>
          {filteredMeetUps.map((meetUp) => {
              return (
                // <div onClick={handleMeetUpClick}>  
                <MeetUpList 
                    setSelectedMeetUp={setSelectedMeetUp}
                    meetUp={meetUp}
                    key={meetUp.id}
                />
                // </div>
                )
            })} 

        <form >
            <input type="datetime-local" name="date" value={dateInput}  onChange={(e) => setDateInput(e.target.value)}/>
            <select onChange={(e) => setLocationInput(e.target.value)} >
                <option >Pick you field/court</option>
                <option value={fields[0]?.id}>Bushwick Inlet Park</option>
                <option value={fields[1]?.id}>Central Park</option>
                <option value={fields[2]?.id}>Riverside Park</option>
                <option value={fields[3]?.id}>Globall Sports Center</option>
            </select>
            <input 
                type="button" 
                value="Create Meet Up" 
                onClick={createMeetUps}
            />
        </form>
        <button type='button' onClick={handleBackClick}>Back</button>
      </div>

  )
}

export default SportInfo;