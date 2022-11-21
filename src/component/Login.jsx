import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { apiPost } from './Service';
import SpamBar from './Table/SpamBar';
import {snackBarParam} from './Page';

import { updateServiceAPIUrl } from './Service';
import { updateInterceptorsURL } from './Interceptor';
//import { consoleLog } from './Service';

// export let URLLink = "http://localhost:8000/api/"
// export let picturesURL = "http://localhost:8000/storage/"
// export let localAPI = true;
 let URLLink = ""
 let picturesURL = ""
 let localAPI;

const Login = () => {
  const[user,setUser] = useState('')
  const[password,setPassword] = useState('')
  const navigate = useNavigate()
  const [con, setCon] = useState(false)
  const auth = localStorage.getItem("token")

  const emailHandle = (e) => {
    setUser(e.target.value)
  }

  const passwordHandle = (e) => {
    setPassword(e.target.value)
  }

  const [APISourse, setAPISourse] = useState("Local")

  const switchAPI = (e) => {
    e.preventDefault()
    if (APISourse == "Local") {
      setAPISourse("Remote")
      localStorage.setItem("URLLink", "https://app.spiritx.co.nz/api/")
      localStorage.setItem("picturesUR", "https://app.spiritx.co.nz/storage/")
      localAPI = false;
      localStorage.setItem("localAPI", false)
    } else {
      setAPISourse("Local")
      localStorage.setItem("URLLink", "http://localhost:8000/api/")
      localStorage.setItem("picturesUR", "http://localhost:8000/storage/")
      localAPI = true;
      localStorage.setItem("localAPI", true)
    }
  }

  // useEffect(() => {
  //   if (localStorage.getItem("localAPI") == "true") {
  //     setAPISourse("local")
  //   } else {
  //     setAPISourse("remote")
  //   }
  // },)

  const consoleLog = () => {
    console.log(URLLink)
    console.log(picturesURL)
    console.log(localAPI)
  }

  const submitHandle = (e) =>{
    e.preventDefault()

    // if (localAPI) {
    //   URLLink = "http://localhost:8000/api/"
    //   picturesURL = "http://localhost:8000/storage/"
    //   consoleLog()
    // } else {
    //   URLLink = "https://app.spiritx.co.nz/api/"
    //   picturesURL = "https://app.spiritx.co.nz/storage/"
    //   consoleLog()
    // }

    updateServiceAPIUrl(localStorage.getItem("localAPI"))
    updateInterceptorsURL(localStorage.getItem("localAPI"))


    apiPost(`login`, {
      email: user, 
      password: password
    }).then((res) => {
      console.log(res.data)
      if(res.data){
        if (localStorage.getItem("localAPI") === "true"){
          localStorage.setItem('token', res.data.token)
        } else{
          localStorage.setItem('token', res.data.token.token)
        }

          setCon(true)
        
          navigate("./page")
          snackBarParam.errorFeedback = false
          snackBarParam.severityState = "success"
        
      }
      setCon(true)
    })  
  }

  useEffect(() =>{
    auth? navigate("/page"):navigate("/")
  },[auth])

  
  return (
    <div>Login
     <form  onSubmit={(e) => submitHandle(e)}>
        <label htmlFor="email">email</label>
        <input type="email" id='email' onChange={emailHandle}/>
        <label htmlFor="password">password</label>
        <input type="password" id='password' onChange={passwordHandle}/>
        <button type='submit'>submit</button>

        <SpamBar setOpen={setCon} open={con} />
     </form>
     <form>
      <p>{APISourse}</p>
      <button onClick={switchAPI}>Switch API</button>
     </form>
    </div>
  )
}
export default Login