import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import FieldMeetUpList from './FieldMeetUpList';
import NavBar from './NavBar';
import SportDropdownFilter from './SportDropdownFilter';
import { Form } from "semantic-ui-react";

function FieldInfo({selectedField, loggedInPlayer, sports, fields, setSelectedField}) {
    const navigate = useNavigate();
    const [date, setDate] = useState("");
    const [sportInput, setSportInput] = useState();
    const [fieldMeetUps, setFieldMeetUps] = useState();
    const [sportFilter, setSportFilter] = useState("all");
    const [formToggle, setFormToggle] = useState(false);

    // const field = fields.map((field) => {
    //     return field.id
    // })  
    // const filterFields = field.filter((field) => {
    //     return selectedField.id === field.id
    // })  
    // console.log(field)
    // console.log(fields)
    useEffect(() => {
        const fetchFieldMeetUps = () => {
            fetch(`/fields/${selectedField.id}`)
            .then ((r) => r.json())
            .then((data) => setFieldMeetUps(data.meet_ups))
        }
        fetchFieldMeetUps()
    },[selectedField.id]);
    
  console.log(fieldMeetUps)
    const createMeetUp = () => {
        //e.preventDefault()
        const newMeetUp = {
            "date": new Date(date),
            "field_id": selectedField.id,
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
    
    const sportsDropdownFilter = fieldMeetUps?.filter((field) => {
        if (sportFilter === 'all') return true;
        return field.sport.type.toLowerCase() === sportFilter.toLowerCase();
    })
    const handleFormToggle = () => {
        setFormToggle(true)
    }
  return (
    <div>
        <NavBar loggedInPlayer={loggedInPlayer}/>
        <h1 className="field-info-title">{selectedField?.field_name} meet ups:</h1>
        <SportDropdownFilter sportFilter={sportFilter} setSportFilter={setSportFilter}/>
        <div className="meet-ups-list">{sportsDropdownFilter?.map((meetUp) => {
            return (
                <FieldMeetUpList 
                    meetUp={meetUp}
                    key={meetUp.id}
                    fieldMeetUps={fieldMeetUps}
                    setFieldMeetUps={setFieldMeetUps}
                    selectedField={selectedField}
                    setSelectedField={setSelectedField}
                    loggedInPlayer={loggedInPlayer}
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
                    <option value={sports[0]?.id}>Soccer</option>
                    <option value={sports[1]?.id}>Basketball</option>
                    <option value={sports[2]?.id}>Tennis</option>
                    <option value={sports[3]?.id}>Football</option>
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