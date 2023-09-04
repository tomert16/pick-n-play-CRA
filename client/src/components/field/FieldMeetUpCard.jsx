import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { joinMeetUp} from '../../redux/meetUps/meetUpsSlice';
import { fetchFieldById } from '../../redux/fields/fieldsSlice';
import PropTypes from 'prop-types';


function FieldMeetUpCard({meetUp, loggedInPlayer, setShowMeetUp, isMeetUpFull, totalPlayers}) {
  const dispatch = useDispatch();
  const {id} = useParams();
  const [error, setError] = useState();
  
  const handleBackClick = () => {
    setShowMeetUp(false)
  }
  const handleJoinTeam = () => {
    const join = {
      "meet_up_id": meetUp.id,
      "player_id": loggedInPlayer.id
    }
    if (loggedInPlayer.id !== meetUp.player.id) {
      dispatch(joinMeetUp(join))
        .then(() => {
          dispatch(fetchFieldById(id));
        })
    } else {
      setError('You are already in this meet up.');
    }
  }

  const handleDropMeetUp = (id) => {
    let text = "Are you sure you want to leave this meet up?"
    if (window.confirm(text) === true) {
      text = "Drop successfull";
      fetch(`/player_meet_ups/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "meet_up_id": meetUp.id,
          "player_id": loggedInPlayer.id
        })
      })
      alert(text);
      window.location.reload();
    } else {
      alert("Drop request cancelled");
    }
  };

      console.log(typeof setShowMeetUp)

  return (
    <Container>
      <Card className="field-meet-up-card">
      <CardMedia
        sx={{ height: 300 }}
        image={meetUp.sport.image}
        title="Meet Up"
      />
      <CardContent>
        <button className="close" type='button' onClick={() => handleBackClick()}>
              <AiOutlineCloseCircle />
        </button>
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
        {error && <Typography variant="body2" color="text.secondary" className='error-message'>
              {error}
            </Typography>}
      </CardContent>
      <CardActions>
        {!isMeetUpFull ? <Button size="small" onClick={() => handleJoinTeam()}>Join</Button>
          :
          <p>Full</p>}
        <Button size="small" onClick={() => handleDropMeetUp()}>Leave</Button>
      </CardActions>
    </Card>
    </Container>
  )
}

FieldMeetUpCard.propTypes = {
  meetUp: PropTypes.object.isRequired,
  loggedInPlayer: PropTypes.object.isRequired,
  setShowMeetUp: PropTypes.func.isRequired,
  isMeetUpFull: PropTypes.bool.isRequired,
  totalPlayers: PropTypes.number.isRequired
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
      position: absolute;
      left: 35%;
      top: 15%;
      height: max-content;
      width: 30%;
    }
    .close {
      border: none;
      background-color: transparent;
      position: relative;
      top: -1rem;
      left: 48%;
      z-index: 1;
      svg {
        font-size: 2rem;
        color: #000000;
      }
  }
  .error-message {
    color: red;
  }
`;

export default React.memo(FieldMeetUpCard);