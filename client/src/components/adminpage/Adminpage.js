import React, { useEffect } from 'react';
import { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { requestroute } from '../../constants';
import axios from 'axios';
import EachProduct from './EachProduct';
import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getDatafrombackend } from '../../redux/actions/action';
import { Store } from '../../redux/store';
function Adminpage(props) {

    // let [data, setdata] = useState(useSelector((State)=>{ return State.productData}));
    let data = useSelector((State)=>{ return State.productData});

    let dispatch = useDispatch();
    
    
    // get all the products
    useEffect(()=>{
        getUserProducts();
    },[])

    const getUserProducts = async ()=>{
        try{
            let {data} = await axios.get(`${requestroute}products`);
            // console.log(data);
            getDatafrombackend(dispatch, data)
            
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
              return <Box key={eachProd._id}> <EachProduct {...eachProd} getProductFunction={getUserProducts}/> </Box>
            })
           }
           </Box>
        </>
    );
}

export default Adminpage;