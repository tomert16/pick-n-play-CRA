

function SportDropdownFilter({ sportFilter, setSportFilter }) {
  const handleSportFilter = (e) => {
    setSportFilter(e.target.value);
  }
 
  return (
    <div className="search-bar">
      <label>Sport:</label>
        <select  name="sport-filter" value={sportFilter} onChange={handleSportFilter}>
            <option value="all">All</option>
            <option value="soccer">Soccer</option>
            <option value="basketball">Basketball</option>
            <option value="tennis">Tennis</option>
            <option value="football">Football</option>
        </select>
    </div>
  )
}

export default SportDropdownFilter;