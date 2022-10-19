import {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const[user,setUser] = useState('')
  const[password,setPassword] = useState('')
  const navigate = useNavigate()
  const auth = localStorage.getItem("token")

  const emailHandle = (e) => {
    setUser(e.target.value)
  }

  const passwordHandle = (e) => {
    setPassword(e.target.value)
  }

  const submitHandle = (e) =>{
    e.preventDefault()
    axios.post(`https://app.spiritx.co.nz/api/login`, {
      email: user, 
      password: password
    }).then((res) => {
      console.log(res.data)
      localStorage.setItem('token', res.data.token.token)
      navigate("/page")
    }).catch((err) => {
      console.log(err)
      navigate("/")
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
     </form>
    </div>
  )
}
export default Login