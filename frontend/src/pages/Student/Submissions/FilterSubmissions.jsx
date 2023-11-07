import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import AutocompleteField from "../../../components/FormDialog/FieldTypes/AutocompleteField";

function FilterSubmissions({ onSearchFilter }) {
  const [filtered, setFiltered] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [values, setValues] = useState({});

  let keys = Object.keys(values);

  const languageOptions = [
    { value: "cpp", label: "C++" },
    { value: "py", label: "Python" },
    { value: "php", label: "PHP" },
  ];

  const filterOptions = [
    {
      id: "filter_language",
      title: "Language",
      placeholder: "Select language...",
      values: "",
      options: languageOptions,
      multipleValues: true,
    }
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
            Submission search
          </Typography>
          <SearchIcon sx={{ fontSize: "30px" }} />
        </Box>
        <Box p={2}>
          <Box>
            <TextField
              id="search-input"
              placeholder="Search title problem..."
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

export default FilterSubmissions;
