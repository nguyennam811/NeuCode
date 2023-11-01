import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

const CheckboxField = (props) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          id={props.id}
          onChange={(e) => props.setFieldValue(props.id, e.target.checked)}
          // defaultChecked={!!props.value}
          checked={props.value}
        />
      }
      // label={props.title}
      labelPlacement='end'
    />
  );
};

export default CheckboxField;
