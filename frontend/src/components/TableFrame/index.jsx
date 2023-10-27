import React from "react";
import { DataTableProvider } from "../../contexts/data-table";
// import { SearchField, SearchOption } from '../ToolbarBox/SearchBox';
// import TableStack from './TableStack';
import DataTable from "../DataTable";
import { Typography } from "@mui/material";

const TableFrame = (props) => {
  return (
    <DataTableProvider {...props}>
      {/* <Typography variant='h5' component='div'>
        {props.title}
      </Typography> */}
      {/* <TableStack
        searchFields={props.searchFields || []}
        filterOptions={props.filterOptions || []}
        numOfColumnsInFilter={props.numOfColumnsInFilter}
        onSearch={props.onSearch}
        onFilter={props.onFilter}
        handleNewClick={props.handleNewClick}
        onDeleteRows={props.onDeleteRows}
      /> */}
      <DataTable />
    </DataTableProvider>
  );
};

export default TableFrame;
