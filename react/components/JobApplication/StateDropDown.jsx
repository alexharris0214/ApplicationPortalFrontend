import React from 'react';
import { states } from '../../public/constants/states';

const StateDropdown = ({ setStateSetter, placeholder }) => {
  const handleChange = (event) => {
    const selectedState = event.target.value;
    setStateSetter(selectedState);
  };

  return (
    <div style={{width:"100%"}}>

      <select id="state-select" name="states" onChange={handleChange}>
        <option value="">{placeholder}</option>
        {states.map((state) => (
          <option key={state.abbreviation} value={state.abbreviation}>
            {state.name} ({state.abbreviation})
          </option>
        ))}
      </select> 
    </div>
  );
};

export default StateDropdown;