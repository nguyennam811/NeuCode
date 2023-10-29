import { useState } from 'react';
import { Box, Grid } from '@mui/material';
import SearchBox from './SearchBox';
import ActionBox from './ActionBox';
import FilterBox from './FilterBox';
import AutocompleteField from '../FormDialog/FieldTypes/AutocompleteField';

const ToolbarBox = ({
  visibleDelete,
  searchFields,
  filterOptions,
  handleSearch,
  handleFilter,
  numOfColumnsInFilter,
  handleNewClick,
  handleDeleteClick,
}) => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const [filtered, setFiltered] = useState(false);

  const toggleFilterBoxHandler = () => {
    setIsOpenFilter((prevState) => !prevState);
  };

  return (
    <Box
      sx={{
        p: 1.5,
        bgcolor: '#ffffff',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderBottom: 'none',
      }}
    >
      <Grid container>
        <Grid item xs={8}>
          <SearchBox options={searchFields} handleSearch={handleSearch} />
        </Grid>

        <Grid item xs={4}>
          <ActionBox
            visibleDelete={visibleDelete}
            allowFilter={filterOptions.length > 0}
            handleNewClick={handleNewClick}
            handleDeleteClick={handleDeleteClick}
            onToggleFilterBox={toggleFilterBoxHandler}

            filtered={filtered} // Pass the state to ActionBox
          />
        </Grid>

        {isOpenFilter && (
          <Grid
            item
            xs={12}
            mt={1.5}
            sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.13)' }}
          >
            <FilterBox
              filterOptions={filterOptions}
              numOfColumnsInFilter={numOfColumnsInFilter}
              handleFilter={handleFilter}

              setFiltered={setFiltered} // Pass the setter function to FilterBox
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ToolbarBox;
