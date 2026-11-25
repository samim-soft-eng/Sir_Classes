import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Create() {
  const [name,setname] = useState("")
  const [email,setemail] = useState("")
  const [number,setnumber] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    const result = await axios.post("http://localhost:9800/create",{name,email,number}) // state ar name dite hobe
    console.log(result)
    navigate("/")
  }

  return (
    <div>
      <h1>User Create Section</h1>
      <form action="" onSubmit={handleSubmit}>
        <p>
          Name:
          <input type="text" name='name' onChange={(e)=>setname(e.target.value)} />
        </p>
        <p>
          Email:
          <input type="email" name='email' onChange={(e)=>setemail(e.target.value)} />
        </p>
        <p>
          Number:
          <input type="number" name='number' onChange={(e)=>setnumber(e.target.value)} />
        </p>

        <input type="submit" value={"Create"} />
      </form>
      
    </div>
  )
}

export default Create