import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FieldMeetUpList from './FieldMeetUpList';
import NavBar from './NavBar';
import SportDropdownFilter from './SportDropdownFilter';
import { Form } from "semantic-ui-react";

function FieldInfo({selectedField, loggedInPlayer, setSelectedField, handleAddTeammate, individualLocation, locations}) {
    const [date, setDate] = useState("");
    const [sportInput, setSportInput] = useState();
    const [individualField, setIndividualField] = useState();
    const [fieldMeetUps, setFieldMeetUps] = useState();
    const [sportFilter, setSportFilter] = useState("all");
    const [formToggle, setFormToggle] = useState(false);
    const { id } = useParams();
   
    useEffect(() => {
        async function fetchIndividualField() {
            const req = fetch(`/fields/${id}`)
            const resp = await req;
            const parsed = await resp.json()
            setIndividualField(parsed)
        }
        fetchIndividualField()
    },[]);

    useEffect(() => {
        async function fetchFieldMeetUps() {
            const req = fetch(`/fields/${id}`)
            const resp = await req;
            const parsed = await resp.json()
            setFieldMeetUps(parsed.meet_ups)
        }
        fetchFieldMeetUps()
    },[]);

    if (individualField === undefined){
        return null;
    }
    if (fieldMeetUps === undefined){
        return null;
    }
    
  console.log(fieldMeetUps)
    const createMeetUp = () => {
        //e.preventDefault()
        const newMeetUp = {
            "date": new Date(date),
            "field_id": individualField.id,
            "sport_id": sportInput,
            "player_id": loggedInPlayer.id
        }

        fetch('/meet_ups',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newMeetUp)
        }) .then((r) => {
            if (r.ok) {
                r.json() .then((meetUp) => setFieldMeetUps([...fieldMeetUps, meetUp]))
            }
        })
    };
    
    const sportsDropdownFilter = fieldMeetUps.filter((field) => {
        if (sportFilter === 'all') return true;
        return field.sport.type.toLowerCase() === sportFilter.toLowerCase();
    })
    const handleFormToggle = () => {
        setFormToggle(true)
    }
  return (
    <div>
        <NavBar loggedInPlayer={loggedInPlayer} individualLocation={individualLocation} locations={locations}/>
        <h1 className="field-info-title">{individualField.field_name} meet ups:</h1>
        {/* <SportDropdownFilter sportFilter={sportFilter} setSportFilter={setSportFilter} /> */}
        <div className="meet-ups-list">{sportsDropdownFilter.map((meetUp) => {
            return (
                <FieldMeetUpList 
                    meetUp={meetUp}
                    key={meetUp.id}
                    fieldMeetUps={fieldMeetUps}
                    setFieldMeetUps={setFieldMeetUps}
                    selectedField={selectedField}
                    setSelectedField={setSelectedField}
                    loggedInPlayer={loggedInPlayer}
                    handleAddTeammate={handleAddTeammate}
                />
            )
        })}</div>
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
                    <option value={individualLocation.sports[0].id}>Soccer</option>
                    <option value={individualLocation.sports[1].id}>Basketball</option>
                    <option value={individualLocation.sports[2].id}>Tennis</option>
                    <option value={individualLocation.sports[3].id}>Football</option>
                </select><br></br>
                <button 
                    type="button" 
                    value="Create Meet Up" 
                    onClick={() => {
                        createMeetUp()}}
                >Create</button>
                 <button className="back-btn" type='button' onClick={() => setFormToggle(false)}>X</button>
            </Form> : null}
        </div>
    </div>
  )
}

export default FieldInfo;