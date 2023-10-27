import React from 'react';
import { Stack } from '@mui/material';
import ToolbarBox from '../ToolbarBox';
import DataTable from '../DataTable';
import useDataTable from '../../hooks/use-data-table';

const TableStack = (props) => {
  const {
    selected,
    setSelected,
    setPage,
  } = useDataTable();

  const handleSearch = (searchOptions) => {
    setPage(0);
    props.onSearch(searchOptions);
  };

  const handleFilter = (filterOptions) => {
    setPage(0);
    if (props.onFilter) {
      props.onFilter(filterOptions);
    }
  };

  return (
    <Stack spacing={1}>
      <ToolbarBox
        visibleDelete={selected.length > 0}
        searchFields={props.searchFields || []}
        filterOptions={props.filterOptions || []}
        handleSearch={handleSearch}
        handleFilter={handleFilter}
        numOfColumnsInFilter={props.numOfColumnsInFilter || 3}
        handleNewClick={props.handleNewClick}
        handleDeleteClick={() => {
          props.onDeleteRows(selected);
          setSelected([]);
        }}
      />
      <DataTable />
    </Stack>
  );
};

export default TableStack;
