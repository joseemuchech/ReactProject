import axios from "axios";
import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";



const Add = () =>{
 const [book, setBook] = useState({
    title:"",
    desc:"",
    cover:"",
    price:"null"
 });

 const navigate = useNavigate()

const handleChange = (e)=>{
    setBook((prev)=> ({ ...prev, [e.target.name]: e.target.value}));
};

const handleClick = async e => {
    e.preventDefault()
    try{
     await axios.post("http://localhost:3001/books", book)
navigate("/");
    }catch(err){
           console.log(err);

    }
}

    return (
       <div className="form">
        <h1>Add New Book</h1>
        <input type="text" placeholder="Title" onChange={handleChange} name="title"/>
        <input type="text" placeholder="Desc" onChange={handleChange} name="desc"/>
        <input type="text" placeholder="Cover" onChange={handleChange} name="cover"/>
        <input type="number" placeholder="Price" onChange={handleChange} name="price"/>
<button className="formButton" onClick={handleClick}>Add</button>

       </div>

    )
}

 export default Add