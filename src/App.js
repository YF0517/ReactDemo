import { useEffect,useState} from 'react';
import './App.css';
import Page from './component/Page';
import Head from './component/Head';
import Login from './component/Login';
import {Route,Routes} from 'react-router-dom';
import './component/Service'
import { apiGet } from './component/Service';

//const baseURL = "https://app.spiritx.co.nz"


function App() {
  // const [products, setProducts] = useState([])
  // useEffect(() =>{
  //   apiGet('products').then((response) => {
  //     setProducts(response.data)
  //      })
  // },[])


  // //search
  // const[search,setSearch] = useState([])
  
  // useEffect(() =>{
  //   console.log(products)
  //   apiGet('products').then((response) => {
  //   setSearch(response.data)
  //    })
  // },[])
  

  //----------------- Test for PageSet --------------// 

  const [searchItem, setSearchItem] = useState("")
  
  const filterItems = (searchItem) => {
    setSearchItem(searchItem)
  }

  
  
  // //change row
  // const updateSearch = (items,id) => {
  //   const newState = search.map((item) => {
  //                                             if(item.id === id){
  //                                               return items
  //                                             }
  //                                             return item
  //                                           })
  //   setSearch(newState)
    
  // } 

  // //add row
  // const addSearch = (item) => {
  //   setSearch([...search, item])
  //   setProducts([...products,item])
  // }

  // //delete row
  // const deletSearch = (id) => {
  //   setSearch(search.filter((item) => item.id !== id))
  //   setProducts(products.filter((item) => item.id !== id))
  // }


  
  return (
    <div className="App">
      

        <Routes>

            <Route path='/page' element ={
            <>
              <Head filterItems={filterItems} />
              <Page //search={products} 
                    //products={search} 
                    //setSearch={setSearch} 
                    //updateSearch={updateSearch} 
                    //addSearch={addSearch} 
                    //deletSearch={deletSearch} 
                   // setProducts={setProducts}
                    searchItem={searchItem}
                    />
              {/* <AddProd /> */}
            </>
            } />
            
          <Route path='/' element={<Login />} />


          
        </Routes>
          
      
    </div>
  );
}

export default App;
