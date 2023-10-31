import React from 'react';
import {
  Box,
  CircularProgress,
  TableBody,
  TableCell,
  TableRow,
  Typography,styled
} from '@mui/material';
import useDataTable from '../../hooks/use-data-table';
import DataTableRow from './DataTableRow';

const DataTableBody = () => {
  const dataTableCtx = useDataTable();
  const visibleRows = dataTableCtx.visibleRows;
  const rowsPerPage = dataTableCtx.rowsPerPage;
  const isLoading = dataTableCtx.isLoading;
  const data = dataTableCtx.data;

  const emptyRows = Math.max(rowsPerPage - visibleRows.length, 0);

  return (
    <TableBody sx={{ position: 'relative' }}>
      {isLoading && (
        <Box
          sx={{
            display: 'flex',
            position: 'absolute',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <CircularProgress size={60} />
          <Typography mt={2} variant='h6'>
            Loading data table ...
          </Typography>
        </Box>
      )}
      {data.length === 0 && (
        <Box
          sx={{
            display: 'flex',
            position: 'absolute',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography mt={2} variant='h6'>
          No data available in table
          </Typography>
        </Box>
      )}
      {visibleRows.map((row, idx) => {
        const labelId = `enhanced-table-checkbox-${idx}`;
        return <DataTableRow key={row.id} labelId={labelId} row={row}/>;
      })}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={25} />
        </TableRow>
      )}
    </TableBody>
  );
};

export default DataTableBody;
