import axios from 'axios';
import {setupAxiosInstance} from './Interceptor'
import { URLLink } from './Login';

// const [APISourse, setAPISourse] = useState("Local")
// const baseUrl =  "https://app.spiritx.co.nz/api/"
//const baseUrl =  "http://localhost:8000/api/"



let baseUrl = localStorage.getItem("URLLink")

export const updateServiceAPIUrl = (localAPI) => {
  if (localAPI === "true") {
    baseUrl = "http://localhost:8000/api/";
  } else {
    baseUrl = "https://app.spiritx.co.nz/api/"
  }
  console.log(baseUrl)
}

const upDateURL = () =>{
  baseUrl = localStorage.getItem("URLLink")
}

const axiosInstance = setupAxiosInstance(axios.create())

export const apiGet = async path => axiosInstance.get(`${baseUrl}${path}`)
export const apiPut = async (path, data) => axiosInstance.put(`${baseUrl}${path}`,data)
export const apiDelet = async path => axiosInstance.delete(`${baseUrl}${path}`)
export const apiPost = async (path, data) => axiosInstance.post(`${baseUrl}${path}`,data)
