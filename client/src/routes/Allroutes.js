import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import Adminpage from '../components/adminpage/Adminpage';

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
//   Route,
  Link,
} from "react-router-dom";
import CreateProduct from '../components/Postpage/CreateProduct';
import Navbar from '../components/Navbar/Navbar';
function Allroutes(props) {

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <Navigate to={"/admin"} />
            )
        },
        {
            path: "/admin",
            element: (
                <Adminpage/>
            )
        },
        {
            path: "/create",
            element: (
                <CreateProduct/>
            )
        }
    ])
    return (
       
       
        // <Routes>
        //     <Route path="/" element={<Navigate to={"/admin"} />}></Route>
        //     <Route path="/admin" element={<Adminpage/>}></Route>
        // </Routes>
        // <Adminpage/>
         <>
           <RouterProvider router={router}/>
      </>
       
        
    );
}

export default Allroutes;