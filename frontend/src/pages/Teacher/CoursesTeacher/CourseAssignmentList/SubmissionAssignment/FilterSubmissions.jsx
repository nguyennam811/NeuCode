import React from "react";
import { Box, Button, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import {
  Select,
  OutlinedInput,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";

function FilterSubmissions({ onSearchFilter }) {
  const submissionOptions = [
    { id: "submiter_id", title: "Student ID" },
    { id: "fullname", title: "Full Name" },
  ];

  const [filtered, setFiltered] = useState(false);
  const [searchingText, setSearchingText] = useState("");
  const [searchingField, setSearchingField] = useState("");

  const isErrorSelectedField = searchingField === "" && searchingText !== "";

  const handleSearchingFieldChange = (e) => {
    setSearchingField(e.target.value);
  };

  const handleInputChange = (e) => {
    setSearchingText(e.target.value);
  };

  const handleKeyDown = (e) => {
    onSearchFilter(
      !filtered
        ? { search_value: searchingText, search_key: searchingField }
        : {
            search_value: "",
            search_key: "",
          }
    );
    setFiltered(!filtered);
  };

  return (
    <Box width="calc(100% - 75%)">
      <Box sx={{ border: "2px solid #e0e0e0" }} position="sticky" top="2%">
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
            <Select
              id="searching-field"
              error={isErrorSelectedField}
              value={searchingField}
              autoWidth={true}
              fullWidth
              size="small"
              disabled={filtered}
              input={<OutlinedInput />}
              inputProps={{ "aria-label": "Choose searching field" }}
              onChange={handleSearchingFieldChange}
            >
              <MenuItem disabled value="">
                <em>Please choose a searching field:</em>
              </MenuItem>
              {submissionOptions.map((opt) => (
                <MenuItem key={opt.id} value={opt.id}>
                  {opt.title}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box mt={2}>
            <Typography gutterBottom sx={{ color: "#0009" }}>
              search by {searchingField}
            </Typography>
            <OutlinedInput
              id="searching-text"
              type="text"
              size="small"
              fullWidth
              disabled={filtered}
              placeholder="Enter for searching..."
              inputProps={{ "aria-label": "Enter for searching..." }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
              onChange={handleInputChange}
            />
          </Box>

          <Box mt={3}>
            <Button
              variant={"contained"}
              color={filtered ? "error" : "primary"}
              onClick={handleKeyDown}
              fullWidth
            >
              {filtered ? "Unfilter" : "Filter"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default FilterSubmissions;
