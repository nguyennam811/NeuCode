import React from "react";
import { Checkbox, TableCell, TableRow } from "@mui/material";
import useDataTable from "../../hooks/use-data-table";
import { useLoaderData, useLocation } from "react-router-dom";

const DataTableRow = ({ labelId, row }) => {
  const dataTableCtx = useDataTable();
  const current_user = useLoaderData();
  const { showCheckbox } = useDataTable();
  const headCells = dataTableCtx.headCells;
  const { isSelected, handleSelectRow } = dataTableCtx;
  const isItemSelected = isSelected(row.id);
  const location = useLocation();
  return (
    <>
      {showCheckbox === true ? (
        <TableRow
          hover
          // onClick={(e) => handleSelectRow(e, row.id)}
          onClick={(e) => {
            if (row.user_id === current_user.sub || location.pathname.includes('courses') || current_user.role === 'admin') {
              handleSelectRow(e, row.id);
            }
          }}
          role="checkbox"
          aria-checked={isItemSelected}
          tabIndex={-1}
          key={row.id}
          selected={showCheckbox && isItemSelected}
          sx={{
            cursor: row.user_id === current_user.sub || current_user.role === 'admin' || location.pathname.includes('courses') ? "pointer" : "default",
          }}
        >
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              checked={isItemSelected}
              inputProps={{ "aria-labelledby": labelId }}
            />
          </TableCell>

          {headCells.map((headCell) => (
            <TableCell
              key={`${row.id}--${headCell.id.toString()}`}
              align={headCell.numeric ? "center" : "left"}
            >
                  {headCell.renderFn(row)}
            </TableCell>
          ))}
        </TableRow>
      ) : (
        <TableRow
          hover
          role="checkbox"
          aria-checked={isItemSelected}
          tabIndex={-1}
          key={row.id}
        >
          {headCells.map((headCell) => (
            <TableCell
              key={`${row.id}--${headCell.id.toString()}`}
              align={headCell.numeric ? "center" : "left"}
            >
                {headCell.renderFn(row)}
            </TableCell>
          ))}
        </TableRow>
      )}
    </>
  );
};

export default DataTableRow;
