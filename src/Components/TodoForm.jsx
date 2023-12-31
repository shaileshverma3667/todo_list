import React, { useEffect, useState } from 'react'
import "./style/TodoForm.css"
import TodocompleteField from './TodocompleteField'
import { v4 as uuid } from 'uuid'

const TodoForm = () => {
    const [mainData,setMainData]=useState([])
    const [completeData,setCompleteData]=useState([])
    const [formData,setFormData]=useState({
        id:"abc",
        title:"",
        isPending:"",
        periority:""
    }) 
    const uniqueId = uuid()

    const handleChange=(e)=>{ 
        const {name,value}=e.target
        setFormData((prev)=>({...prev,id:uniqueId,[name]:value}))
    }
 
   const handleAdd=()=>{
        if(formData.title!="" && formData.periority!=""){
          setMainData(pre => [...pre,formData])
          setFormData({
          id:"abc",
          title:"",
          isPending:"",
          periority:""})
        }
        else 
        {
          return alert("Please fill the field")
        }
   }
   const handleSubmit=(e)=>{
       e.preventDefault()
       
   }
 const clearData=()=>{
    setCompleteData([])
 }
 useEffect(()=>{
   let data=JSON.parse(localStorage.getItem("mainData"))
   if(data)
   {
    setMainData(data)
   }
 },[])

 useEffect(()=>{
    localStorage.setItem("mainData",JSON.stringify(mainData))
 },[mainData])

  return (
    <>
    <div className='container'>
        <form onSubmit={handleSubmit}>
        <h2 className='text-secondary'>Todoes list</h2>
    <div className='field'>
    <input type='text' className='form-control w-50' value={formData.title} name="title" onChange={handleChange} placeholder='Enter Title...'/>
    <select className='form-control w-25' value={formData.periority} name="periority" onChange={handleChange}>
        <option>Select...</option>
        <option value="danger">high</option>
        <option value="info">medium</option>
        <option value="secondary">low</option>
    </select>
    <button className='btn btn-success' onClick={handleAdd}>Add</button>
    </div>

    <div>
    <TodocompleteField mainData={mainData} setMainData={setMainData}  clearData={clearData} completeData={completeData} setCompleteData={setCompleteData}/>
    </div>
    </form>
    </div>
    </>
  )
}

export default TodoForm