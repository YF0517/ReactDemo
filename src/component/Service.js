import axios from 'axios';
import {setupAxiosInstance} from './Interceptor'

const baseUrl =  "https://app.spiritx.co.nz/api/"

const axiosInstance = setupAxiosInstance(axios.create())

export const apiGet = async path => axiosInstance.get(`${baseUrl}${path}`)
export const apiPut = async (path, data) => axiosInstance.put(`${baseUrl}${path}`,data)
export const apiDelet = async path => axiosInstance.delete(`${baseUrl}${path}`)
export const apiPost = async (path, data) => axiosInstance.post(`${baseUrl}${path}`,data)