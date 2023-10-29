import { Box, Button, Tooltip } from '@mui/material';
import {
  AddOutlined,
  FilterListOutlined,
  DeleteOutlined,
} from '@mui/icons-material';

const ActionBox = ({
  visibleDelete,
  allowFilter,
  handleNewClick,
  handleDeleteClick,
  onToggleFilterBox,
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
      {allowFilter && (
        <Tooltip title='Filter Box'>
          <Button
            color='secondary'
            startIcon={<FilterListOutlined />}
            variant='text'
            onClick={onToggleFilterBox}
            sx={{ mr: 2 }}
          >
            Filter
          </Button>
        </Tooltip>
      )}

      <Tooltip title='Add new resource'>
        <Button
          startIcon={<AddOutlined />}
          variant='outlined'
          sx={{ mr: 2 }}
          onClick={handleNewClick}
        >
          New
        </Button>
      </Tooltip>

      {visibleDelete && (
        <Tooltip title='Delete resources'>
          <Button
            startIcon={<DeleteOutlined />}
            variant='outlined'
            color='error'
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </Tooltip>
      )}
    </Box>
  );
};

export default ActionBox;
