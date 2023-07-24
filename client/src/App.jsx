import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import { useState, useEffect } from "react";
import './App.css';
import Home from "./pages/Home"
import SportInfo from "./pages/SportInfo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import WelcomePage from "./pages/WelcomePage";
import Account from "./pages/Account";
import FieldInfo from "./pages/FieldInfo";
import Landing from "./pages/Landing";
// import Map2 from "./components/map/Map2";

function App() {
  const [selectedSport, setSelectedSport] = useState();
  const [meetUps, setMeetUps] = useState();
  const [loggedInPlayer, setLoggedInPlayer] = useState();
  const [selectedMeetUp, setSelectedMeetUp] = useState();
  const [playerInfo, setPlayerInfo] = useState([]);
  // const [fields, setFields] = useState();
  const [selectedField, setSelectedField] = useState();
  const [meetUpTeammates, setMeetUpTeammates] = useState([])
  // const [locations, setLocations] = useState()
  const [individualLocation, setIndividualLocation] = useState();
  
  /// OL map api 
  // const [center, setCenter] = useState([-73.97, 40.72]);
  // const [zoom, setZoom] = useState(13);
  // const [showLayer1, setShowLayer1] = useState(true);
  // const [showLayer2, setShowLayer2] = useState(true);
  // const [showLayer3, setShowLayer3] = useState(true);
  // const [showLayer4, setShowLayer4] = useState(true);

  useEffect(() =>{
    fetch('/me')
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => setLoggedInPlayer(user))
      }
    });
  },[]);

  // useEffect(() => {
  //   async function fetchLocations(){
  //     const req = fetch('/locations');
  //     const resp = await req;
  //     const parsed = await resp.json();
  //     setLocations(parsed)
  //   }
  //   fetchLocations();
  // },[])

  // useEffect(() => {
  //   async function fetchSports() {
  //     const req = fetch('/sports');
  //     const resp = await req;
  //     const parsed = await resp.json();
  //     setSports(parsed)
  //   }
  //   fetchSports();
  // },[])
  
  // useEffect(() => {
  //   async function fetchField() {
  //     const req = fetch('/fields');
  //     const resp = await req;
  //     const parsed = await resp.json();
  //     setFields(parsed);
  //   }
  //   fetchField();
  // },[])

  

  // if (sports === undefined) {
  //   return null;
  // }

  // if (fields === undefined) {
  //   return null;
  // }

  // if (locations === undefined) {
  //   return null;
  // }
  
  



  // const handleAddTeammate = (newTeammate) => {
  //   const newTeammateArray = [...meetUps, newTeammate]
  //   setMeetUps(newTeammateArray)
  // }

  // const handleAddTeammate = (selected, newTeammate) => {
  //   // debugger
  //   const newMeetUps = meetUps.map((meetUp) => {
  //     if (meetUp.id === selected.meet_up_id) {
  //       return {
  //         ...meetUp, 
  //         teammates: [...meetUp.teammates, newTeammate]
  //       };
  //     } else {
  //       return meetUp;
  //     }
  //   });
  //   setMeetUps(newMeetUps)
  // }
  //if(!setLoggedInPlayer)  return <Login setLoggedInPlayer={setLoggedInPlayer} />

  // All of the web routes
  const router = createBrowserRouter([
    {
      path: "*",
      element: <div>404 NOT FOUND</div>
    },
    {
      path: "/",
      element:  <Landing loggedInPlayer={loggedInPlayer}/>
    },
    {
      path: "/login",
      element: <Login setLoggedInPlayer={setLoggedInPlayer}/>
    },
    {
      path: "/signup",
      element: <Signup loggedInPlayer={loggedInPlayer} setLoggedInPlayer={setLoggedInPlayer}/>
    },
    {
      path: "/welcome",
      element: <WelcomePage 
        // locations={locations}
        // setLocations={setLocations}
        loggedInPlayer={loggedInPlayer}
      />
    },
    {
      path: "/locations/:id",
      element: <Home 
        loggedInPlayer={loggedInPlayer}
        selectedSport={selectedSport}
        setSelectedSport={setSelectedSport}
        // fields={fields}
        // setFields={setFields}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        // locations={locations}
        individualLocation={individualLocation}
        setIndividualLocation={setIndividualLocation}
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
        // locations={locations}
      />
    },
    {
      path: `/sports/:id`,
      element: <SportInfo 
        // sports={sports} 
        // setSports={setSports}
        selectedSport={selectedSport}
        setSelectedSport={setSelectedSport}
        meetUps={meetUps}
        setMeetUps={setMeetUps} 
        loggedInPlayer={loggedInPlayer}
        selectedMeetUp={selectedMeetUp}
        setSelectedMeetUp={setSelectedMeetUp}
        // fields={fields}
        // setFields={setFields}
        // locations={locations}
        individualLocation={individualLocation}
        // handleAddTeammate={handleAddTeammate}
        // handleSelectedSport={handleSelectedSport}
      />
    },
    // {
    //   path: `/sports/:id/meet_ups/:id`,
    //   element: <MeetUpCard 
    //     />
    // },
    {
      path: '/fields/:id',
      element: <FieldInfo 
        // fieldMeetUps={fieldMeetUps}
        // setFieldMeetUps={setFieldMeetUps}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        // sports={sports}
        loggedInPlayer={loggedInPlayer}
        // fields={fields}
        meetUps={meetUps}
        setMeetUps={setMeetUps}
        individualLocation={individualLocation}
        // locations={locations}
        // handleAddTeammate={handleAddTeammate}
      />
    },
    // {
    //   path: '/map',
    //   element: <Map2 
    //     center={center}
    //     setCenter={setCenter}
    //     zoom={zoom}
    //     setZoom={setZoom}
    //     showLayer1={showLayer1}
    //     setShowLayer1={setShowLayer1}
    //     showLayer2={showLayer2}
    //     setShowLayer2={setShowLayer2}
    //     showLayer3={showLayer3}
    //     showLayer4={showLayer4}
    //   />
    // }
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
