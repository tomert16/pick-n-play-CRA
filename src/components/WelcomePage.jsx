import NavBar from "./NavBar";
import LocationCard from "./LocationCard";


function WelcomePage({ locations, loggedInPlayer }) {
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