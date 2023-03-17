import NavBar from "./NavBar";
import LocationCard from "./LocationCard";

function WelcomePage({ locations, loggedInPlayer }) {
  return (
    <div>
      <NavBar loggedInPlayer={loggedInPlayer} />
      <h1>Welcome to Pick N' Play {loggedInPlayer.first_name}!</h1>
      <h2>Pick Your Location</h2>
      {locations.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </div>
  )
}

export default WelcomePage;