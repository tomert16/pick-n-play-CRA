import { useState } from 'react';

function FieldCard({ field, handleSelectedField }) {
    const [mouseOverImage, setMouseOverImage] = useState(1)
    const [mouseOverInfo, setMouseOverInfo] = useState(0)
    const { field_name, img_url  } = field;


  return (
    <div className="field-card" onClick={() => handleSelectedField(field)}  onMouseOver={()=>(
      setMouseOverImage(.3),
      setMouseOverInfo(1)
    )}
    onMouseLeave={()=>(
      setMouseOverImage(1),
      setMouseOverInfo(0)
    )}>
        <h3 style={{opacity: mouseOverInfo}}>{field_name}</h3>
        <img className="field-image" src={img_url} alt={field_name} style={{opacity: mouseOverImage}}/>
    </div>
  )
}

export default FieldCard;