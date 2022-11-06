import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { apiPost } from './Service';
import SpamBar from './Table/SpamBar';
import {snackBarParam} from './Page'

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

  const submitHandle = (e) =>{
    e.preventDefault()
    apiPost(`login`, {
      email: user, 
      password: password
    }).then((res) => {
      console.log(res.data)
      if(res.data){
          localStorage.setItem('token', res.data.token.token)
          setCon(true)
        
          navigate("./page")
          snackBarParam.errorFeedback = false
          snackBarParam.severityState = "success"
        
      }
      setCon(true)
    })
    // .catch((err) => {
    //   console.log(err)
    //   navigate("/")
    // })
    
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
    </div>
  )
}
export default Login