

import React from 'react';
import Allroutes from './routes/Allroutes';
import RouterProvider from "react-dom"
import { BrowserRouter, useNavigate } from 'react-router-dom';
import {Provider} from "react-redux";
import AppAllRoute from './routes/AppAllRoute';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setLoginTrue } from './redux/actions/action';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
function App() {

  const login = useSelector(myStore => {return myStore.login});
//   const cookies = Cookies();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   useEffect(()=>{
//     let token = cookies.get('jwt');
//     if(token){
//         setLoginTrue(dispatch)
//     console.log("setting login");
//        navigate('/admin');
//     }
// },[])
  return (
    
    
     <>
           <Allroutes/>
    </>

   
    
  );
}

export default App;
