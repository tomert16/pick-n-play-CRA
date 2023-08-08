import { format, set } from 'date-fns'
import { useState, useEffect } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { joinMeetUp } from '../../redux/meetUps/meetUpsSlice';
import { toast } from 'react-toastify';
import { fetchSportById } from '../../redux/sports/sportsSlice';


function MeetUpCard({ loggedInPlayer, meetUp, setShowMeetUp}) {
    const {id} = useParams();
    const dispatch = useDispatch();
    // const [joinToggle, setJoinToggle] = useState(true);
    // toastify animation

   
    const totalPlayers = meetUp.teammates.length + 1;
    const isMeetUpFull = 
        (meetUp.sport.sport_type === 'Soccer' && totalPlayers >= 14) ||
        (meetUp.sport.sport_type === 'Basketball' && totalPlayers >= 10) ||
        (meetUp.sport.sport_type === 'Tennis' && totalPlayers >= 4) ||
        (meetUp.sport.sport_type === 'Football' && totalPlayers >= 10) ||
        (meetUp.sport.sport_type === 'Volleyball' && totalPlayers >= 10) ||
        (meetUp.sport.sport_type === 'Hockey' && totalPlayers >= 10)



    const handleJoinTeam = () => {
        const join = {
          "meet_up_id": meetUp.id,
          "player_id": loggedInPlayer.id
        };
        dispatch(joinMeetUp(join))
          .then(() => {
            dispatch(fetchSportById(id))
          })
      };

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
            window.location.reload()
          } else {
            alert("Drop request cancelled");
          }
      }

  

    const handleBackClick = () => {
        setShowMeetUp(false)
    }

  return (
    <Container >
        <Card className="meet-up-card">
          <CardMedia
            sx={{ height: 300 }}
            image={meetUp.field.img_url}
            title="meet-up"
          />
          <CardContent>
            <button className="close" type='button' onClick={() => handleBackClick()}>
              <AiOutlineCloseCircle />
            </button>
            <Typography gutterBottom variant="h5" component="div">
            {meetUp.field.name}
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
            {!isMeetUpFull ? <Button size="small" onClick={() => handleJoinTeam()}>Join</Button>
              :
              <p>Full</p>}
            <Button size="small" onClick={() => handleDropMeetUp()}>Leave</Button>
          </CardActions>
        </Card>
    </Container>
  )
}

const Container = styled.div`
    border-style: solid;
    border-radius: 3px;
    border-color: black;
    cursor: pointer;
    position: relative;
    background: rgba(0,0,0,.5);
    height: 100vh;
    left: 0;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 1000;
    overflow-x: scroll;
    text-align: center;
  .meet-up-card{
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
`;

export default MeetUpCard;