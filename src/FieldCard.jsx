

function FieldCard({ field, handleSelectedField }) {
    const { field_name, img_url  } = field;
  return (
    <div onClick={() => handleSelectedField(field)}>
        <h3>{field_name}</h3>
        <img src={img_url} alt={field_name} />
    </div>
  )
}

export default FieldCard