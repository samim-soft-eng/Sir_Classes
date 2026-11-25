import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function Update() {
  const {id} = useParams()
  const [name,setname] = useState("")
    const [email,setemail] = useState("")
    const [number,setnumber] = useState("")
  
    const navigate = useNavigate()

    const getapi = async ()=>{
      const result = await axios.get("http://localhost:9800/update/"+id)
      setname(result.data.data,name)
      setemail(result.data.data,email)
      setnumber(result.data.data,number)
    }
  
    const handleSubmit = async(e) => {
      e.preventDefault()
      const result = await axios.post("http://localhost:9800/create",{name,email,number}) // state ar name dite hobe
      console.log(result)
      navigate("/")
    }

    useEffect(()=>{
      getapi()
    },[])
  
    return (
      <div>
        <h1>User Update Section</h1>
        <form action="" onSubmit={handleSubmit}>
          <p>
            Name:
            <input type="text" name='name' value={name} onChange={(e)=>setname(e.target.value)} />
          </p>
          <p>
            Email:
            <input type="email" name='email' value={email} onChange={(e)=>setemail(e.target.value)} />
          </p>
          <p>
            Number:
            <input type="number" name='number' value={number} onChange={(e)=>setnumber(e.target.value)} />
          </p>
  
          <input type="submit" value={"Update"} />
        </form>
        
      </div>
    )
}

export default Update