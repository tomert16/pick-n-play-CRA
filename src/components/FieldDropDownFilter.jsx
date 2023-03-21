

function FieldDropDownFilter({ fieldFilter, setFieldFilter, individualLocation}) {
  const handleFieldFilter = (e) => {
      setFieldFilter(e.target.value);
  }
  
  
  return (
    <div className="search-bar">
        <label>Field:</label>
        <select name="field-filter" value={fieldFilter} onChange={handleFieldFilter}>
            <option value="all">All</option>
            <option value={individualLocation.fields[0].field_name}>{individualLocation.fields[0].field_name}</option>
            <option value={individualLocation.fields[1].field_name}>{individualLocation.fields[1].field_name}</option>
            <option value={individualLocation.fields[2].field_name}>{individualLocation.fields[2].field_name}</option>
            <option value={individualLocation.fields[3].field_name}>{individualLocation.fields[3].field_name}</option>
        </select>
    </div>
  )
}

export default FieldDropDownFilter;