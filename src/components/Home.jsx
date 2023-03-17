import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Login from './Login'
import SportsList from './SportsList';
import FieldList from './FieldList';
import NavBar from './NavBar';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function Home({ sports, setSports, loggedInPlayer, setLoggedInPlayer, fields, setFields, selectedField, setSelectedField}) {
  const [sportFieldToggle, setSportFieldToggle] = useState(true);
 
  

   

     // fetch fields 
  // const fetchFields = async() => {
  //   const req = await fetch(`/fields`);
  //   const resp = await req.json();
  //   setFields(resp);
  // };
  // useEffect(() => {
  //   fetchFields();
  // },[]);
 

    // const handleSportFieldToggle = () => {
    //   setSportFieldToggle(false)
    // }
   
   


    
  return (
    
    <div>
      <NavBar loggedInPlayer={loggedInPlayer} setLoggedInPlayer={setLoggedInPlayer} />
      <div >
      <ToggleButtonGroup
        color="primary"
        value={sportFieldToggle}
        exclusive
        aria-label="Large sizes"
    >
      <ToggleButton className='sport-field-toggle' value="sport" onClick={() => setSportFieldToggle(true)}>Sports</ToggleButton>
      <ToggleButton value="field" onClick={() => setSportFieldToggle(false)}>Fields</ToggleButton>
    </ToggleButtonGroup>
    </div>
      {sportFieldToggle ? <SportsList 
        sports={sports} 
        setSports={setSports} 
      />
      :
      <FieldList 
        fields={fields} 
        setFields={setFields} 
        // selectedField={selectedField} 
        // setSelectedField={setSelectedField}
      />}
    </div>
  )
};

export default Home