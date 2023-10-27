import React from 'react';
import { InputLabel, OutlinedInput } from '@mui/material';

const InputField = (props) => {
  return (
    <>
      <InputLabel htmlFor={props.id}>
        {props.title} {props.required && '*'}
      </InputLabel>

      {!props.hidden && (
        <OutlinedInput
          id={props.id}
          multiline={props.multiline}
          type={props.type}
          value={props.value ?? ''}
          name={props.name}
          onBlur={props.onBlur}
          onChange={props.onChange}
          placeholder={props.placeholder}
          fullWidth
          error={props.error}
          readOnly={props.readOnly ?? false}
        />
      )}
    </>
  );
};

export default InputField;
