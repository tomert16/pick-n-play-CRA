import { useNavigate } from 'react-router-dom';
import FieldCard from './FieldCard';


function FieldList({ fields, selectedField, setSelectedField }) {
    const navigate = useNavigate();
   

    const handleSelectedField = (fields) => {
        setSelectedField(fields);
        navigate('/fieldinfo')
    }

  return (
      <div>
        <h1 className='home-prompt'>Where You Playing?</h1>
        <div className='fields-list'>
        {fields.map((field) => (
            <FieldCard 
                key={field.id}
                field={field}
                selectedField={selectedField}
                setSelectedField={setSelectedField}
                handleSelectedField={handleSelectedField}
            />
        ))}
        </div>
      </div>
  )
}

export default FieldList;