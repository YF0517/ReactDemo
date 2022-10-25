import { useEffect,useState} from 'react';
import axios from "axios";
import './App.css';
import Page from './component/Page';
import Head from './component/Head';
import Login from './component/Login';
import {Route,Routes} from 'react-router-dom';



const baseURL = "https://app.spiritx.co.nz"


function App() {
  const [products, setProducts] = useState([])
  useEffect(() =>{
    axios.get(`${baseURL}/api/products`).then((response) => {
    setProducts(response.data)
    
    })
  },[])


  //search
  const[search,setSearch] = useState([])
  
  useEffect(() =>{
    axios.get(`${baseURL}/api/products`).then((response) => {
    setSearch(response.data)
    })
  },[])

  const filterItems = (searchItem) => {
    let list = []
        list = products.filter(
        (item) => {
          return item.title.toLowerCase().includes(searchItem.toLowerCase())||(item.description&&item.description.toLowerCase().includes(searchItem.toLowerCase()))
        }
      )
      setSearch(list)
      console.log(list)
  }
  
  //change row
  const updateSearch = (items,id) => {
    const newState = search.map((item) => {
                                              if(item.id === id){
                                                return items
                                              }
                                              return item
                                            })
    setSearch(newState)
    
  } 

  //add row
  const addSearch = (item) => {
    setSearch([...search, item])
  }

  //delete row
  const deletSearch = (id) => {
    setSearch(search.filter((item) => item.id !== id))
  }



  //filter
  const Ascending = (item) => {
    if(item === "id"){
      const list = [...search].sort((a, b) => a.id - b.id);
      setSearch(list)
    }
    if(item === "price"){
      const list = [...search].sort((a, b) => a.price - b.price);
      setSearch(list)
    }
    if(item === "name"){
      const list = [...search].sort((a, b) => a.title.localeCompare(b.title));
      setSearch(list)
    }
  }
  const Descending = (item) => {
    if(item === "id"){
      const list = [...search].sort((a, b) => b.id - a.id);
      setSearch(list)
    }
    if(item === "price"){
      const list = [...search].sort((a, b) => b.price - a.price);
      
      setSearch(list)
    }
    if(item === "name"){
      const list = [...search].sort((a, b) => b.title.localeCompare(a.title));
      setSearch(list)
    }
  }

  return (
    <div className="App">
      

        <Routes>

            <Route path='/page' element ={
            <>
              <Head filterItems={filterItems}/>
              <Page products={search} onAscend={Ascending} onDescend={Descending} updateSearch={updateSearch} addSearch={addSearch} deletSearch={deletSearch}/>
              {/* <AddProd /> */}
            </>
            } />
            
          <Route path='/' element={<Login baseUrl={baseURL}/>} />


          
        </Routes>
          
      
      {/* <Head filterItems={filterItems}/> */}

      
                               
      {/* <button onClick={() =>{Ascending("id")}}></button>  */}
      
    </div>
  );
}

export default App;
