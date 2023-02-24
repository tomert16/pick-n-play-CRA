import { useEffect, useState } from 'react';
import MeetUp from './MeetUp';

function SportInfo({ sports, selectedSport, meetUps, setMeetUps, loggedInPlayer }) {
    //const [dateInput, setDateInput] = useState("");
    const [locationInput, setLocationInput] = useState();
    const [fields, setFields] = useState([]);


    const fetchMeetUps = async() => {
        const req = await fetch(`/meet_ups`)
        const resp = await req.json()
        setMeetUps(resp)
    }
    useEffect(() => {
        fetchMeetUps();
        },[]);
    
    
    const fetchFields = async() => {
        const req = await fetch(`/fields`);
        const resp = await req.json();
        setFields(resp);
    };
    useEffect(() => {
        fetchFields();
    },[]);

    if (!meetUps.length === 0) return null;
    const filteredMeetUps = meetUps.filter((meetUp) =>{
        return selectedSport.id === meetUp.sport.id
    })

 
    
    const createMeetUps = (e) => {
        e.preventDefault();
        const newMeetUp = {
            "date": Date.now(),
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
    return (
        <div>
        <div>{selectedSport?.sport_type}</div>
          {filteredMeetUps.map((meetUp) => {
              return (<MeetUp key={meetUp.id} meetUp={meetUp} />)
            })} 

        <form >
            <input type="text" placeholder="Date"  />
            <select onChange={(e) => setLocationInput(e.target.value)} >
                <option >Pick you field/court</option>
                <option value={fields[0]?.id}>Bushwick Inlet Park</option>
                <option value={fields[1]?.id}>Central Park</option>
                <option value={fields[2]?.id}>Riverside Park</option>
            </select>
            <input 
                type="button" 
                value="Create Meet Up" 
                onClick={createMeetUps}
            />
        </form>
      </div>

  )
}

export default SportInfo;