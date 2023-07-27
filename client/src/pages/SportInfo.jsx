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
import Pagination from '../components/Pagination';
import styled from 'styled-components';


function SportInfo({ setSelectedMeetUp, handleAddTeammate, locations }) {
    // const containerRef = useRef(null);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [date, setDate] = useState("");
    const [location, setLocation] = useState();
    const [formToggle, setFormToggle] = useState(false);
    const [fieldFilter, setFieldFilter] = useState("all");
    const loggedInPlayer = useSelector(selectLoggedInPlayer)
    const [visible, setVisible] = useState(5);
    const [amountOfMeetUps] = useState(5);
    const [currentSlide, setCurrentSlide] = useState(1);
    
    // const [loading, setLoading] = useState(false);
    
    // fetch individual sport
    const individualSport = useSelector(selectSportById);
    useEffect(() => {
        dispatch(fetchSportById(id));
    },[dispatch]);
    // fetch location data 
    const individualLocation = useSelector(selectLocationById);
    useEffect(() => {
        dispatch(fetchLocationById(id));
    },[dispatch])
    
    if (individualSport === undefined){
        return null;
    }
    
    // Pagination variables and values 
    const indexOfLastCard = currentSlide * amountOfMeetUps;
    const indexOfFirstCard = indexOfLastCard - amountOfMeetUps;
    // Change slides functionalities
    const nextSlide = () => setCurrentSlide(currentSlide + 1);
    const previousSlide = () => setCurrentSlide(currentSlide - 1);
    const end = indexOfLastCard >= individualSport.meet_ups.length;
    const beginning = currentSlide === 1;
            
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
        <Container>
            <div  className="bg-image" style={{backgroundImage: `url(${individualSport.bg_img})`, backgroundRepeat: 'no-repeat', backgroundSize: "cover"}}>
                <NavBar loggedInPlayer={loggedInPlayer}  locations={locations}/>
                {/* <FieldDropDownFilter fieldFilter={fieldFilter} setFieldFilter={setFieldFilter} individualLocation={individualLocation}/> */}
                <h1 className="info-title">{individualSport.sport_type} meet ups:</h1>
                    <div className="meet-ups-list">
                    {individualSport.meet_ups.slice(indexOfFirstCard, indexOfLastCard).map((meetUp) => 
                        (
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
                        )}
                    </div>
                <div className="pagination">
                    <Pagination 
                        amount={amountOfMeetUps}
                        next={nextSlide}
                        prev={previousSlide}
                        total={individualSport.meet_ups.length}
                        beginning={beginning}
                        end={end}
                        currentSlide={currentSlide}
                    />
                </div>
            <div className='new-meet-up-container'>
                <button className='learn-more' onClick={handleFormToggle}>
                    <span class="circle" aria-hidden="true">
                    <span class="icon arrow"></span>
                    </span>
                    <span class="button-text">Want To Create Your Own</span>
                </button>
                {formToggle ?
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
                : null}
                </div>
            </div>
        </Container>
      );
};

const Container = styled.div`
    .bg-image{
        height: 100vh;
        width: 100%;
        position: fixed;
        overflow-x: scroll;
    }
    .info-title {
        color: rgb(246, 247, 248);
        text-align: center;
        font-size: 5pc;
        font-family: "Ultra", serif;
        position: relative;
        background-color: transparent;
        text-shadow: 2px 2px 3px rgb(255, 205, 98);
    }
    .meet-ups-list{
        display: flex;
        /* flex-wrap: nowrap; */
        position: relative;
        bottom: 10%;
        gap: 1rem;
    }
    .new-meet-up-container{
        position: absolute;
        top: 10rem;
        right: 10%;
    }
.new-mu-form{
    display:flex;
    flex-direction: column;
    position: absolute;
    /* top: 10rem; */
    right: 1rem;
    width: 15vw;
    border-style: solid;
    border-width: 20px;
    border-radius: 10px;
    border-color: rgb(8, 7, 7);
    background-color: black;
}
.new-mu-form > button {
  margin-bottom: 15px;
  height: 35px;
  padding-left: 12px;
  padding-right: 12px;
  font-family: 'Ultra', serif;
  color: #4d4574;
  background-color: aliceblue;
  border-color: rgb(255, 205, 98);
  border-radius: 40px;
  text-align: center;
}
.new-mu-form > input {
  margin-bottom: 15px;
  height: 25px;
}
.new-mu-form > select {
  margin-bottom: 15px;
  height: 25px;
}
.new-mu-form > h3 {
  color: white;
  font-size: larger;
  font-family: 'Ultra', serif;
  padding-bottom: 20px;
}
`;

export default SportInfo;