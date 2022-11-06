import {setErrorFeedback} from './Page'

const BaseUrl = "https://app.spiritx.co.nz/api"




const onRequest = (config) => {
  const token = localStorage.getItem("token")
    config = {
      ...config, BaseUrl
    }
    if (!config.url?.includes("login")) {
      const newConfig = {
        ...config,
        headers: {
          ...config.headers,
          'token': token
        }
     }
      return newConfig
    }
    return config
}
  

const onRequestError = (error) => {
  console.log(error)
  console.log("hii")
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

