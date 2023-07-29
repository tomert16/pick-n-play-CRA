import { useState, useEffect } from 'react'
import FieldMeetUpList from './FieldMeetUpList';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

function FieldMeetUpCard({meetUp, loggedInPlayer, setShowMeetUp, fieldMeetUps, setFieldMeetUps}) {
  const [joinToggle, setJoinToggle] = useState(true);
  const handleBackClick = () => {
    setShowMeetUp(false)
  }
  const handleJoinTeam = () => {
    const join = {
      "meet_up_id": meetUp.id,
      "player_id": loggedInPlayer.id
    }
  
    fetch('/join_meet_up', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(join)
    })
      .then((resp) => resp.json())
      .then((newTeammate) => {
        const updatedMeetUps = fieldMeetUps.map((mu) => {
          if (mu.id === meetUp.id) {
            return {
              ...mu,
              teammates: [...mu.teammates, `${loggedInPlayer.first_name} ${loggedInPlayer.last_name}`]
            }
          }
          return mu
        })
        setFieldMeetUps(updatedMeetUps)
      })
  }

  const handleDropMeetUp = (id) => {
    fetch(`/player_meet_ups/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "meet_up_id": meetUp.id,
        "player_id": loggedInPlayer.id
      })
    })
      .then(data => {
        // Filter out the deleted player from the meetUps state
        const updatedMeetUps = fieldMeetUps.map(meetUp => {
          return {
            ...meetUp,
            teammates: meetUp.teammates.filter(teammate => teammate.id !== id)
          }
        });
  
        // Update the meetUps state with the new data
        setFieldMeetUps(updatedMeetUps);
        alert("Meet Up Dropped!");
      })
      .catch(error => {
        console.error("Error deleting player:", error);
      });
  }

  
  const totalPlayers = meetUp?.teammates.length + 1;
  useEffect(() => {
      if (meetUp?.sport.type === 'Soccer' && totalPlayers >= 14){
          console.log('full meet up', meetUp.teammates.length);
          setJoinToggle(!joinToggle)
      }else if (meetUp?.sport.type === 'Basketball' && totalPlayers >= 10){
          console.log('full meet up', meetUp.teammates.length);
          setJoinToggle(!joinToggle)
      }else if (meetUp?.sport.type === 'Tennis' && totalPlayers >= 4){
          console.log('full meet up', meetUp.teammates.length);
          setJoinToggle(!joinToggle)
      }else if (meetUp?.sport.type === 'Football' && totalPlayers >= 10){
          console.log('full meet up', meetUp.teammates.length);
          setJoinToggle(!joinToggle)
      }
  },[])

  return (
    <Container>
      <Card className="field-meet-up-card">
      <CardMedia
        sx={{ height: 300 }}
        image={meetUp.sport.image}
        title="Meet Up"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {meetUp.sport.type}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {meetUp.date}<br></br>
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Total Players: {totalPlayers}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <li>{meetUp.player.name}</li>
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {meetUp.teammates.map((player) => (<li className="teammates">{player}</li>))}
        </Typography>
      </CardContent>
      <CardActions>
        {joinToggle ? <Button size="small" onClick={() => handleJoinTeam(loggedInPlayer)}>Join</Button>
          :
          <p>Full</p>}
        <Button size="small" onClick={() => {
          handleDropMeetUp()
          window.location.reload()
          }}>Leave</Button>
        <button className="back-btn" type='button' onClick={() => handleBackClick()}>X</button>
      </CardActions>
    </Card>
    </Container>
  )
}

const Container = styled.div`
    border-style: solid;
    border-radius: 3px;
    border-color: black;
    text-align: center;
    cursor: pointer;
    position: relative;
    background: rgba(0,0,0,.5);
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    overflow-x: scroll;
    .field-meet-up-card {
      background-color: white;
      border-style: solid;
      border-radius: 10px;
      justify-content: center;
      position: relative;
      left: 37%;
      top: 15pc;
      height: max-content;
      width: 30%;
    }
`;

export default FieldMeetUpCard;