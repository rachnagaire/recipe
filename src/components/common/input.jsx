import React from "react";
const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} id={name} name={name} className="form-control" />
      {error && (
        <span className="validation-message text-danger py-2">{error}</span>
      )}
    </div>
  );
};

export default Input;
