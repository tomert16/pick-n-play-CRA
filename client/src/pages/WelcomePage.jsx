import NavBar from "../components/NavBar";
import LocationCard from "../components/LocationCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllLocations, selectAllLocations } from "../redux/locations/locationsSlice";
import { useEffect } from "react";

function WelcomePage({ loggedInPlayer }) {
  const dispatch = useDispatch();

  // fetch all locations
  const locations = useSelector(selectAllLocations);
  useEffect(() => {
    dispatch(fetchAllLocations())
  }, [dispatch])
  // if (locations === undefined) return null;

  return (
    <div>
      <NavBar loggedInPlayer={loggedInPlayer} locations={locations}/>
      <h1 className='home-prompt'>Welcome to Pick N' Play {loggedInPlayer.first_name}!</h1>
      <h2 className='home-location'>Pick Your Location:</h2>
      <div className="locations-list">{locations.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}</div>
      
    </div>
  )
}





export default WelcomePage;