const Filters = ({ data, onCheckedValue, showToday, setShowToday }) => {
  return (
    <div className='filters-container'>
      <h1>Filters</h1>

      <div className='filters-box'>
        {data?.map((option, index) => {
          return (
            <div key={index} className='filters-item'>
              <input
                type='checkbox'
                onChange={(e) => {
                  onCheckedValue(e);
                }}
                value={option}
                id={option}
                name={option}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          );
        })}

        <div className='filters-item'>
          <input
            type='checkbox'
            checked={showToday}
            value={showToday}
            id='today'
            name='today'
            onChange={(e) => setShowToday(e.target.checked)}
          />
          <label htmlFor='today'>Today's deliveries</label>
        </div>
      </div>
    </div>
  );
};

export default Filters;
