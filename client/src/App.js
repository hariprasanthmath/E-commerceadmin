

import React from 'react';
import Allroutes from './routes/Allroutes';
import RouterProvider from "react-dom"
import { BrowserRouter } from 'react-router-dom';
import {Provider} from "react-redux";
import { Store } from './redux/store';
function App() {

 
  return (
    
    // <BrowserRouter>
     <>
        <Provider store={Store}>
           <Allroutes/>
        </Provider> 
    // {/* </BrowserRouter> */}
    </>

   
    
  );
}

export default App;
