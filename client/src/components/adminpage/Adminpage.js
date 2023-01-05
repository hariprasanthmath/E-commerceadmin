import React, { useEffect } from 'react';
import { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { requestroute } from '../../constants';
import axios from 'axios';
import EachProduct from './EachProduct';
import { Box } from '@chakra-ui/react';
function Adminpage(props) {

    let [data, setdata] = useState([]);

    // get all the products
    useEffect(()=>{
        getUserProducts();
    },[])

    const getUserProducts = async ()=>{
        try{
            let response = await axios.get(`${requestroute}products`);
            console.log(response.data);
            setdata(response.data);
        }catch(err){
            console.log(err);
        }
        
    }
    
    return (
        <>
           <Navbar/>
           <Box width={"80%"} margin="auto"> 
           {
            data.map((eachProd)=>{
              return <EachProduct {...eachProd} />
            })
           }
           </Box>
        </>
    );
}

export default Adminpage;