import NavBar from "../components/NavBar";
import LocationCard from "../components/LocationCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllLocations, selectAllLocations } from "../redux/locations/locationsSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { selectLoggedInPlayer } from "../redux/players/playersSlice";

function WelcomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get logged in user info
  const loggedInPlayer = useSelector(selectLoggedInPlayer);
  // fetch all locations
  const locations = useSelector(selectAllLocations);
  useEffect(() => {
    dispatch(fetchAllLocations());
  }, [dispatch])
  
  if (loggedInPlayer === undefined) return null;
  
  return (
    <Container>
      <NavBar loggedInPlayer={loggedInPlayer} locations={locations}/>
      <h1 className='home-prompt'>Welcome to Pick N' Play {loggedInPlayer.first_name}!</h1>
      <h2 className='home-location'>Pick Your Location:</h2>
      <div className="locations-list">{locations.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}</div>
      
    </Container>
  )
}

const Container = styled.div`
  .locations-list {
    display:grid;
    grid-template-columns: repeat(auto-fit, minMax(10rem, 20rem));
    grid-gap: 3rem;
    font-family: "Ultra", serif;
    justify-content: center;
  }
`;



export default WelcomePage;