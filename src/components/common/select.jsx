import React from "react";
const Select = ({ name, label, error, options, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select {...rest} id={name} name={name} className="form-control">
        <option value="">Select options</option>
        {options.map((option) => (
          <option value={option._id} key={option._id + option.name}>
            {option.name}
          </option>
        ))}
      </select>
      {error && (
        <span className="validation-message text-danger py-2">{error}</span>
      )}
    </div>
  );
};

export default Select;
