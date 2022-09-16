import axios from 'axios'
import { FormEvent,  useState} from 'react'
import {useNavigate} from "react-router-dom"

type dataprop={
    data:dataType[],
    setData:React.Dispatch<React.SetStateAction<dataType[]>>
}

export const Create=(props:dataprop)=>{
const navigate= useNavigate()

   const[name,setName]= useState('')
   const [email,setEmail]=useState('')
   const [contact,setContact]=useState(0)

   const submitHandler=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    axios.post('https://6322f98aa624bced30834917.mockapi.io/api/user',{
        id:props.data.length+1,
        name:name,
        email:email,
        phone:contact
    })
    .then(res=>{
        console.log(res);
        
        props.setData([...props.data,res.data])
        navigate("/")
    })
    .catch(err=>{
        console.log(err);
        
    })
   }

    return (
        <div className=" w-full h-full flex items-center">
            <form className="container rounded bg-slate-200 shadow-2xl w-1/4 mx-auto p-3  space-y-2" onSubmit={submitHandler}>
                <div className="mx-8 mt-3">
                <label className="text-black font-bold ">Name :</label><br/>
                <input type={"text"} placeholder={'Enter Your Name'} className='w-full h-10 text-lg mt-2' defaultValue={name} onChange={(e)=>setName(e.target.value)} ></input>
                </div>
                <div className="mx-8">
                <label className="text-black font-bold">Email :</label><br />
                <input type={"mail"} placeholder={'Enter Your Email-id'} className='w-full h-10 text-lg mt-2' defaultValue={email} onChange={(e)=>setEmail(e.target.value)}  ></input>
                </div>
                <div className="mx-8">
                <label className="text-black font-bold">phone :</label><br/>
                <input type={"number"} placeholder={'Enter Your phoneNumber'} className='w-full mt-2 h-10 text-lg' defaultValue={contact} onChange={(e)=>setContact(Number(e.target.value))} ></input>
                </div>
                {/* <div className="w-full">
                <button className="relative left-full -translate-x-full">submit</button>
                </div>
             */}
             <div className="mx-8 flex justify-end">
                <button className="bg-red-400 p-2 mt-2 rounded " >Submit</button>
             </div>

            </form>

        </div>

    )
}