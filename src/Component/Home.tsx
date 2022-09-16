import { useNavigate } from 'react-router-dom'

import axios from 'axios'
type dataprop = {
    data: dataType[],
    setData: React.Dispatch<React.SetStateAction<dataType[]>>
}

export const Home = (props: dataprop) => {
    const navigate = useNavigate()
    const editHandler = ((id:number) => {

        navigate('/edit?id='+id)
    })
     const deleteHandler=(id:number)=>{
        axios.delete('https://6322f98aa624bced30834917.mockapi.io/api/user/'+id)
        .then((res)=>{
            let delData=props.data.filter(val=>val.id !==res.data.id)
            props.setData([...delData])
        })
     }
    return (
        <div className="w-full h-full  bg-red-500 ">
            <div className="overflow-y-auto w-full pt-20">
                <div className="w-full grid grid-cols-3 p-3 gap-2 ">
                    {
                        props.data.map((e) => {
                            return (
                                <div className="col-span-1 bg-white p-3 rounded" key={e.id}>
                                    <p>Name: {e.name}</p>
                                    <p>email: {e.email}</p>
                                    <p>Contect: {e.phone}</p>
                                    <div className="flex justify-end space-x-3">
                                        <button className="bg-green-400 p-3 rounded" onClick={() => editHandler(e.id)}>Edit</button>
                                        <button className="bg-red-600 p-3 rounded" onClick={()=>deleteHandler(e.id)}>Delete</button>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>

        </div>
    )
}