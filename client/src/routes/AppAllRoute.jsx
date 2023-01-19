import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import Adminpage from '../components/adminpage/Adminpage';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from '../components/Navbar/Navbar';
import CreateProduct from '../components/Postpage/CreateProduct';
function AppAllRoute(props) {
    return (
        <div>
            <ChakraProvider>
            <Navbar/>
             <Routes>
                
             </Routes>
           </ChakraProvider>
        </div>
    );
}

export default AppAllRoute;