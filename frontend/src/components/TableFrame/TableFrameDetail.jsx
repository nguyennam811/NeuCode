import React from "react";
import { DataTableProvider } from "../../contexts/data-table";
// import { SearchField, SearchOption } from '../ToolbarBox/SearchBox';
import DataTable from "../DataTable";
import { Typography } from "@mui/material";
import TableStack from "./TableStack";

const TableFrameDetail = (props) => {
  return (
    <DataTableProvider {...props}>
      <Typography variant='h5' gutterBottom>
        {props.title}
      </Typography>
      <TableStack
        // searchFields={props.searchFields || []}
        // filterOptions={props.filterOptions || []}
        numOfColumnsInFilter={props.numOfColumnsInFilter}
        onSearch={props.onSearch}
        onFilter={props.onFilter}
        handleNewClick={props.handleNewClick}
        onDeleteRows={props.onDeleteRows}
      />
      <DataTable />
    </DataTableProvider>
  );
};

export default TableFrameDetail;
