import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import AutocompleteField from "../../../components/FormDialog/FieldTypes/AutocompleteField";

function FilterProblems({ data, onSearchFilter }) {
  const [filtered, setFiltered] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [values, setValues] = useState({});

  let keys = Object.keys(values);

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

  console.log(authorOptions)

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

  return (
    <Box width="calc(100% - 75%)" >
      <Box sx={{ border: "2px solid #e0e0e0" }} position='sticky' top='2%'>
        <Box
          sx={{
            backgroundColor: "#726868",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            padding: "5px",
          }}
        >
          <Typography variant="body1" fontSize={20}>
            {/* Tìm kiếm bài tập */}Problem search
          </Typography>
          <SearchIcon sx={{ fontSize: "30px" }} />
        </Box>
        <Box p={2}>
          <Box>
            <TextField
              id="search-input"
              placeholder="Search title problems..."
              variant="outlined"
              fullWidth
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Box>
          {filterOptions.map((filter) => (
            <Grid item key={`filter-${filter.id}`} sx={{ marginTop: "12px" }}>
              <AutocompleteField
                id={filter.id}
                title={filter.title}
                placeholder={filter.placeholder}
                multipleValues
                values={filter.values}
                required={filter.required}
                options={filter.options}
                error={filter.error}
                onBlur={filter.onBlur}
                setFieldValue={(field, value, a) => {
                  setValues({
                    ...values,
                    [field]: (value || []).map((item) => item.value),
                  });
                }}
                groupByFn={filter.groupByFn}
              />
            </Grid>
          ))}

          <Box mt={3}>
            <Button
              variant={"contained"}
              color={filtered ? 'error' : 'primary'}
              // onClick={() => {
              //   onSearchFilter(!filtered
              //     ? {
              //       ...values,
              //       search_value: searchValue,
              //     }
              //     : keys.reduce((pre, cur) => {
              //         return {
              //           search_value: "",
              //           ...pre,
              //           [cur]: [],
                        
              //         };
              //       }, {})
              // );
              // setFiltered(!filtered);
              // }}
              onClick={() => {
                const newValues = { ...values };
                keys.forEach((key) => {
                  if (key !== 'search_value') {
                    newValues[key] = [];
                  }
                });
                newValues.search_value = '';
                newValues.search_key = '';
                
                onSearchFilter(!filtered ? { ...values, search_value: searchValue, search_key: 'title'} : newValues);
                setFiltered(!filtered);
              }}
              fullWidth
            >
              {filtered ? 'Unfilter' : 'Filter'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default FilterProblems;
