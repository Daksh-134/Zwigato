import { body } from 'express-validator';
import React, { useState } from 'react'
import { Link,useNavigate} from 'react-router-dom';
import Login from './Login';
export default function signup() {
  let navigate=useNavigate()
// Use state so that website does not have to reload again and again
  const [Credentials,setCredentials]=useState({Name:"",Email:"",Password:"",Location:""})
// On change event listener as value remains blank(static) without it.
  const handleSubmit = async(e)=>{
      e.preventDefault();
      const response= await fetch("http://localhost:3000/api/CreateUser",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          Name:Credentials.Name,
          Email:Credentials.Email,
          Password:Credentials.Password,
          Location:Credentials.Location
        })
      })
      const json=await response.json()
      console.log(json)
      if(!json.success){
        alert("Enter Valid Credentials")
      }
      if(json.success){
        navigate("/")
      }
  }
  const onChange=(event)=>{
    setCredentials({...Credentials,[event.target.name]:event.target.value})
  }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="Name" className="form-control" id="exampleInputName1" name='Name' value={Credentials.Name} onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='Email' value={Credentials.Email} onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name='Password' value={Credentials.Password} onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input type="location" className="form-control" id="exampleInputLocation1" name='Location' value={Credentials.Location} onChange={onChange}/>
        </div>
        <button type="submit" className="m-3 btn btn-success">Submit</button>
        <Link className="m-3 btn btn-danger" to="/Login">Already a User</Link>
      </form>
    </div>
  )
}
