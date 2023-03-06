import { useNavigate } from 'react-router-dom';

function NavBar({ loggedInPlayer, setLoggedInPlayer }) {
    const navigate = useNavigate();

     // Logout function 
     function handleLogout(){
        fetch ('/logout',{
            method: "DELETE"
        }).then((r) => {
            if (r.ok){
                navigate('/')
                setLoggedInPlayer(null)
            }
        })
    }

  return (
    <div class="nav-bar">
        <button onClick={() => navigate('/profile')}>Profile</button>
        <h3>Welcome, {loggedInPlayer?.first_name}</h3>
        <button type="button" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default NavBar;