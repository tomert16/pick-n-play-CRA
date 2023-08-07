import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './App.css';
import Home from "./pages/Home"
import SportInfo from "./pages/SportInfo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import WelcomePage from "./pages/WelcomePage";
import Account from "./pages/Account";
import FieldInfo from "./pages/FieldInfo";
import Landing from "./pages/Landing";
import { stayLoggedIn } from "./redux/players/playersSlice";
import Requests from "./pages/Requests";
import Management from "./pages/Management";

// import Map2 from "./components/map/Map2";

function App() {
  const dispatch = useDispatch();
  // const loggedInPlayer = useSelector(selectLoggedInPlayer);
  const [selectedSport, setSelectedSport] = useState();
  const [selectedMeetUp, setSelectedMeetUp] = useState();
  const [selectedField, setSelectedField] = useState();
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
        r.json().then((user) => {
          dispatch(stayLoggedIn(user))
        })
      }
    });
  },[dispatch]);


  // All of the web routes
  const router = createBrowserRouter([
    {
      path: "*",
      element: <div>404 NOT FOUND</div>
    },
    {
      path: "/",
      element:  <Landing />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/welcome",
      element: <WelcomePage />
    },
    {
      path: "/locations/:id",
      element: <Home 
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
      element: <Account />
    },
    {
      path: `/sports/:id`,
      element: <SportInfo 
        // sports={sports} 
        // setSports={setSports}
        selectedSport={selectedSport}
        setSelectedSport={setSelectedSport}
        // meetUps={meetUps}
        // setMeetUps={setMeetUps} 
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
        // fields={fields}
        // meetUps={meetUps}
        // setMeetUps={setMeetUps}
        individualLocation={individualLocation}
        // locations={locations}
        // handleAddTeammate={handleAddTeammate}
      />
    },
    {
      path: '/requests',
      element: <Requests />
    },
    {
      path: '/management',
      element: <Management />
    }
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
