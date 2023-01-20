import React, { useEffect } from 'react';
import { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { requestroute } from '../../constants';
import axios from 'axios';
import EachProduct from '../adminpage/EachProduct';
import { Box, Flex, Center, Square, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getDatafrombackend } from '../../redux/actions/action';
import { Store } from '../../redux/store';
import Cookies from 'universal-cookie';
import { setLoginTrue } from '../../redux/actions/action';
import { useNavigate } from 'react-router-dom';
import Admindashboard from '../admindashboard/Admindashboard';

function Productadmin(props) {

    let data = useSelector((State)=>{ return State.productData});

    let dispatch = useDispatch();
    
    let cookies = new Cookies();
    const navigate = useNavigate();
    const handlelogout = ()=>{
       cookies.remove("jwt", {path:"/"});
       setLoginTrue(dispatch, false)
       navigate("/")
    }

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
        {
            data.length > 0 ?
            <Box width={"80%"} margin="auto"> 
           
           {

            data.map((eachProd)=>{
              return <Box key={eachProd._id}> <EachProduct {...eachProd} getProductFunction={getUserProducts}/> </Box>
            })
           }
           </Box> : 
           <Box>
              <h1>
                add products to store
              </h1>
           </Box>
           }
        </>
    );
}

export default Productadmin;