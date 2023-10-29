import { Box, Button } from '@mui/material';
import { Grid } from '@mui/material';
import React, { useState } from 'react';
import AutocompleteField from '../FormDialog/FieldTypes/AutocompleteField';

const FilterBox = (props) => {
  const [filtered, setFiltered] = useState(false);
  const [values, setValues] = useState({});

  let keys = Object.keys(values);
  let valuesInObj = Object.values(values);

  let isDisabled =
    keys.length === 0 ||
    valuesInObj.reduce((pre, cur) => pre + (cur === '' ? 1 : 0), 0) !== 0;

  return (
    <>
      <Grid container spacing={2} mb={2} mt={0.1}>
        {props.filterOptions.map((filter) => (
          <Grid
            item
            xs={props.numOfColumnsInFilter}
            key={`filter-${filter.id}`}
          >
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
                  [field]: ((value || []).map((item) => item.value)),
                });
              }}
              groupByFn={filter.groupByFn}
              isDisabled={filtered}
            />
          </Grid>
        ))}
      </Grid>
      <Box>
        <Button
          variant={'contained'}
          color={filtered ? 'error' : 'primary'}
          onClick={() => {
            props.handleFilter(
              !filtered
                ? values
                : keys.reduce((pre, cur) => {
                    return {
                      ...pre,
                      [cur]: [],
                    };
                  }, {})
            );
            setFiltered(!filtered);
            props.setFiltered(!filtered);
          }}
          disabled={isDisabled}
          fullWidth
        >
          {filtered ? 'Unfilter' : 'Filter'}
        </Button>
      </Box>
    </>
  );
};

export default FilterBox;
