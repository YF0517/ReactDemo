import { useEffect, useState ,useRef} from 'react';
import TableHead from './Table/TableHead'
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import './Page.css';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CancelIcon from '@mui/icons-material/Cancel';
import { apiPut} from './Service';
import SpamBar from './Table/SpamBar';
import PopupPage from './Table/PopupPage';






function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

 

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};





export default function CustomPaginationActionsTable({products,onAscend,onDescend, updateSearch,addSearch,deletSearch}) {

  const rows = products
  const [edit, setEdit] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [rowId, setRowId] = useState([])
  const [disableFab, setDisableFab] = useState(false)
  
  

  const[name, setName] = useState([])
  const[descrip, setDescrip] = useState([])
  const[price, setPrice] = useState([])
  const[dename, setDename] = useState([])
  const[dedescrip, setDedescrip] = useState([])
  const[deprice, setDeprice] = useState([])
  const [open, setOpen] = useState(false)
  const [pop, setPop] = useState(false)
  
  
  const bodyParameters = {
    title: name,
    description: descrip,
    price: price,

       }
  
  


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  
  //fix warning of pangination
  useEffect(() => { if( (rows.length === rowsPerPage) && (page > 0) ) { setPage(0); } }, [rows.length, rowsPerPage, page]);
  

  //edit and save
  const editRow = (id) => {
    setDisableFab(true)
    setEdit(true)
    setRowId(id)
    let rowName = rows.filter((item)=>item.id === id)
    let rowDeName = rows.filter((item)=>item.id === id)
    //console.log(rowName[0].title)
    setName(rowName[0].title)
    setDescrip(rowName[0].description)
    setPrice(rowName[0].price)
    setDename(rowDeName[0].title)
    setDedescrip(rowDeName[0].description)
    setDeprice(rowDeName[0].price)
  }

  const preName = useRef(name)
  const preDescrip = useRef(descrip)
  const prePrice = useRef(price)
  useEffect(() => {
    //assign the ref's current value to the count Hook
    preName.current = name
    preDescrip.current = descrip
    prePrice.current = price
  }, [name,descrip,price]);

  const preDeName = useRef(dename)
  const preDeDescrip = useRef(dedescrip)
  const preDePrice = useRef(prePrice)
  useEffect(() => {
    //assign the ref's current value to the count Hook
    preDeName.current = dename
    preDeDescrip.current = dedescrip
    preDePrice.current = deprice
  }, [dename,dedescrip,deprice]);


  const saveRow = (e) => {
    let list
    // console.log(preName.current)
    // console.log(name)
    if((preName.current !== dename)||(preDescrip.current !== dedescrip)||(prePrice.current !== deprice)){
      apiPut(`product/${rowId}`,bodyParameters).then((res) => { list = res.data; updateSearch(list,rowId);setOpen(true)})
    }
    
    setEdit(false)
    setDisableFab(false)
  }
  const cancelEditRow = () => {
    setEdit(false)
    setDisableFab(false)
  }


  //delete
  
  const deletRow = (id) => {
    setPop(true)
    setRowId(id)
    // conf&&apiDelet(`product/${id}`).then((res) => {console.log(res);setOpen(true)})
    // conf&&deletSearch(id)
    // setConf(false)
  }
  

  return (
    <div className='page'>

    <SpamBar setOpen={setOpen} open={open}/>

    {pop? <PopupPage  setPop={setPop} rowId={rowId} setOpen={setOpen} deletSearch={deletSearch}/> : null}

    <TableContainer component={Paper}>
        
      <Table sx={{ minWidth: 500 }} aria-label="sticky table">
        <TableHead onAscend={onAscend} onDescend={onDescend} addSearch={addSearch}
                  products={products} setDisableFab={setDisableFab} setOpen={setOpen}/>     
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map(row => (
            <TableRow key={row.id} >
              <TableCell style={{ width: 160 }} align="left">
                {row.id}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                { edit && rowId === row.id ? <input type="text" defaultValue={row.title} onChange={(e) => {setName(e.target.value)}} /> : row.title}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                { edit && rowId === row.id ? <input type="text" defaultValue={row.description} onChange={(e) => {setDescrip(e.target.value)}}/> : row.description}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                <img style={{ width: 100 }} src={(row.product_image&&`https://app.spiritx.co.nz/storage/${row.product_image}`)} alt={row.product_image}/>
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                { edit && rowId === row.id ? <input type="text" defaultValue={row.price}  onChange={(e) => {setPrice(e.target.value)}}/> : row.price}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                
                  {edit && rowId === row.id ? 
                    <Fab  aria-label="edit"  onClick={saveRow}>
                      <AddIcon /> 
                    </Fab>: 
                    <Fab  aria-label="edit" disabled={disableFab} onClick={() => {editRow(row.id)}}>
                      <EditIcon />
                    </Fab>
                    }

                  {edit && rowId === row.id ?
                      <Fab color='edit'  style={{marginLeft:15}} onClick={cancelEditRow}>
                        <CancelIcon />
                      </Fab>:

                      <Fab  aria-label="edit" style={{marginLeft:15}} disabled={disableFab} onClick={() => {deletRow(row.id)}}>
                        <DeleteForeverIcon />
                      </Fab>
                    }
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        
      </Table>
      
      <TablePagination
                  rowsPerPageOptions={[5, 10, 20]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={( (page > 0) && (rows.length === rowsPerPage) ) ? page-1 : page}
                  //page={rows.length <= 0 ? 0 : page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  
                />
    </TableContainer>
    </div>
  );
}
