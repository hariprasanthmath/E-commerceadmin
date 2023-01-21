import React, { useEffect } from 'react';
import { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { requestroute } from '../../constants';
import axios from 'axios';
import EachProduct from './EachProduct';
import { Box, Flex, Center, Square, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getDatafrombackend } from '../../redux/actions/action';
import { Store } from '../../redux/store';
import Cookies from 'universal-cookie';
import { setLoginTrue } from '../../redux/actions/action';
import { useNavigate } from 'react-router-dom';
import Admindashboard from '../admindashboard/Admindashboard';
import { Outlet } from 'react-router-dom';
import { setjwtToken } from '../../redux/actions/action';
function Adminpage(props) {

    // let [data, setdata] = useState(useSelector((State)=>{ return State.productData}));
    let data = useSelector((State)=>{ return State.productData});

    let dispatch = useDispatch();
    
    let cookies = new Cookies();
    const navigate = useNavigate();
    const handlelogout = ()=>{
       cookies.remove("jwt", {path:"/"});
       setLoginTrue(dispatch, false)
       navigate("/")
    }

    // let cookies = new Cookies();
    // let dispatch = useDispatch();
    // let navigate = useNavigate();


    // useEffect(()=>{
    //     let token = cookies.get('jwt');
    //     if(token){
    //         setLoginTrue(dispatch, true)
    //         setjwtToken(dispatch, token);
    //         console.log("setting login");
    //     //    navigate('/admin');
    //     }
    // },[])

    let [tokenstate, setToken] = useState("");
    // let cookies = new Cookies();
    // let dispatch = useDispatch();

   useEffect(()=>{
    let token = cookies.get('jwt');
    // console.log(token);
    if(token){
        setLoginTrue(dispatch, true)
        setToken(token);
    }
   },[])
    
    
    // get all the products
    useEffect(()=>{
        
            getUserProducts();

    },[tokenstate])

    const getUserProducts = async ()=>{
        // console.log(tokenstate+"  token state");
        try{
            let {data} = await axios.get(`${requestroute}adminproducts`,{
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : "Bearer "+  tokenstate
                }
            });
            //  console.log(data);
            getDatafrombackend(dispatch, data)
            
        }catch(err){
            console.log(err);
        }
        
    }
    
    return (
        <>
           {/* <Navbar/> */}
           <Flex color='black'>
           <Box flex='1' bg='' maxW={"280px"}>
                  <Admindashboard/>
               </Box>
               
               <Box flex='4' bg=''>
                  <Outlet/>
               </Box>
          </Flex>

           
           
          
           <button onClick={handlelogout}>logout</button>
        </>
    );
}



export default Adminpage;