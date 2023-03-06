import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import FieldMeetUpList from './FieldMeetUpList';

function FieldInfo({selectedField, loggedInPlayer, sports, fields, setSelectedField}) {
    const navigate = useNavigate();
    const [date, setDate] = useState("");
    const [sportInput, setSportInput] = useState();
    const [fieldMeetUps, setFieldMeetUps] = useState();
    // const [meetups, setMeet] = useState([])
    

    const field = fields.map((field) => {
        return field.id
    })  
    // const filterFields = field.filter((field) => {
    //     return selectedField.id === field.id
    // })  
    // console.log(field)
    // console.log(fields)
    const fetchFieldMeetUps = async() => {
        const req = await fetch(`fields/${selectedField.id}`)
        const resp = await req.json()
        setFieldMeetUps(resp.meet_ups)
    };
    useEffect(() => {
        fetchFieldMeetUps()
    },[])
    

    const createMeetUp = (e) => {
        e.preventDefault()
        const newMeetUp = {
            "date": new Date(date),
            "field_id": selectedField.id,
            "sport_id": parseInt(sportInput),
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
    const handleBackClick = () => {
        navigate('/home')
      }

  return (
    <div>
        <h2>{fieldMeetUps?.field_name}</h2>
        <div>{fieldMeetUps?.map((meetUp) => {
            return (
                <FieldMeetUpList 
                    meetUp={meetUp}
                    key={meetUp.id}
                    selectedField={selectedField}
                    setSelectedField={setSelectedField}
                />
            )
        })}</div>
        <form >
            <input type="datetime-local" name="date" value={date}onChange={(e) => setDate(e.target.value)}/>
            <select onChange={(e) => setSportInput(e.target.value)}>
                <option >Pick a Sport</option>
                <option value={sports[0]?.id}>Soccer</option>
                <option value={sports[1]?.id}>Basketball</option>
                <option value={sports[2]?.id}>Tennis</option>
                <option value={sports[3]?.id}>Football</option>
            </select>
            <input 
                type="submit" 
                value="Create Meet Up" 
                onSubmit={() => {
                    createMeetUp()}}
            />
        </form>
         <button type='button' onClick={handleBackClick}>Back</button>
    </div>
  )
}

export default FieldInfo;