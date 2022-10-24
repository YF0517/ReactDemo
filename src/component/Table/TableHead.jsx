import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import './TableHead.css'
import {useState} from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';




const TableHead = ({onAscend,onDescend}) => {
  
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
    }
  ])

  

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

  return (
    <thead>
      <TableRow>
        <Fab color="primary" aria-label="add" >
            <AddIcon />
        </Fab>
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
    </thead>
  )
}
export default TableHead