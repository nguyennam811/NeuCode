import React, { useState, useEffect } from 'react';
import { styled, lighten, darken } from '@mui/system';
import { Autocomplete, InputLabel, TextField } from '@mui/material';

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === 'light'
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled('ul')({
  padding: 0,
});

const AutocompleteField = (props) => {
  const [optionsState, setOptionsState] = useState(props.options);

  useEffect(() => {
    setOptionsState(
      props.options.filter((option) => {
        if (!props.filterOptionsFn) {
          return true;
        }
        return props.filterOptionsFn(props.values, option);
      })
    );
  }, [props]);

  return (
    <>
      <InputLabel htmlFor={props.id}>
        {props.title} {props.required && '*'}
      </InputLabel>
      <Autocomplete
        id={props.id}
        size='small'
        options={optionsState}
        multiple={props.multipleValues}
        value={props.options.find(
          (item) => item.value === props.values[props.id]
        )}
        onChange={(e, option, reason, details) =>
          props.setFieldValue(
            props.id,
            props.multipleValues ? option : details?.option.value,
            true
          )
        }
        isOptionEqualToValue={(opt1, opt2) => opt1.value === opt2.value}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              ref={params.InputProps.ref}
              error={props.error}
              placeholder={props.placeholder}
              inputProps={params.inputProps}
              onBlur={props.onBlur}
              fullWidth
            />
          );
        }}
        disabled={props.isDisabled}
        groupBy={props.groupByFn}
        renderGroup={(params) => (
          <li key={params.key}>
            <GroupHeader>{params.group}</GroupHeader>
            <GroupItems>{params.children}</GroupItems>
          </li>
        )}
      />
    </>
  );
};

export default AutocompleteField;
