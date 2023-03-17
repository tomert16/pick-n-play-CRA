import {useNavigate} from 'react-router-dom'
function LocationCard({ location }){
    const navigate = useNavigate();
  return (
    <div>
        <div onClick={() => navigate('/home')}>
            <h3>{location.state}</h3>
            {/* {location.sports.map((sport) => {
                return <h4>{sport.sport_type}</h4>
            })} */}
        </div>
       
    </div>
  )
}

export default LocationCard