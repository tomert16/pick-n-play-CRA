import { format, set } from 'date-fns'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function MeetUpCard({ selectedMeetUp, setSelectedMeetUp, loggedInPlayer }) {
    const navigate = useNavigate();
    const [teammates, setTeammates] = useState([]);
    const [joinToggle, setJoinToggle] = useState(true);
    // console.log(selectedMeetUp.sport.sport_type)

    // const fetchTeammates = async() => {
    //     const req = await fetch('/player_meet_ups');
    //     const resp = await req.json();
    //     setSelectedMeetUp.player_meet_ups(resp);
    // };

    // useEffect(() => {
    //     fetchTeammates()
    // },[])

        const handleJoinTeam = () => {
            const join = {
                "meet_up_id": selectedMeetUp.id,
                "player_id": loggedInPlayer.id
            }
    
            fetch (`/join_meet_ups`, 
            {method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(join)
        }).then((resp) => {
                if (resp.ok) {
                    resp.json() .then((teammate) => setSelectedMeetUp([...selectedMeetUp.player_meet_ups, teammate]))

                }
            })
        }
        

    const handleDropMeetUp = () => {
        fetch (`/drop_meet_up`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                "meet_up_id": selectedMeetUp.id,
                "player_id": loggedInPlayer.id
            })
        })
        navigate('/sportinfo')
        alert("Meet Up Dropped!")
    }

    const handleBackClick = () => {
        navigate('/sportinfo')
    }

useEffect(() => {
    const totalPlayers = selectedMeetUp.player_meet_ups.length + 1;

    if (selectedMeetUp.sport.sport_type === 'Soccer' && totalPlayers >= 14){
        console.log('full meet up', selectedMeetUp.player_meet_ups.length);
        setJoinToggle(!joinToggle)
    }else if (selectedMeetUp.sport.sport_type === 'Basketball' && totalPlayers >= 10){
        console.log('full meet up', selectedMeetUp.player_meet_ups.length);
        setJoinToggle(!joinToggle)
    }else if (selectedMeetUp.sport.sport_type === 'Tennis' && totalPlayers >= 4){
        console.log('full meet up', selectedMeetUp.player_meet_ups.length);
        setJoinToggle(!joinToggle)
    }else if (selectedMeetUp.sport.sport_type === 'Football' && totalPlayers >= 10){
        console.log('full meet up', selectedMeetUp.player_meet_ups.length);
        setJoinToggle(!joinToggle)
    }
},[])
  return (
    <div>
        <div>{selectedMeetUp.date}</div>
        <img src={selectedMeetUp.field.img_url} />
        <div>{selectedMeetUp.field.name}</div>
        <div>{selectedMeetUp.player.name}</div> 

        <div>{selectedMeetUp.player_meet_ups.map((player) => (<div key={player.id}>{player.player.name}</div>))}</div>
        {joinToggle ? <form onSubmit={(e) => {
            e.preventDefault()
            handleJoinTeam()}}>
            <input type='submit' value='Join Meet Up'/>
        </form>
         :
        <p>Full</p>}
        <button type='button' onClick={handleDropMeetUp}>Drop Meet Up</button>
        <button type='button' onClick={handleBackClick}>Back</button>
    </div>
  )
}

export default MeetUpCard