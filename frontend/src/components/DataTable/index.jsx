import React, { useState } from 'react';
import {
  Box,
  FormControlLabel,
  Paper,
  Switch,
  Table,
  TableContainer,
  TablePagination,
} from '@mui/material';
import DataTableHead from './DataTableHead';
import DataTableBody from './DataTableBody';
import useDataTable from '../../hooks/use-data-table';

const DataTable = () => {
  const {
    page,
    rowsPerPage,
    total,
    changePageHandler,
    changeRowsPerPageHandler,
  } = useDataTable();


  return (
    <Box sx={{ width: '100%', mt: '0 !important'}}>
      <Paper
        sx={{
          width: '100%',
          mb: 2,
          boxShadow: 'none',
          border: '1px solid rgba(0, 0, 0, 0.13)',
          borderTop: 'none',
          borderRadius: '0'
        }}
      >
        <TableContainer sx={{borderTop: '1px solid rgba(0, 0, 0, 0.13)'}}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby='tableTitle'
            size={'medium'}
          >
            <DataTableHead/>

            <DataTableBody/>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component='div'
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={changePageHandler}
          onRowsPerPageChange={changeRowsPerPageHandler}
        />
      </Paper>
      
    </Box>
  );
};

export default DataTable;
