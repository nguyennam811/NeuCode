import React from 'react';
import {
  Box,
  Checkbox,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,styled
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import useDataTable from '../../hooks/use-data-table';

const DataTableHead = () => {
  const dataTableCtx = useDataTable();
  const {
    showCheckbox
  } = useDataTable();
  const headCells = dataTableCtx.headCells;
  const { order, orderBy, handleSelectAll, handleRequestSort } = dataTableCtx;

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <TableHead>
      <TableRow sx={{backgroundColor: '#f0f0f0'}}>
      {showCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              onChange={handleSelectAll}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
        )}
        {headCells.map((headCell, idx) => {
          const isSortable = headCell.descComparatorFn;
          const cellContent = isSortable ? (
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          ) : (
            headCell.label
          );
          return (
            <TableCell
            // sx={{color: 'black'}}
              key={idx}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {cellContent}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default DataTableHead;
