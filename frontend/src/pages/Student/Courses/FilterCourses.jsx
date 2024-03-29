import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import AutocompleteField from "../../../components/FormDialog/FieldTypes/AutocompleteField";

function FilterCourses({ data, onSearchFilter }) {
  const [filtered, setFiltered] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [values, setValues] = useState({});

  let keys = Object.keys(values);

  const authorOptions = [];
  const userMap = {};
  data.forEach((item) => {
    const user = item.courses.user;

    if (!userMap[user.id]) {
      authorOptions.push({
        value: user.id,
        label: user.fullname,
      });
      userMap[user.id] = true;
    }
  });

  console.log(authorOptions)
  console.log(values)

  const filterOptions = [
    {
      id: "filter_teachers",
      title: "Teacher",
      placeholder: "Select teacher...",
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
            Course Name search
          </Typography>
          <SearchIcon sx={{ fontSize: "30px" }} />
        </Box>
        <Box p={2}>
          <Box>
            <TextField
              id="search-input"
              placeholder="Search courses name..."
              variant="outlined"
              fullWidth
              value={searchValue}
              disabled={filtered}
              onChange={(e) => {

                setSearchValue(e.target.value);
                setFiltered(filtered);
              }

              }
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
                isDisabled={filtered}
              />
            </Grid>
          ))}

          <Box mt={3}>
            <Button
              variant={"contained"}
              color={filtered ? 'error' : 'primary'}
              onClick={() => {
                const newValues = { ...values };
                keys.forEach((key) => {
                  if (key !== 'search_value') {
                    newValues[key] = [];
                  }
                });
                newValues.search_value = '';
                newValues.search_key = '';

                onSearchFilter(!filtered ? { ...values, search_value: searchValue, search_key: 'course_name'} : newValues);
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

export default FilterCourses;
