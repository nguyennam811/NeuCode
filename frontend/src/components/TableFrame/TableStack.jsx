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
    data
  } = useDataTable();

  const problemSearchFields = [
    { id: 'id', title: 'ID' },
    { id: 'title', title: 'Title' },
  ];

  const difficultyOptions = [
    { value: "EASY", label: "Dễ" },
    { value: "MEDIUM", label: "Trung bình" },
    { value: "DIFFICULT", label: "Khó" },
  ];

  // lọc theo problem type
  const uniqueProblemTypes = new Set();
  data.forEach((item) => {
    uniqueProblemTypes.add(item.problem_type);
  });

  const problemTypeOptions = [...uniqueProblemTypes].map((value) => ({
    value: value,
    label: value,
  }));

  //lọc theo author

  const authorOptions = [];
  const userMap = {};
  data.forEach((item) => {
    const user = item.user;

    if (!userMap[user.id]) {
      authorOptions.push({
        value: user.id,
        label: user.fullname,
      });
      userMap[user.id] = true;
    }
  });


  const filterOptions = [
    {
      id: "filter_difficultys",
      title: "Difficulty",
      placeholder: "Select difficulty...",
      values: "",
      options: difficultyOptions,
      multipleValues: true,
    },
    {
      id: "filter_problem_types",
      title: "Problem Type",
      placeholder: "Select problem type...",
      values: "",
      options: problemTypeOptions.sort(
        (a, b) =>
          -b.label[0].toUpperCase().localeCompare(a.label[0].toUpperCase())
      ),
      groupByFn: (option) => option.label[0].toUpperCase(),
      multipleValues: true,
    },
    {
      id: "filter_authors",
      title: "Author",
      placeholder: "Select author...",
      values: "",
      options: authorOptions.sort(
        (a, b) => -b.label.toUpperCase().localeCompare(a.label.toUpperCase())
      ),
      groupByFn: (option) => option.label[0].toUpperCase(),
      multipleValues: true,
    },
  ];

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
        searchFields={problemSearchFields || []}
        filterOptions={filterOptions || []}
        handleSearch={handleSearch}
        handleFilter={handleFilter}
        numOfColumnsInFilter={props.numOfColumnsInFilter || 3}
        handleNewClick={props.handleNewClick}
        handleDeleteClick={() => {
          props.onDeleteRows(selected);
          setSelected([]);
        }}
      />
    </Stack>
  );
};

export default TableStack;
