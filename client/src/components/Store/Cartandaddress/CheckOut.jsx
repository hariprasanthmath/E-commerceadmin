import React from 'react';
import { Box, VStack, Input, FormLabel, Textarea, Heading, Text, Button } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { requestroute } from '../../../constants';
import { useState } from 'react';
import { findCartTotal } from '../../../utils/findCartTotal';
import { useEffect } from 'react';
import { removeCartData } from '../../../redux/actions/action';
import { useDispatch } from 'react-redux';
function CheckOut({StoreEmail}) {

    let {cartData} = useSelector((myStore)=> {return myStore});
    const [cartTotal, setCartTotal] = useState(0);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        name : "",
        email : "",
        phone : "",
        address : "",
        state : "",
        city : "",
        deliveryinstructions : ""
    });
   

    const handleAddressEdit = (e) =>{

        let {name, value} = e.target;
        setUserData({
            ...userData,
            [name] : value
        })
    }
    
   
    const handleOrderSubmit = async ()=>{
        let orderData = {
            orderid : uuidv4(),
            cartData,
            userData,
            StoreEmail
            
        }

        console.log(orderData);
      
       try{

        let response = await axios.post(`${requestroute}store/neworder`, {
            orderData,
            headers : {
                'Content-Type' : 'application/json'
            }
        })


        console.log(orderData, response);
        
        removeCartData(dispatch);
        // resetCart();

       }catch(err){
           console.log(err);
       }


      
        // onOpen();
    }

    const cartTotalHandler = () =>{
        let totalvaluecalculated = findCartTotal(cartData);
        setCartTotal(totalvaluecalculated)
    }

    useEffect(()=>{
       cartTotalHandler();
    },[cartData])
    useEffect(()=>{
        cartTotalHandler();
     },[])

    return (

       
             <VStack onChange={handleAddressEdit}>
                   
                   <FormLabel>Enter Details</FormLabel>
                   <Input name="name" size="sm" placeholder="Enter You name" ></Input>
                   {/* <FormLabel>Address</FormLabel> */}
                   <Input name="email" size="sm" placeholder="Enter You email"></Input>
                   <Input name="phone" size="sm" placeholder="Enter You phone"></Input>
                   <Input name="address" size="sm" placeholder="Enter You Address"></Input>
                   {/* <FormLabel>State</FormLabel> */}
                   <Input name="state" size="sm" placeholder="Enter You state"></Input>
                   {/* <FormLabel>City</FormLabel> */}
                   <Input name="city" size="sm" placeholder="Enter You City"></Input>
                   <Textarea
                       
                       name = "deliveryinstructions"
                       placeholder='deliveryinstructions'
                       size='sm'
                      />

                      <Box>
                        <Text> {cartTotal}</Text>
                        <Button onClick={handleOrderSubmit}>Place Order</Button>
                      </Box>
                   
             </VStack>
     

    );
}

export default CheckOut;