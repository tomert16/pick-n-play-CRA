import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FieldMeetUpList from '../components/field/FieldMeetUpList';
import NavBar from '../components/NavBar';
import { Form } from "semantic-ui-react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchFieldById, selectFieldById } from '../redux/fields/fieldsSlice';
import { selectLoggedInPlayer } from '../redux/players/playersSlice';
import styled from 'styled-components';
import { addNewMeetUp } from '../redux/meetUps/meetUpsSlice';
import Pagination from '../components/Pagination';
import { IoArrowBackCircleOutline } from 'react-icons/io5'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Loader from '../components/Loader';



function FieldInfo({selectedField, setSelectedField, handleAddTeammate, locations}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const loggedInPlayer = useSelector(selectLoggedInPlayer)
    const [date, setDate] = useState("");
    const [sportInput, setSportInput] = useState();
    const [formToggle, setFormToggle] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(1);
    const [amountOfMeetUps] = useState(5);
    const [loading, setLoading] = useState(false);

    // loader functionality
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        },2000)
    },[])

   
    // fetch individual field
    const individualField = useSelector(selectFieldById);
    useEffect(() => {
        dispatch(fetchFieldById(id))
    },[dispatch])
    
    if (individualField === undefined) return null;
     
    // pagination variables and values
    const indexOfLastCard = currentSlide * amountOfMeetUps;
    const indexOfFirstCard = indexOfLastCard - amountOfMeetUps;
    // // change slides functionalities
    const nextSlide = () => setCurrentSlide(currentSlide + 1);
    const previousSlide = () => setCurrentSlide(currentSlide - 1);
    const end = indexOfLastCard >= individualField.meet_ups.length
    const beginning = currentSlide === 1;
    
    const createMeetUp = () => {
        //e.preventDefault()
        const newMeetUp = {
            "date": date,
            "field_id": individualField.id,
            "sport_id": sportInput,
            "player_id": loggedInPlayer.id
        }
        dispatch(addNewMeetUp(newMeetUp))
            .then(() => {
                dispatch(fetchFieldById(id));
            })
        setFormToggle(false);
    };
    
 
    const handleFormToggle = () => {
        setFormToggle(true)
    }
  return (
    <Container>
        <NavBar locations={locations}/>
        {loading ? 
            <Loader />
        :
        <>
            <h1 className="field-info-title">{individualField.field_name}:</h1>
            <button className="back-btn" onClick={() => navigate(-1)}>
                <IoArrowBackCircleOutline />
            </button>
            <div className="meet-ups-list">{individualField.meet_ups.slice(indexOfFirstCard, indexOfLastCard).map((meetUp) => 
                (
                    <FieldMeetUpList 
                        meetUp={meetUp}
                        key={meetUp.id}
                        selectedField={selectedField}
                        setSelectedField={setSelectedField}
                        loggedInPlayer={loggedInPlayer}
                        handleAddTeammate={handleAddTeammate}
                    />
                )
            )}
            </div>
            <div id="pagination">
                <Pagination 
                    displayNum={true}
                    amount={amountOfMeetUps}
                    next={nextSlide}
                    prev={previousSlide}
                    total={individualField.meet_ups.length}
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
                {formToggle ? <Form className='new-mu-form'>
                    <h3>Create a Meet Up</h3> 
                    <input fluid type="datetime-local" name="date" value={date}onChange={(e) => setDate(e.target.value)}/>
                    <select onChange={(e) => setSportInput(e.target.value)}>
                        <option >Pick a Sport</option>
                        {loggedInPlayer.location.sports.map((sport) => (
                            <option value={sport.id}>{sport.sport_type}</option>
                        ))}
                    </select><br></br>
                    <button 
                        className="create"
                        type="button" 
                        value="Create Meet Up" 
                        onClick={() => {
                            createMeetUp()}}
                    >Create</button>
                    <button className="close-form" type='button' onClick={() => setFormToggle(false)}>
                        <AiOutlineCloseCircle />
                    </button>
                </Form> : null}
            </div>
        </>
        }
    </Container>
  )
}

const Container = styled.div`
    .field-info-title {
        color: rgb(12, 12, 12);
        text-align: center;
        font-size: 5rem;
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
            color: black;
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
        top: 17rem;
        left: 97%;
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
    #pagination {
        margin-top: 5rem;
    }
`;

export default FieldInfo;