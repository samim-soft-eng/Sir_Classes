import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'

function User() {
  const [api,setapi] = useState([])
  useEffect(()=>{
        async function getdata() {
            const data=await axios.get("http://localhost:9800/")
            console.log(data.data.data) 
            setapi(data.data.data)   
        }
        getdata()
    },[])

    const handledelete= async(id)=>{
      console.log(id)
      const data = await axios.delete("http://localhost:9800/delete/"+id)
      window.location.reload()
    }
    const navigate = useNavigate()

    const handleupdate= (id)=>{
      navigate('/update/${id}')
    }
  return (
    <div>
        <h1>User All Data</h1>
        <NavLink to={"/create"}>Create</NavLink>
        <table border={1}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>Action</th>
          </tr>
        {
          api.map((item,id)=>(
            <tr>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.number}</td>
              <td>
                <button onClick={()=>handleupdate(item._id)}>Edit</button>
                <button onClick={()=>handledelete(item._id)}>Delete</button>
              </td>
            </tr>

          ))
        }
        </table>
    </div>
  )
}

export default User