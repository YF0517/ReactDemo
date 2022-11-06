import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {forwardRef } from 'react';
import {snackBarParam} from '../Page'



const SpamBar = ({setOpen,open}) => {
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  

  const handleClose = () => {
      setOpen(false)
  }

  return (
    <Snackbar open={open} autoHideDuration={1500} onClose={handleClose} >
        <Alert severity={snackBarParam.severityState} sx={{ width: '100%' }}>
          {snackBarParam.actionState}
        </Alert>
    </Snackbar>
  )
}
export default SpamBar