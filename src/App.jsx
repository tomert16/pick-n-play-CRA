import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import { useState, useEffect } from "react";
import './App.css';
import Home from "./components/Home"
import SportInfo from "./components/SportInfo";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MeetUpCard from "./components/MeetUpCard";
import Account from "./components/Account";
import FieldInfo from "./components/FieldInfo";
import FieldMeetUpCard from "./components/FieldMeetUpList";
import { set } from "date-fns";
import Map2 from "./components/Map2";

function App() {
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState();
  const [meetUps, setMeetUps] = useState([]);
  const [loggedInPlayer, setLoggedInPlayer] = useState();
  const [selectedMeetUp, setSelectedMeetUp] = useState();
  const [playerInfo, setPlayerInfo] = useState([]);
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState();
  const [meetUpTeammates, setMeetUpTeammates] = useState([])

  /// OL map api 
  const [center, setCenter] = useState([-73.97, 40.72]);
  const [zoom, setZoom] = useState(13);
  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);
  const [showLayer3, setShowLayer3] = useState(true);
  const [showLayer4, setShowLayer4] = useState(true);

  useEffect(() => {
    const fetchMeetUps = () => {
        fetch(`/meet_ups`)
        .then ((r) => r.json())
    .then((data) => setMeetUps(data))
    }
    fetchMeetUps()
  },[])
   // fetch all sports 
   function fetchSports() {
    fetch('/sports')
    .then ((r) => r.json())
    .then((data) => setSports(data))
};
useEffect(() => {
    fetchSports();
},[]);
  
  
  // if (!meetUps.length === 0) return null;
  //auto-login function
  useEffect(() =>{
    fetch('/me')
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => setLoggedInPlayer(user))
      }
    });
  },[]);

  
  
console.log(sports)

  function handleSelectedSport(sports) {
    setSelectedSport(sports)
}
  const handleAddTeammate = (newTeammate) => {
    const newTeammateArray = [...meetUps, newTeammate]
    setMeetUps(newTeammateArray)
  }
  //if(!setLoggedInPlayer)  return <Login setLoggedInPlayer={setLoggedInPlayer} />

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
        fields={fields}
        setFields={setFields}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        handleSelectedSport={handleSelectedSport}
      />
    },
    {
      path: '/profile',
      element: <Account 
        loggedInPlayer={loggedInPlayer}
        meetUps={meetUps}
        playerInfo={playerInfo}
        setPlayerInfo={setPlayerInfo}
        meetUpTeammates={meetUpTeammates}
        setMeetUpTeammates={setMeetUpTeammates}
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
        selectedMeetUp={selectedMeetUp}
        setSelectedMeetUp={setSelectedMeetUp}
        fields={fields}
        setFields={setFields}
        handleAddTeammate={handleAddTeammate}
        handleSelectedSport={handleSelectedSport}
      />
    },
    // {
    //   path: `/meetup`,
    //   element: <MeetUpCard 
    //     meetUps={meetUps} 
    //     setMeetUps={setMeetUps}
    //     selectedMeetUp={selectedMeetUp}
    //     setSelectedMeetUp={setSelectedMeetUp}
    //     loggedInPlayer={loggedInPlayer}
    //     />
    // },
    {
      path: '/fieldinfo',
      element: <FieldInfo 
        // fieldMeetUps={fieldMeetUps}
        // setFieldMeetUps={setFieldMeetUps}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        sports={sports}
        loggedInPlayer={loggedInPlayer}
        fields={fields}
        meetUps={meetUps}
        setMeetUps={setMeetUps}

      />
    },
    {
      path: '/fieldmeetup',
      element: <FieldMeetUpCard />
    },
    {
      path: '/map',
      element: <Map2 
        center={center}
        setCenter={setCenter}
        zoom={zoom}
        setZoom={setZoom}
        showLayer1={showLayer1}
        setShowLayer1={setShowLayer1}
        showLayer2={showLayer2}
        setShowLayer2={setShowLayer2}
        showLayer3={showLayer3}
        showLayer4={showLayer4}
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
