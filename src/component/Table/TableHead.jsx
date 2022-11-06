import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import './TableHead.css'
import {useState} from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DownloadIcon from '@mui/icons-material/Download';
import CancelIcon from '@mui/icons-material/Cancel';
import * as XLSX from 'xlsx'
import { apiPost } from '../Service';
import {snackBarParam} from'../Page'
;
import { Box } from '@mui/system';





const TableHead = ({onAscend,onDescend,products,addSearch,setDisableFab,setOpen,setSearch,disableFab}) => {
  
  const [columns,setColumns]= useState([
    { 
      id: 'id', 
      label: 'ID', 
      minWidth: 170,

    },
    { 
      id: 'name', 
      label: 'name', 
      minWidth: 100,
      align: 'center', 
    },
    {
      id: 'descriprtion',
      label: 'descriprtion',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
      
    },
    {
      id: 'image',
      label: 'image',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
      
    },
    {
      id: 'price',
      label: 'price',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'action',
      label: 'action',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    }
  ])


 //add product
 const [addname, setAddname] = useState([])
 const [adddes, setAdddes] = useState([])
 const [addprice, setAddprice] = useState([])

 
 
 const bodyParameters = {
        title : addname,
        description : adddes,
        price : addprice,
        category_id : 55
          
     }

//add function
 const [add, setAdd] = useState(false)

 const addItem = () => {
  setAdd(true)
  setDisableFab(true)
 } 

 const saveItem = () => {
  let list 

  let formData = new FormData()
  formData.append("title", bodyParameters.title)
  formData.append("description",bodyParameters.description)
  formData.append("price",bodyParameters.price)
  formData.append("category_id", 1)
  formData.append("product_image", sendPic)

  apiPost(`products`,formData).then((res) => {
    if(snackBarParam.errorFeedback === false){
      list = res.data; addSearch(list);snackBarParam.severityState = "success"; snackBarParam.actionState="add successful";setOpen(true)
    }
    
    setOpen(true)
    snackBarParam.errorFeedback = false
    
  })
  
  setAdd(false)
  setDisableFab(false)
 }

 const cancelAdd = () => {
  setAdd(false)
  setDisableFab(false)
}
 
 //export excel
  const exportList = () => {
    const workBook = XLSX.utils.book_new()
    const workSheet = XLSX.utils.json_to_sheet(products)

    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet1')
    XLSX.writeFile(workBook, 'MyExcel.xlsx')
  }

  //import excel
  const importFromExcel = (e) => {
    e.preventDefault()
    console.log(e)
    if (e.target.files) {
      
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result
            const workbook = XLSX.read(data, { type: "array" })
            const sheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[sheetName]
            const json = XLSX.utils.sheet_to_json(worksheet)
            setSearch([...products, ...json])
        };
        reader.readAsArrayBuffer(e.target.files[0]);
    }
  }
 
  //filtercontrol
  //id
  const [id, setId] = useState(false)
  const [idActive, setidActive] = useState(false);
  const idHandleClick = () => {
    id?  onAscend("id")  : onDescend("id")
    priceActive&&setpriceActive(false)
    nameActive&&setnameActive(false)
    setId(!id)
    setidActive(true)
  }

  //price
  const [price, setPrice] = useState(false)
  const [priceActive, setpriceActive] = useState(false);
  const priceHandleClick = () => {
    price?  onAscend("price")  :onDescend("price")
    idActive&&setidActive(false)
    nameActive&&setnameActive(false)
    setPrice(!price)
    setpriceActive(true)
  }

  //name
  const [name, setName] = useState(false)
  const [nameActive, setnameActive] = useState(false);
  const nameHandleClick = () => {
    name?  onAscend("name")  :onDescend("name")
    idActive&&setidActive(false)
    priceActive&&setpriceActive(false)
    setName(!name)
    setnameActive(true)
  }

  //------------------------showPicture-------------------------//
  const [picSrc,setPic] = useState("")
  const [sendPic,setSend] = useState("")
  const showPic = (e) => {
    e.preventDefault()
    setPic([])
    if (e.target.files.length !== 0) {
      setPic(imgfile => [...imgfile, URL.createObjectURL(e.target.files[0])])
      setSend(e.target.files[0])
    }
    
  }

  return (
    <thead>
      <TableRow style={{position:"relative"}}>
        <TableCell style={{width:100}}>
            
                {add?
                 <Fab color="primary" aria-label="add" > <SaveAltIcon onClick={saveItem}/> </Fab> :
                 <Fab color="primary" aria-label="add" disabled={disableFab}><AddIcon onClick={addItem}/>  </Fab>
                 }
            
            {add? 
              <Fab color="primary" aria-label="add" style={{marginLeft:15}} onClick={cancelAdd}><CancelIcon/> </Fab>
              :  
            
              <Box sx={{ flexGrow: 1 }} style={{position:"absolute", top:15,width:"60%"}}>
              <Fab color="primary" aria-label="add" style={{marginLeft:"15%"}} disabled={disableFab}> 
                
                < FileUploadIcon style={{position:"absolute"}}/>
                <input  accept="" multiple type="file" onChange={importFromExcel} style={{opacity:0}}/>
              </Fab>
              <Fab color="primary" aria-label="add" style={{marginLeft:15}} onClick={exportList} disabled={disableFab}> < DownloadIcon/> </Fab>
              </Box>
              
            }
            
        </TableCell>
        <TableCell /><TableCell /><TableCell /><TableCell /><TableCell />
      </TableRow>
      
      
      <TableRow >
        {columns.map((column) => (
          
            <TableCell
              key={column.id}
              align={column.align}
              style={{ minWidth: column.minWidth }}
            >
            <div className='tablehead'>
               <span style={{display:"inline-block"}}>{column.label}</span>
               {column.id === "id"&&
                <span className='fixarrow'>
                    {id? 
                    <button className='button' onClick={idHandleClick}><ArrowUpwardIcon className={idActive? "downarrow":"uparrow"}/></button>: 
                    <button className='button' onClick={idHandleClick}><ArrowDownwardIcon className={idActive? "downarrow":"uparrow"} /></button>
                    }
                </span>
                }
                {column.id === "price"&&
                <span className='fixarrow'>
                    {price? 
                    <button className='button' onClick={priceHandleClick}><ArrowUpwardIcon className={priceActive? "downarrow":"uparrow"}  /></button>: 
                    <button className='button' onClick={priceHandleClick}><ArrowDownwardIcon className={priceActive? "downarrow":"uparrow"}  /></button>
                    }
                </span>
                }
                {column.id === "name"&&
                <span className='fixarrow'>
                    {name? 
                    <button className='button' onClick={nameHandleClick}><ArrowUpwardIcon className={nameActive? "downarrow":"uparrow"}  /></button>: 
                    <button className='button' onClick={nameHandleClick}><ArrowDownwardIcon className={nameActive? "downarrow":"uparrow"}  /></button>
                    }
                </span>
                }
            </div>
            </TableCell>
            
            
          
        ))}
      </TableRow>
      {add&&
        <TableRow>
          <TableCell></TableCell>
          <TableCell align='center'><input type="text" onChange={(e) => {setAddname(e.target.value)}}/></TableCell>
          <TableCell align='center'><input type="text" onChange={(e) => {setAdddes(e.target.value)}}/></TableCell>
          <TableCell style={{position:"relative"}} align="center">
              <img id="blah" src={picSrc} alt="" style={{width:150}}/>
              <Fab color="primary" aria-label="add"> 
                < FileUploadIcon  style={{position:"absolute"}}/>
                <input accept=".jpge, .png, .jpg" multiple type="file" style={{opacity:0}} id="imgInp" onChange={showPic}/>
              </Fab>
              
          </TableCell>
          <TableCell align='center'><input type="text" onChange={(e) => {setAddprice(e.target.value)}}/></TableCell>
          <TableCell></TableCell>
        </TableRow>
      }
    </thead>
  )
}
export default TableHead