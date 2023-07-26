import { useEffect, useRef, useState } from 'react';
import { Form } from "semantic-ui-react";
import { useParams } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import MeetUpList from '../components/sport/MeetUpsList';
import NavBar from '../components/NavBar';
import FieldDropDownFilter from '../components/sport/FieldDropDownFilter';
import { fetchSportById, selectSportById } from '../redux/sports/sportsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocationById, selectLocationById } from '../redux/locations/locationsSlice';
import { addNewMeetUp } from '../redux/meetUps/meetUpsSlice';
import { selectLoggedInPlayer, stayLoggedIn } from '../redux/players/playersSlice';
import InfiniteScroll from 'react-infinite-scroll-component';


function SportInfo({ setSelectedMeetUp, handleAddTeammate, locations }) {
    // const containerRef = useRef(null);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [date, setDate] = useState("");
    const [location, setLocation] = useState();
    const [formToggle, setFormToggle] = useState(false);
    const [fieldFilter, setFieldFilter] = useState("all");
    const loggedInPlayer = useSelector(selectLoggedInPlayer)
    // infinite scrolling for meet-ups
    const [visible, setVisible] = useState(5);
    // const [loading, setLoading] = useState(false);
    


    // fetch individual sport
    const individualSport = useSelector(selectSportById);
    useEffect(() => {
        dispatch(fetchSportById(id));
    },[dispatch]);

        const individualLocation = useSelector(selectLocationById);
        useEffect(() => {
            dispatch(fetchLocationById(id));
        },[dispatch])
          
        
        if (individualSport === undefined){
            return null;
        }
            
    const handleFormToggle = () => {
        setFormToggle(true)
    }
    const createMeetUps = () => {
        
        const newMeetUp = {
            "date": new Date(date),
            "field_id": parseInt(location),
            "sport_id": parseInt(individualSport.id),
            "player_id": parseInt(loggedInPlayer.id)  
        };
        dispatch(addNewMeetUp(newMeetUp));
    };  
    // const fieldsDropdownFilter = individualSport.meet_ups.filter((sport) => {
    //     if (fieldFilter === 'all') return true;
    //     return sport.field.name.toLowerCase() === fieldFilter.toLowerCase();
    // })
      return (
      <div  className="bg-image" style={{backgroundImage: `url(${individualSport.bg_img})`, backgroundRepeat: 'no-repeat', backgroundSize: "cover"}}>
        <NavBar loggedInPlayer={loggedInPlayer}  locations={locations}/>
        {/* <FieldDropDownFilter fieldFilter={fieldFilter} setFieldFilter={setFieldFilter} individualLocation={individualLocation}/> */}
        <h1 className="info-title">{individualSport.sport_type} meet ups:</h1>
            <div className="meet-ups-list">

            {individualSport.meet_ups.map((meetUp) => {
                return (
                    // <div onClick={handleMeetUpClick}>  
                    <MeetUpList 
                        setSelectedMeetUp={setSelectedMeetUp}
                        // meetUps={meetUps}
                        meetUp={meetUp}
                        key={meetUp.id}
                        loggedInPlayer={loggedInPlayer}
                        // setMeetUps={setMeetUps}
                        handleAddTeammate={handleAddTeammate}
                    />
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
                    <input fluid type="datetime-local" name="date" value={date}  onChange={(e) => setDate(e.target.value)}/>
                    <select onChange={(e) => setLocation(e.target.value)} >
                        <option >Pick your field/court</option>
                        {individualLocation.fields.map((field) => (
                            <option value={field.id}>{field.field_name}</option>
                        ))}
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
      );
}

export default SportInfo;