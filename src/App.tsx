import React,{useEffect,useState} from 'react';
import './App.css';
import {Edit} from './Component/Edit'
import { Create } from './Component/Create';
import { Nav } from './Component/Nav'
import { Home } from './Component/Home'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import axios from 'axios'


function App() {
  const [data,setData]= useState<dataType[]>([])
 
   
    useEffect(()=>{
        axios.get('https://6322f98aa624bced30834917.mockapi.io/api/user')
        .then(res=>{
          console.log("app");
            setData(res.data)
        })
        .catch(err=>{
            console.log(err);

        })
    },[])

  return (
    <div className='bg-yellow-50 h-screen '>

      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home data={data} setData={setData} />} />
          <Route path="/create" element={<Create data={data} setData={setData}  />} />
          <Route path='/edit' element={<Edit data={data} setData={setData} />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
