import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home"

import './App.css';
import SportInfo from "./components/SportInfo";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState();
  const [meetUps, setMeetUps] = useState([]);
  const [loggedInPlayer, setLoggedInPlayer] = useState(null);

  

   //auto-login function
   useEffect(() =>{
    fetch('/me')
    .then((r) => {
        if (r.ok) {
            r.json().then((user) => setLoggedInPlayer(user))
        }
    });
},[]);
if(!setLoggedInPlayer)  return <Login setLoggedInPlayer={setLoggedInPlayer} />
  

  // All of the web routes
  const router = createBrowserRouter([
    {
      path: "*",
      element: <div>404 NOT FOUND</div>
    },
    {
      path: "/",
      element:  <Login 
        loggedInPlayer={loggedInPlayer} 
        setLoggedInPlayer={setLoggedInPlayer}
      />
    },
    {
      path: "/signup",
      element: <Signup loggedInPlayer={loggedInPlayer} setLoggedInPlayer={setLoggedInPlayer}/>
    },
    {
      path: "/home",
      element: <Home 
        loggedInPlayer={loggedInPlayer}
        sports={sports} 
        setSports={setSports}
        selectedSport={selectedSport}
        setSelectedSport={setSelectedSport}
      />
    },
    {
      path: "/sportinfo",
      element: <SportInfo 
        sports={sports} 
        setSports={setSports}
        selectedSport={selectedSport}
        setSelectedSport={setSelectedSport}
        meetUps={meetUps}
        setMeetUps={setMeetUps} 
        loggedInPlayer={loggedInPlayer}
      />
    }
  ])
  return (
    <div>
      <div>
        <title>Pick n' Play</title>
      </div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
