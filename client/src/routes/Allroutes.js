import React, {useEffect} from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import Adminpage from '../components/adminpage/Adminpage';
import Cookies from 'universal-cookie';
import { setLoginTrue } from '../redux/actions/action';

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
//   Route,
  Link,
} from "react-router-dom";
import { setjwtToken } from '../redux/actions/action';
import CreateProduct from '../components/Postpage/CreateProduct';
import Navbar from '../components/Navbar/Navbar';
import StarterNavbar from '../components/Navbar/StarterNavbar';
import { ChakraProvider } from '@chakra-ui/react';
import LandingPage from '../components/LandingPage/LandingPage';
import Loginpage from '../components/loginRegister/Loginpage';
import RegistrationPage from '../components/loginRegister/RegistrationPage';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Productadmin from '../components/Productadmin/Productadmin';
// import Adminpage from '../components/adminpage/Adminpage';
import Profile from "../components/Profile/Profile";
import { sidemenu } from '../constants';
import AdminLogout from '../components/Logout/AdminLogout';
import Userview from '../components/userview/Userview';
import StorePage from '../components/Store/StorePage';

function Allroutes(props) {

    const login = useSelector(myStore => {return myStore.login});
    let cookies = new Cookies();
    let dispatch = useDispatch();
    let navigate = useNavigate();


    useEffect(()=>{
        let token = cookies.get('jwt');
        if(token){
            setLoginTrue(dispatch, true)
            setjwtToken(dispatch, token);
            console.log("setting login");
           navigate('/admin');
        }
    },[])

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
             {login ? <Navbar/> : <StarterNavbar/>}
           </ChakraProvider>
           <Routes>
            <Route path="/" element={login ? <Navigate to={"/admin"}/> : <ChakraProvider> <LandingPage/> </ChakraProvider>}></Route>
            <Route path="/login" element={<ChakraProvider> <Loginpage/> </ChakraProvider>}></Route>
            <Route path="/logout" element={<ChakraProvider> <AdminLogout/> </ChakraProvider>}></Route>
            <Route path="/register" element={<ChakraProvider> <RegistrationPage/> </ChakraProvider>}></Route>
            
            {/* <Route path="/admin" element={<Navigate to={"/admin"}/>}></Route> */}
                {/* <Route path="/admin" element={ }></Route> */}
                <Route path="/create" element={<ChakraProvider><CreateProduct/></ChakraProvider> }></Route>
                <Route path='/admin' element={<ChakraProvider><Adminpage/></ChakraProvider>}>
                        <Route path='' element={<Navigate to="profile"/>}></Route>
                        
                        <Route path="profile" element={<Profile/>}></Route>
                        <Route path="analytics" element={<>analytics</>}></Route>
                        <Route path="products" element={<Productadmin/>}></Route>
                        <Route path="create" element={<ChakraProvider><CreateProduct/></ChakraProvider>}></Route>
                        <Route path="orders" element={<>orders page</>}></Route>
                        <Route path="userview" element={<Userview/>}></Route>
                       
                </Route>
                <Route path="/store">
                            <Route path=":storename" element={<StorePage/>}>
                                
                            </Route>
                </Route>
                
                
            {/* <Route path="/admin" element={<ChakraProvider> <Adminpage/> </ChakraProvider>}></Route> */}
            {/* <Route path="/store" element={<ChakraProvider><CreateProduct/></ChakraProvider> }></Route> */}
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