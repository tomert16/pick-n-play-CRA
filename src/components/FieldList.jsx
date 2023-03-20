import { useNavigate } from 'react-router-dom';
import FieldCard from './FieldCard';


function FieldList({ individualLocation}) {
    const navigate = useNavigate();
   

    // const handleSelectedField = (fields) => {
        
    //     navigate('/fieldinfo')
    // }

  return (
      <div>
        <h1 className='home-prompt'>Pick a Field</h1>
        <div className='fields-list'>
        {individualLocation.fields.map((field) => (
            <FieldCard 
                key={field.id}
                field={field}
                // selectedField={selectedField}
                // setSelectedField={setSelectedField}
                // handleSelectedField={handleSelectedField}
            />
        ))}
        </div>
      </div>
  )
}

export default FieldList;