import React, { useState } from 'react';
import {
  Box,
  Select,
  OutlinedInput,
  MenuItem,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';

const SearchBox = ({ handleSearch, options }) => {
  const [searchingText, setSearchingText] = useState('');
  const [searchingField, setSearchingField] = useState('');

  const isErrorSelectedField = searchingField === '' && searchingText !== '';

  const handleSearchingFieldChange = (e) => {
    setSearchingField(e.target.value);
  };

  const handleInputChange = (e) => {
    setSearchingText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isErrorSelectedField) {
      e.preventDefault();
      handleSearch([{ [searchingField]: searchingText }]);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Select
        id='searching-field'
        error={isErrorSelectedField}
        value={searchingField}
        autoWidth={true}
        sx={{ minWidth: 200 }}
        size='small'
        input={<OutlinedInput />}
        inputProps={{ 'aria-label': 'Choose searching field' }}
        onChange={handleSearchingFieldChange}
      >
        <MenuItem disabled value=''>
          <em>Please choose a searching field:</em>
        </MenuItem>
        {options.map((opt) => (
          <MenuItem key={opt.id} value={opt.id}>
            {opt.title}
          </MenuItem>
        ))}
      </Select>

      <OutlinedInput
        id='searching-text'
        type='text'
        size='small'
        placeholder='Enter for searching...'
        inputProps={{ 'aria-label': 'Enter for searching...' }}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton edge='end'>
              <SearchOutlined />
            </IconButton>
          </InputAdornment>
        }
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </Box>
  );
};

export default SearchBox;
