import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, sortColumn, data, onSort, user }) => {
  return (
    <table className="table table-custom ">
      <TableHeader
        columns={columns}
        onSort={onSort}
        sortColumn={sortColumn}
      ></TableHeader>
      <TableBody columns={columns} data={data} user={user} />
    </table>
  );
};

export default Table;
