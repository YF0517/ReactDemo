import axios from 'axios';


const BaseUrl = "https://app.spiritx.co.nz/api"
const token = localStorage.getItem("token")

// const config = {
//   headers:  {'token': token}
// }

const onRequest = (config) => {
    
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
 }

const onResponse = (response) => {
  
  return response
}

const onResponseError = (error) => {
 console.log(error)
}

export const setupAxiosInstance = (axiosToInstance) => {
    axiosToInstance.interceptors.request.use(onRequest, onRequestError)
    axiosToInstance.interceptors.response.use(onResponse,onResponseError)
  return axiosToInstance
}