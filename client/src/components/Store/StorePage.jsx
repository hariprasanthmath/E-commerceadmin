import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { requestroute } from '../../constants';
import { useEffect } from 'react';
import { useState } from 'react';
import Productcardview from '../Productcard/Productcardview';
import "./cardscontainer.css"
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react';
function StorePage(props) {
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {storename} = useParams();
    let {cartData} = useSelector((myStore)=> {return myStore});
    let [StoreEmail, setStoreEmail] = useState("");
    useEffect(()=>{
        getStoreData();
    },[])

    const [currentpageData, setCurrpageData] = useState();
    

    const getStoreData =  async () =>{
         let {data} = await axios.get(`${requestroute}store/${storename}`)
         console.log(data);
         setCurrpageData(data.allProducts);
         setStoreEmail(data.email)
    }

    const [userData, setUserData] = useState({
        name : "testname",
        phone : "1234567890",
        Address : "120 test",
        state : "test state",
        city : "test city",
        deliveryinstructions : "test instruction"
    });

   const designCart = {
    width:"40px",
    height:"40px",
    position:"fixed",
    bottom:"10px",
    right:"10px", 
    borderRadius:"4px",
    backgroundColor:"green"
    }
    
    const handleOrderSubmit = async ()=>{
        let orderData = {
            orderid : uuidv4(),
            cartData,
            userData,
            StoreEmail
            
        }
      
       try{

        let response = await axios.post(`${requestroute}store/neworder`, {
            orderData,
            headers : {
                'Content-Type' : 'application/json'
            }
        })


        console.log(orderData, response);
       }catch(err){
           console.log(err);
       }


      
        // onOpen();
    }

   

    return (
        <div style={{marginTop:"60px"}} className='cardscontainer'>
           {
            currentpageData?.map((eachProduct)=>{
                return (
                    <Productcardview {...eachProduct}/>
                    // <h1>hello</h1>
                )
            })
           }
        <div style={designCart} onClick={handleOrderSubmit}>cart</div>

        <Drawer onClose={onClose} isOpen={isOpen} size={"lg"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{` drawer contents`}</DrawerHeader>
          <DrawerBody>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Consequat nisl vel pretium lectus quam id. Semper quis lectus
              nulla at volutpat diam ut venenatis. Dolor morbi non arcu risus
              quis varius quam quisque. Massa ultricies mi quis hendrerit dolor
              magna eget est lorem. Erat imperdiet sed euismod nisi porta.
              Lectus vestibulum mattis ullamcorper velit.
            </p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

        </div>
    );
}

export default StorePage;

 // console.log(storename);

    // const [currpage, setCurr] = useState();

    // useEffect(()=>{
    //       setCurr(storename)
    // },[])

    

    // useEffect(()=>{
    //     getStoreData();
    // },[currpage])