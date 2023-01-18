

import React from 'react';
import Allroutes from './routes/Allroutes';
import RouterProvider from "react-dom"
import { BrowserRouter } from 'react-router-dom';
import {Provider} from "react-redux";

function App() {

  const login = false;
  return (
    
    
     <>
          {login ? <Allroutes/> : <>hello</>} 
    </>

   
    
  );
}

export default App;
