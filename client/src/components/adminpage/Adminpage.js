import React, { useEffect } from 'react';
import { useState } from 'react';

import { requestroute } from '../../constants';
import axios from 'axios';

import { Box, Flex, useMediaQuery } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { getDatafrombackend } from '../../redux/actions/action';

import Cookies from 'universal-cookie';
import { setLoginTrue } from '../../redux/actions/action';

import Admindashboard from '../admindashboard/Admindashboard';
import { Outlet } from 'react-router-dom';

function Adminpage(props) {

    // let [data, setdata] = useState(useSelector((State)=>{ return State.productData}));

    const [isLargerThan500] = useMediaQuery('(min-width: 766px)');

   

    let dispatch = useDispatch();
    
    let cookies = new Cookies();
    


   


    let [tokenstate, setToken] = useState("");
 

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
          
           <Flex color='black' marginTop={"60px"}>
            {
                isLargerThan500 ? 
                <Box flex='1' bg='' maxW={"280px"}>
              <Admindashboard/>
                 
               </Box> : <></>
            }
           
               <Box flex='4' bg=''>
                  <Outlet/>
               </Box>
          </Flex>
        </>
    );
}



export default Adminpage;