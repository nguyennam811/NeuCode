import { LoadingButton } from '@mui/lab';
import { Button, DialogActions } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useFormikContext } from 'formik';


const ActionDialog = (props) => {
  const { isSubmitting } = useFormikContext();
  return (
    <DialogActions sx={{ mb: 1, p: '0 24px 10px' }}>
      <Button
        autoFocus
        color='inherit'
        onClick={() => {
          props.onClose();
        }}
        disabled={isSubmitting}
        variant='contained'
      >
        Cancel
      </Button>

      <LoadingButton
        autoFocus
        type='submit'
        form='data-form'
        loading={isSubmitting}
        loadingPosition='start'
        startIcon={<SaveIcon />}
        variant='contained'
      >
        Save
      </LoadingButton>
    </DialogActions>
  );
};

export default ActionDialog;
