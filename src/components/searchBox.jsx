import React from "react";
const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="form-control mb-4"
      name="query"
      value={value}
      placeholder="Search..."
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
export default SearchBox;
