import { useEffect,useState,useRef} from 'react';
import './App.css';
import Page from './component/Page';
import Head from './component/Head';
import Login from './component/Login';
import {Route,Routes} from 'react-router-dom';
import './component/Service'
import { apiGet } from './component/Service';

const baseURL = "https://app.spiritx.co.nz"


function App() {
  const [products, setProducts] = useState([])
  useEffect(() =>{
    apiGet('products').then((response) => {
      setProducts(response.data)
       })
  },[])


  //search
  const[search,setSearch] = useState([])
  
  useEffect(() =>{
    apiGet('products').then((response) => {
    setSearch(response.data)
     })
  },[])
  

  //----------------- Test for PageSet --------------//
  const [testSetPage, setTestPage] = useState()  
  
  const filterItems = (searchItem) => {
    let list = []
        list = products.filter(
        (item) => {
          return item.title.toLowerCase().includes(searchItem.toLowerCase())||(item.description&&item.description.toLowerCase().includes(searchItem.toLowerCase()))
        }
      )
      setSearch(list)
    
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
    setProducts([...products,item])
  }

  //delete row
  const deletSearch = (id) => {
    setSearch(search.filter((item) => item.id !== id))
    setProducts(products.filter((item) => item.id !== id))
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
              <Head filterItems={filterItems} />
              <Page products={search} setSearch={setSearch} onAscend={Ascending} onDescend={Descending} updateSearch={updateSearch} addSearch={addSearch} deletSearch={deletSearch} testSetPage={testSetPage} setProducts={setProducts}/>
              {/* <AddProd /> */}
            </>
            } />
            
          <Route path='/' element={<Login baseUrl={baseURL}/>} />


          
        </Routes>
          
      
    </div>
  );
}

export default App;
