import { useEffect, useState } from 'react';
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
import axios from 'axios';






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





export default function CustomPaginationActionsTable({products,onAscend,onDescend, updateSearch}) {
  const rows = products
  const [edit, setEdit] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [rowId, setRowId] = useState([])

  const[name, setName] = useState([])
  const[descrip, setDescrip] = useState([])
  const[price, setPrice] = useState([])

  const token = localStorage.getItem("token")
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
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  //edit and save
  const editRow = (id,e) => {
    
    setEdit(true)
    setRowId(id)
  }
  const saveRow = (e) => {
    
    let list
    axios.put(`https://app.spiritx.co.nz/api/product/${rowId}`, bodyParameters, {headers:  {'token': token} } )
    .then((res) => { list = res.data; updateSearch(list,rowId); console.log(list)} ).catch((err)=>{console.log(err)})
    setEdit(false)
  }

  
  

  return (
    <div className='page'>
    

    {/* <button onClick={() => {onAscend("id")}}></button> */}
    <TableContainer component={Paper}>
        
      <Table sx={{ minWidth: 500 }} aria-label="sticky table">
        <TableHead onAscend={onAscend} onDescend={onDescend}
                  products={products}/>     
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
                { edit && rowId === row.id ? <input type="text" onChange={(e) => {setName(e.target.value)}} /> : row.title}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                { edit && rowId === row.id ? <input type="text" onChange={(e) => {setDescrip(e.target.value)}}/> : row.description}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                <img style={{ width: 100 }} src={(row.product_image&&`https://app.spiritx.co.nz/storage/${row.product_image}`)} alt={row.product_image}/>
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                { edit && rowId === row.id ? <input type="text" onChange={(e) => {setPrice(e.target.value)}}/> : row.price}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                <Fab  aria-label="edit">
                  {edit && rowId === row.id ? <AddIcon onClick={saveRow} /> : <EditIcon onClick={() => {editRow(row.id)}}/>}
                </Fab>
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
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  
                />
    </TableContainer>
    </div>
  );
}
