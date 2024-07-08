import {React,useState} from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { Link,useNavigate} from 'react-router-dom';
export default function Login() {
  const [Credentials,setCredentials]=useState({Email:"",Password:""})
  let navigate=useNavigate()
  // Redirect to Home
  const handleSubmit = async(e)=>{
      e.preventDefault();
      const response= await fetch("http://localhost:3000/api/loginUser",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          Password:Credentials.Password,
          Email:Credentials.Email
        })
      })
      const json=await response.json()
      console.log(json)
      if(!json.success){
        alert("Enter Valid Credentials")
      }
      else{
        localStorage.setItem("userEmail",Credentials.Email)
        localStorage.setItem("authToken",json.authToken)
        navigate("/")
      }
  }
  const onChange=(event)=>{
    setCredentials({...Credentials,[event.target.name]:event.target.value})
  }
  return (
    <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
      <div>
        <Nav/>
      </div>
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='Email' value={Credentials.Email} onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name='Password' value={Credentials.Password} onChange={onChange}/>
        </div>
        <button type="submit" className="m-3 btn btn-success">Log In</button>
        <Link className="m-3 btn btn-danger" to="/sign-up">New User</Link>
      </form>
    </div>
  </div>
  );
}
