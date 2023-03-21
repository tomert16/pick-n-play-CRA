import { useEffect, useState } from 'react';
import { Form } from "semantic-ui-react";
import { useNavigate, useParams } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import MeetUpList from './MeetUpsList';
import NavBar from './NavBar';
import FieldDropDownFilter from './FieldDropDownFilter';


function SportInfo({ meetUps, setMeetUps, loggedInPlayer, setLoggedInPlayer, setSelectedMeetUp, handleAddTeammate, individualLocation, locations }) {
    const navigate = useNavigate();
    const [dateInput, setDateInput] = useState("");
    const [locationInput, setLocationInput] = useState();
    const [formToggle, setFormToggle] = useState(false);
    const [fieldFilter, setFieldFilter] = useState("all");
    const [individualSport, setIndividualSport] = useState();
    const { id } = useParams();
    // const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     setLoading(true);
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 6000)
    // },[])
   
    
    useEffect(() => {
        async function fetchIndividualSport() {
            const req = fetch(`/sports/${id}`)
            const resp = await req;
            const parsed = await resp.json();
            setIndividualSport(parsed)
        }
        fetchIndividualSport()
    },[]);

    useEffect(() => {
        async function fetchMeetUps(){
            const req = fetch(`/sports/${id}`)
            const resp = await req;
            const parsed = await resp.json();
            setMeetUps(parsed.meet_ups);
        }
        fetchMeetUps();
    },[]);

    if (individualSport === undefined){
        return null;
    }
    if (meetUps === undefined){
        return null;
    }
    
 
    const handleFormToggle = () => {
        setFormToggle(true)
    }
    
    const createMeetUps = () => {
        
        const newMeetUp = {
            "date": new Date(dateInput),
            "field_id": locationInput,
            "sport_id": individualSport.id,
            "player_id": loggedInPlayer.id
            
        }
        
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

    
    console.log(meetUps)
  
    const fieldsDropdownFilter = meetUps.filter((sport) => {
        if (fieldFilter === 'all') return true;
        return sport.field.name.toLowerCase() === fieldFilter.toLowerCase();
    })
   //debugger
      return (
        <div >
           
        {/* {
            loading ?
            <ClipLoader
        color={'#de103b'}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      :  */}
      <div className="bg-image" style={{backgroundImage: `url(${individualSport.bg_img})`, backgroundRepeat: 'no-repeat', backgroundSize: "cover"}}>
        <NavBar loggedInPlayer={loggedInPlayer} setLoggedInPlayer={setLoggedInPlayer} individualLocation={individualLocation} locations={locations}/>
        {/* <FieldDropDownFilter fieldFilter={fieldFilter} setFieldFilter={setFieldFilter} individualLocation={individualLocation}/> */}
        <h1 className="info-title">{individualSport.sport_type} meet ups:</h1>
        <div className="meet-ups-list">
          {fieldsDropdownFilter.map((meetUp) => {
              return (
                // <div onClick={handleMeetUpClick}>  
                <MeetUpList 
                    setSelectedMeetUp={setSelectedMeetUp}
                    meetUps={meetUps}
                    meetUp={meetUp}
                    key={meetUp.id}
                    loggedInPlayer={loggedInPlayer}
                    setMeetUps={setMeetUps}
                    handleAddTeammate={handleAddTeammate}
                />
                // </div>
                )
            })}
        </div>
        <div className='new-meet-up-container'>
            <button className='learn-more' onClick={handleFormToggle}>
                <span class="circle" aria-hidden="true">
                <span class="icon arrow"></span>
                </span>
                <span class="button-text">Want To Create Your Own</span>
            </button>
       
            {formToggle ?  <div >
                <Form className='new-mu-form'>
                    <h3>Create a Meet Up</h3> 
                    <input fluid type="datetime-local" name="date" value={dateInput}  onChange={(e) => setDateInput(e.target.value)}/>
                    <select onChange={(e) => setLocationInput(e.target.value)} >
                        <option >Pick you field/court</option>
                        <option value={individualLocation.fields[0].id}>{individualLocation.fields[0].field_name}</option>
                        <option value={individualLocation.fields[1].id}>{individualLocation.fields[1].field_name}</option>
                        <option value={individualLocation.fields[2].id}>{individualLocation.fields[2].field_name}</option>
                        <option value={individualLocation.fields[3].id}>{individualLocation.fields[3].field_name}</option>
                    </select>
                    <button 
                        type="button" 
                        value="Create Meet Up" 
                        onClick={() =>{ createMeetUps() }}
                    >Create</button>
                    <button className="back-btn" type='button' onClick={() => setFormToggle(false)}>X</button>
                </Form> 
            </div>
            : null}
            </div>
        </div>
        
         
        

        
      </div>
      );
      
}

export default SportInfo;