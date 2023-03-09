
function FieldDropDownFilter({ fieldFilter, setFieldFilter }) {

  const handleFieldFilter = (e) => {
      setFieldFilter(e.target.value);
  }
  return (
    <div >
        <label>Field:</label>
        <select name="field-filter" value={fieldFilter} onChange={handleFieldFilter}>
            <option value="all">All</option>
            <option value="bushwick inlet park">Bushwick Inlet Park</option>
            <option value="central park">Central Park</option>
            <option value="riverside park">Riverside Park</option>
            <option value="globall sports center">Globall Sports Center</option>
        </select>
    </div>
  )
}

export default FieldDropDownFilter;