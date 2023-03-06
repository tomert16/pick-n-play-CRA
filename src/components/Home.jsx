import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Login from './Login'
import SportsList from './SportsList';
import FieldList from './FieldList';
import NavBar from './NavBar';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function Home({ sports, setSports, selectedSport, setSelectedSport, loggedInPlayer, setLoggedInPlayer, fields, setFields, selectedField, setSelectedField }) {
  const [sportFieldToggle, setSportFieldToggle] = useState(true);
  

    console.log(loggedInPlayer)

    // fetch all sports 
    function fetchSports() {
        fetch('/sports')
        .then ((r) => r.json())
        .then((data) => setSports(data))
    };

    useEffect(() => {
        fetchSports();
    },[]);

     // fetch fields 
  const fetchFields = async() => {
    const req = await fetch(`/fields`);
    const resp = await req.json();
    setFields(resp);
  };
  useEffect(() => {
    fetchFields();
  },[]);

    // const handleSportFieldToggle = () => {
    //   setSportFieldToggle(false)
    // }
   
   


    
  return (
    
    <div>
      <NavBar loggedInPlayer={loggedInPlayer} setLoggedInPlayer={setLoggedInPlayer} />
      <ToggleButtonGroup
        color="primary"
        value={sportFieldToggle}
        exclusive
        aria-label="Platform"
    >
      <ToggleButton value="sport" onClick={() => setSportFieldToggle(true)}>Sports</ToggleButton>
      <ToggleButton value="field" onClick={() => setSportFieldToggle(false)}>Fields</ToggleButton>
    </ToggleButtonGroup>
      {sportFieldToggle ? <SportsList 
        sports={sports} 
        setSports={setSports} 
        selectedSport={selectedSport} 
        setSelectedSport={setSelectedSport}
      />
      :
      <FieldList 
        fields={fields} 
        setFields={setFields} 
        selectedField={selectedField} 
        setSelectedField={setSelectedField}
        
      />}
    </div>
  )
};

export default Home