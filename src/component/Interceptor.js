import {setErrorFeedback} from './Page'
//import { localAPI } from './Login'



//const BaseUrl = "https://app.spiritx.co.nz/api"
// const BaseUrl = "http://localhost:8000/api"
let BaseUrl = localStorage.getItem("URLLink")
let localAPI = localStorage.getItem("localAPI")

export const updateInterceptorsURL = (localAPI) => {
  console.log(localAPI)
  if (localAPI === "true") {
    BaseUrl = "http://localhost:8000/api/";
  } else {
    BaseUrl = "https://app.spiritx.co.nz/api/"
  }
}


const onRequest = (config) => {
  const token = localStorage.getItem("token")
  localAPI = localStorage.getItem("localAPI")
    config = {
      ...config, BaseUrl
    }
    if (!config.url?.includes("login")) {
      let newConfig = ""
      if (localAPI === "true") {
        console.log("addToken")
        newConfig = {...config,headers: {...config.headers,'Authorization': 'Bearer ' + token}}
      } else {
        newConfig = {...config, headers: {...config.headers, "token" : token}}
      }

      return newConfig
    }
    return config
}
  

const onRequestError = (error) => {
  console.log(error)
 }



const onResponse = (response) => {
  
  return response
}

const onResponseError = (error) => {
  // if(error.response.status === 401){
  //   alert("login wrong")
  // }
  
  setErrorFeedback(true, error.message, "error")
 
 
 return error
}

export const setupAxiosInstance = (axiosToInstance) => {
    axiosToInstance.interceptors.request.use(onRequest, onRequestError)
    axiosToInstance.interceptors.response.use(onResponse,onResponseError)
  return axiosToInstance
}

