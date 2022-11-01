import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {forwardRef } from 'react';

const SpamBar = ({setOpen,open}) => {
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  

  const handleClose = () => {
      setOpen(false)
  }

  return (
    <Snackbar open={open} autoHideDuration={1500} onClose={handleClose} >
        <Alert severity="success" sx={{ width: '100%' }}>
          This is a success!
        </Alert>
    </Snackbar>
  )
}
export default SpamBar