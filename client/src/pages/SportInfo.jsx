import { useEffect, useRef, useState } from 'react';
import { Form } from "semantic-ui-react";
import { useNavigate, useParams } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import MeetUpList from '../components/sport/MeetUpsList';
import NavBar from '../components/NavBar';
import { fetchSportById, selectSportById } from '../redux/sports/sportsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addNewMeetUp } from '../redux/meetUps/meetUpsSlice';
import { selectLoggedInPlayer } from '../redux/players/playersSlice';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import styled from 'styled-components';
import { IoArrowBackCircleOutline } from 'react-icons/io5'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function SportInfo({ setSelectedMeetUp, handleAddTeammate, locations }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [date, setDate] = useState("");
    const [location, setLocation] = useState();
    const [formToggle, setFormToggle] = useState(false);
    const loggedInPlayer = useSelector(selectLoggedInPlayer)
    const [amountOfMeetUps] = useState(5);
    const [currentSlide, setCurrentSlide] = useState(1);
    const [loading, setLoading] = useState(false);

    // loading function
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    },[])
    

    const notify = () => {
        toast.success('Meet Up created ✅', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
    
    // fetch individual sport
    const individualSport = useSelector(selectSportById);
    useEffect(() => {
        dispatch(fetchSportById(id));
    },[dispatch]);

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
            "date": date,
            "field_id": parseInt(location),
            "sport_id": parseInt(individualSport.id),
            "player_id": parseInt(loggedInPlayer.id)  
        };
        dispatch(addNewMeetUp(newMeetUp))
            .then(() => {
                dispatch(fetchSportById(id));
            })
        notify();
        setFormToggle(false);
        setDate("")
    };  
 
      return (
          <Container>
            <NavBar loggedInPlayer={loggedInPlayer}  locations={locations}/>
            {loading ? 
             <Loader />
            :
            <div className="bg-image" style={{backgroundImage: `url(${individualSport.bg_img})`, backgroundRepeat: 'no-repeat', backgroundSize: "cover"}}>
                <h1 className="info-title">{individualSport.sport_type}:</h1>
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <IoArrowBackCircleOutline />
                </button>
                    <div className="meet-ups-list">
                    {individualSport.meet_ups.slice(indexOfFirstCard, indexOfLastCard).map((meetUp) => 
                        (
                            <MeetUpList 
                                setSelectedMeetUp={setSelectedMeetUp}
                                meetUp={meetUp}
                                key={meetUp.id}
                                loggedInPlayer={loggedInPlayer}
                                handleAddTeammate={handleAddTeammate}
                            />
                            )
                        )}
                    </div>
                <div id="pagination">
                    <Pagination 
                        isSport={true}
                        displayNum={true}
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
            <ToastContainer />
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
                            {loggedInPlayer.location.fields.map((field) => (
                                <option key={field.id }value={field.id}>{field.field_name}</option>
                            ))}
                        </select>
                        <button 
                            type="button" 
                            value="Create Meet Up" 
                            className="create"
                            onClick={() =>{ createMeetUps() }}
                        >Create</button>
                        <button className="close-form" type='button' onClick={() => setFormToggle(false)}>
                            <AiOutlineCloseCircle />
                        </button>
                    </Form> 
                : null}
                </div>
            </div>}
        </Container>
      );
};

const Container = styled.div`
    .bg-image{
        height: 100vh;
        width: 100vw;
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
    .back-btn {
        position: relative;
        left: 1rem;
        top: -12rem;
        background-color: transparent;
        border: none;
        cursor: pointer;
        svg {
            color: white;
            font-size: 4rem;
        }
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
        top: 4rem;
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
.create {
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
  cursor: pointer;
}
.close-form {
    background-color: transparent;
    border: none;
    color: white;
    position: relative;
    top: -14rem;
    left: 8rem;
    cursor: pointer;
    svg {
        font-size: 2rem;
    }
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