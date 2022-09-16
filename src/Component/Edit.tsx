import {FormEvent, useState, useEffect } from "react"
import {useSearchParams,useNavigate} from "react-router-dom"
import axios from "axios"


type dataprop = {
    data: dataType[],
    setData: React.Dispatch<React.SetStateAction<dataType[]>>
}

export const Edit=(props: dataprop)=>{
    console.log("edit");
    const [data, setData] = useState<dataType>()
    const [params] = useSearchParams()
    let id = params.get("id")
    const[name,setName]= useState(data?.name)
    const [email,setEmail]=useState(data?.email)
    const [contact,setContact]=useState(data?.phone)
    const navigate=useNavigate()
    useEffect(()=>{
        axios.get('https://6322f98aa624bced30834917.mockapi.io/api/user/'+id)
        .then(res=>{
          console.log(res.data);
            setData(res.data)
        })
        .catch(err=>{
            console.log(err);

        })
    },[id])

    const updateHandler=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        axios.put('https://6322f98aa624bced30834917.mockapi.io/api/user/'+id,{
            id:id,
            name:name,
            email:email,
            phone:contact


        })
        .then(res=>{
            let newData = props.data.filter(val => Number(val.id) !== Number(res.data.id))
            props.setData([...newData,res.data])
            navigate('/')
        })
    }
    const deleteHandler=(id:number)=>{
        axios.delete('https://6322f98aa624bced30834917.mockapi.io/api/user/'+id)
        .then((res)=>{
            let delData=props.data.filter(val=>Number(val.id)!==res.data.id)
            props.setData([...delData])
            navigate('/')
            
            
        }
        
        )
    }

 
    

    return(
<>{ data &&
        <div className="w-full bg-blue-400 h-screen flex items-center ">
            <form className="w-1/5 bg-slate-300 rounded shadow-2xl p-4 mx-auto" onSubmit={updateHandler}>
                <div className="mt-3">
                    <label className="font-extrabold">Name </label><br />
                    <input className="mt-2 h-10 w-full" type={'text'} defaultValue={data.name} onChange={(e)=>setName(e.target.value)}></input>
                </div>
                <div className="mt-3">
                    <label className="font-extrabold">Email </label><br />
                    <input className="mt-2 h-10 w-full" type={'text'} defaultValue={data.email} onChange={(e)=>setEmail(e.target.value)}></input>
                </div>
                <div className="mt-3">
                    <label className="font-extrabold">Contact </label><br />
                    <input className="mt-2 h-10 w-full" type={'number'} defaultValue={data.phone} onChange={(e)=>setContact(Number(e.target.value))}></input>
                </div>
                <div className="flex justify-end space-x-3 mt-5" >
                    <button className="p-3 bg-[#64686e] rounded " >Update</button>
                    <button className="p-3 bg-red-500 rounded" onClick={()=>deleteHandler(data.id)}>Delete</button>
                </div>

            </form>
        </div>}
        </>
    )
}