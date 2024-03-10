import React from "react";
const Filters = ({
  items,
  onItemSelect,
  textProperty,
  valueProperty,
  selectedGenre,
}) => {
  return (
    <ul className="list-group d-flex flex-row flex-lg-column pb-4 pb-lg-0">
      {items.map((item) => (
        <li
          className={
            item === selectedGenre
              ? "list-group-item active"
              : "list-group-item"
          }
          key={item[valueProperty] + [textProperty]}
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

Filters.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default Filters;
