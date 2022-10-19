import axios from 'axios';
import {useEffect, useState} from 'react';




const AddProd = () => {
  
  const token = localStorage.getItem("token")
  const config = {
    headers: { 
      'Authorization': 'Bearer ' + token 
    }
  }

  // const newConfig = {
  //          ...config,
  //          headers: {
  //          ...config.headers,
  //          'Authorization': 'Bearer ' + token
  //         }
  //        }
  const bodyParameters = {
    email: "test@gradspace.org",
    password: "qwer1234"
       }
    console.log(token)
  
  axios.post(`https://app.spiritx.co.nz/api/products`, bodyParameters, {headers:  {'token': token} } )
    .then((res) => {console.log(res)}).catch((err)=>{console.log(err)})

  
  return (
    <div>AddProd</div>
  )
}
export default AddProd