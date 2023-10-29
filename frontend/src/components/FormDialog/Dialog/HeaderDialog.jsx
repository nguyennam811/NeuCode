import { DialogTitle, Typography } from '@mui/material';


const HeaderDialog = (props) => {
  return (
    <DialogTitle>
      <Typography
        variant='h5'
        component='div'
      >
        {props.title}
      </Typography>
    </DialogTitle>
  );
};

export default HeaderDialog;