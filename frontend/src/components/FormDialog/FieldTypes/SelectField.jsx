import React from 'react';
import { InputLabel, Select, MenuItem } from '@mui/material';

const SelectField = (props) => {
  return (
    <>
      <InputLabel>{props.title}</InputLabel>
      <Select
        id={props.id}
        name={props.name}
        error={props.error}
        defaultValue={props.options[0].value}
        value={props.value}
        onOpen={() => props.setFieldTouched(props.id, true)}
        onChange={(e) => props.setFieldValue(props.id, e.target.value, true)}
      >
        {props.options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default SelectField;
