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
import StarterNavbar from '../components/Navbar/StarterNavbar';
import { ChakraProvider } from '@chakra-ui/react';
import LandingPage from '../components/LandingPage/LandingPage';
import Loginpage from '../components/loginRegister/Loginpage';
import RegistrationPage from '../components/loginRegister/RegistrationPage';
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
       
       <div>
           <ChakraProvider>
             <StarterNavbar/>
           </ChakraProvider>
           <Routes>
            <Route path="/" element={<ChakraProvider> <LandingPage/> </ChakraProvider>}></Route>
            <Route path="/login" element={<ChakraProvider> <Loginpage/> </ChakraProvider>}></Route>
            <Route path="/register" element={<ChakraProvider> <RegistrationPage/> </ChakraProvider>}></Route>
            {/* <Route path="/admin" element={<ChakraProvider> <Adminpage/> </ChakraProvider>}></Route> */}
           </Routes>
           <ChakraProvider>
             
           </ChakraProvider>
       </div>
       
        // <Adminpage/>
        //  <div>
        //      {/* <StarterNavbar/> */}
        //      {/* <Navbar/> */}
        //     <RouterProvider router={router}/>  
        //  </div>

           
      
       
        
    );
}

export default Allroutes;