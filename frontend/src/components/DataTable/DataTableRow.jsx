import React from "react";
import { Checkbox, TableCell, TableRow, styled } from "@mui/material";
import useDataTable from "../../hooks/use-data-table";
import { Link, useLoaderData, useLocation } from "react-router-dom";
// import { getCurrentUser } from "../../utils/auth";

const DataTableRow = ({ labelId, row }) => {
  const dataTableCtx = useDataTable();
  const current_user = useLoaderData();
  const { showCheckbox } = useDataTable();
  const headCells = dataTableCtx.headCells;
  const { isSelected, handleSelectRow } = dataTableCtx;
  const isItemSelected = isSelected(row.id);

  // const current_user = getCurrentUser();
  const location = useLocation();
  return (
    <>
      {showCheckbox === true ? (
        <TableRow
          hover
          // onClick={(e) => handleSelectRow(e, row.id)}
          onClick={(e) => {
            // Kiểm tra nếu problem.user_id trùng với current_user.sub
            // if (row.user_id === current_user.sub || row.teacher_id === current_user.sub || location.pathname.includes('courses')) {
            if (row.user_id === current_user.sub || location.pathname.includes('courses')) {
              handleSelectRow(e, row.id);
            }
          }}
          role="checkbox"
          aria-checked={isItemSelected}
          tabIndex={-1}
          key={row.id}
          selected={showCheckbox && isItemSelected}
          // sx={{ cursor: "pointer" }}
          sx={{
            // cursor: row.user_id === current_user.sub || row.teacher_id === current_user.sub || location.pathname.includes('courses') ? "pointer" : "default",
            cursor: row.user_id === current_user.sub || location.pathname.includes('courses') ? "pointer" : "default",
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
              {headCell.id === "title" ? (
                <Link
                  to={`${row.id}`}
                  style={{
                    color: "black",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "red")}
                  onMouseLeave={(e) => (e.target.style.color = "black")}
                >
                  {headCell.renderFn(row)}
                </Link>
              ) : (
                headCell.renderFn(row)
              )}
            </TableCell>
          ))}
        </TableRow>
      )}
    </>
  );
};

export default DataTableRow;
