import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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


function App() {
  const dispatch = useDispatch();
  const [selectedSport, setSelectedSport] = useState();
  const [selectedMeetUp, setSelectedMeetUp] = useState();
  const [selectedField, setSelectedField] = useState();
  const [individualLocation, setIndividualLocation] = useState();
  // management page link
  const ADMIN_LINK = process.env.REACT_APP_ADMIN_LINK


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
        selectedField={selectedField}
        setSelectedField={setSelectedField}
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
        selectedSport={selectedSport}
        setSelectedSport={setSelectedSport}
        selectedMeetUp={selectedMeetUp}
        setSelectedMeetUp={setSelectedMeetUp}
        individualLocation={individualLocation}
      />
    },
    {
      path: '/fields/:id',
      element: <FieldInfo 
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        individualLocation={individualLocation}
      />
    },
    {
      path: '/requests',
      element: <Requests />
    },
    {
      path: ADMIN_LINK,
      element: <Management />
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
