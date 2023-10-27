import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import AutocompleteField from "../../../components/FormDialog/FieldTypes/AutocompleteField";

function FilterProblems({ data, onSearchFilter }) {
  const [searchValue, setSearchValue] = useState("");
  const [values, setValues] = useState({});

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
      title: "Mức độ",
      placeholder: "Chọn mức độ ...",
      values: "",
      options: difficultyOptions,
      multipleValues: true,
    },
    {
      id: "filter_problem_types",
      title: "Dạng bài",
      placeholder: "Chọn dạng bài ...",
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
      title: "Người đăng",
      placeholder: "Chọn người đăng ...",
      values: "",
      options: authorOptions.sort(
        (a, b) => -b.label.toUpperCase().localeCompare(a.label.toUpperCase())
      ),
      groupByFn: (option) => option.label[0].toUpperCase(),
      multipleValues: true,
    },
  ];

  return (
    <Box width="calc(100% - 75%)" position="fixed" right="2.5%">
      <Box sx={{ border: "2px solid #e0e0e0" }}>
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
            Tìm kiếm bài tập
          </Typography>
          <SearchIcon sx={{ fontSize: "30px" }} />
        </Box>
        <Box p={2}>
          <Box>
            <TextField
              id="search-input"
              placeholder="Tìm bài ..."
              variant="outlined"
              size="small"
              fullWidth
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
              color={"primary"}
              onClick={() => {
                onSearchFilter({
                  ...values,
                  search_value: searchValue,
                });
              }}
              fullWidth
            >
              Filter
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default FilterProblems;
