import React from 'react';
import { Box, Input, Button, Text, HStack } from '@chakra-ui/react';
import "./trackorder.css"
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import axios from 'axios';
import { requestroute } from '../../constants';
import { findCartTotal } from '../../utils/findCartTotal';
import "../OrdersPage/order.css"
function TrackOrderPage(props) {

    const [orderdata, setOrderdata] = useState({});
    let inputref = useRef();
    
    


    const handleSearch = async ()=>{
       try{

        let orderid = inputref.current.value
        console.log(orderid);
        let {data} = await axios.get(`${requestroute}cart/orderstatus/${orderid}`);
        console.log(data);
        setOrderdata(data);

       }catch(err){
        console.log(err);
       }

    }

    // useEffect(()=>{
        
    // },[orderid])

    
    return (
        <>
        <Box className='trackOrdersearch'>
            <Input ref={inputref} placeholder='Enter Order Id'>
               
            </Input>
            <Button onClick={handleSearch}>Track Order</Button>

        </Box>
       {
         Object.keys(orderdata).length > 0 ? 

         // starts
         <Box className= {"eachorderbox"}>
         <HStack className='marginbottom10'>

         <p> <span className='littlebold'>Order ID : </span>{orderdata.orderid}</p>

         <p><span className='littlebold'>Status</span> <span className={'paddingbox radius4 status' + orderdata.status}>{orderdata.status}</span></p>
         </HStack>
        
        <HStack
         overflowX="scroll"
         className='marginbottom10'
        >
         {
             orderdata.cartData.map((eachProduct)=>{
                 return (
                     
                        
                         <img src={eachProduct.image} style={{width:"100px"}}></img>
                      
                     
                 )
             })
         } 
          </HStack>
        
        {/* {
         orderdata.status === "delivered" ? <></> :
         <Button  onClick={()=>changeOrderStatus(orderStatus[eachOrder.status].nextStatus, eachOrder.orderid)}>{orderStatus[eachOrder.status].text}</Button> 
        } */}

        <Text>$ {findCartTotal(orderdata.cartData)}</Text>
        
     </Box>

     // ends

         : 
         <></>
       }
        </>
    );
}

export default TrackOrderPage;