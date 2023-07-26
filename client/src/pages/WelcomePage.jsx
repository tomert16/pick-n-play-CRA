import NavBar from "../components/NavBar";
import LocationCard from "../components/LocationCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllLocations, selectAllLocations } from "../redux/locations/locationsSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { selectLoggedInPlayer, stayLoggedIn } from "../redux/players/playersSlice";

function WelcomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get logged in user info
  const loggedInPlayer = useSelector(selectLoggedInPlayer);

  // useEffect(() => {
  //   const fetchLoggedInCustomer = async () => {
  //     try {
  //       await dispatch(stayLoggedIn());
  //     } catch (error) {
  //       console.log('Error:', error);
  //     }
  //   };
  //   fetchLoggedInCustomer()
  // },[dispatch])
  console.log(loggedInPlayer)
  // fetch all locations
  const locations = useSelector(selectAllLocations);
  useEffect(() => {
    dispatch(fetchAllLocations());
  }, [dispatch])
  
  if (loggedInPlayer === undefined) return null;
  
  return (
    <Container>
      <NavBar loggedInPlayer={loggedInPlayer} locations={locations}/>
      <h1 className='home-prompt'>Welcome to Pick N' Play {loggedInPlayer && loggedInPlayer.first_name}!</h1>
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
  .home-prompt {
  font-size: 60px;
  color: rgb(12, 12, 12);
  text-align: center;
  font-size: 5pc;
  font-family: "Ultra", serif;
  background-color: transparent;
  text-shadow: 2px 2px 3px rgb(255, 205, 98);
}
`;



export default WelcomePage;