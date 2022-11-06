import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import './PopupPage.css'
const PopupPage = ({setPop,confDelete,setDisableFab}) => {
  // const confDelete = () => {
    
  //   apiDelet(`product/${rowId}`).then((res) => {console.log(res);setOpen(true)})
  //   deletSearch(rowId)
  //   setPop(false)
  // }
  
  const deDelete = () => {
    setDisableFab(false)
    setPop(false)
  }


  return (
    <div>
      <div className='insidediv' >
        <h2>Are you sure to delete?</h2>
        <Stack spacing={10} direction="row" justifyContent={"center"}>
          <Button variant="contained" onClick={deDelete}>no</Button>
          <Button variant="outlined" onClick={confDelete}>yes</Button>
        </Stack>
      </div>
    </div>
  )
}
export default PopupPage