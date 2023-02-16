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
import { Button, Box, Stack, useMediaQuery} from '@chakra-ui/react';
import StoreNavbar from './StoreNavbar';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'
  import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import Cart from './Cartandaddress/Cart';
import CheckOut from './Cartandaddress/CheckOut';

function StorePage(props) {
    
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)')
    const {storename} = useParams();
    let {cartData} = useSelector((myStore)=> {return myStore});
    let [StoreEmail, setStoreEmail] = useState("");
    const [currentpageData, setCurrpageData] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [cartPage, setcartPage] = useState(true);
    // const firstField = React.useRef()

  
   

   

    const getStoreData =  async () =>{
         let {data} = await axios.get(`${requestroute}store/${storename}`)
         console.log(data);
         setCurrpageData(data.allProducts);
         setStoreEmail(data.email)
    }

  

   const designCart = {
    width:"40px",
    height:"40px",
    position:"fixed",
    bottom:"10px",
    right:"10px", 
    borderRadius:"4px",
    backgroundColor:"#fc8181",
    cursor : "pointer",
    display : "flex",
    justifyContent : "center",
    alignItems: "center"
    }
    
  

    const setCart = ()=>{
        setcartPage(!cartPage);
    }

    useEffect(()=>{
        getStoreData();
    },[])

    return (
        <>
        
        {
            cartPage ? 

            <Box style={{marginTop:"100px"}} className='cardscontainer'>
         
           {
            currentpageData?.map((eachProduct)=>{
                return (
                    <Productcardview {...eachProduct}/>
                    // <h1>hello</h1>
                )
            })
           }
     

        </Box> :

        <Box style={{marginTop:"80px"}}>

            <Stack direction={isLargerThan800 ? 'row' : 'column' } spacing="24px" style={{margin:"auto",width:isLargerThan800?"70%":"95%"}}>
            
                <Box style={{margin:"auto",width:isLargerThan800 ?  "60%":"100%"  }}>
                {
                cartData.length > 0 && cartData.map((eachData)=>{
                      return (
                          <Cart {...eachData}/>
                      )
                })
               }
               {
                cartData.length === 0 && <div style={{margin:"15px"}}>
                     <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png" alt="emptycart"></img>
                </div>
               }
                </Box>
                <Box style={{margin:"auto",width:isLargerThan800?"40%":"100%",marginTop:"0px"}}>

                    <CheckOut StoreEmail={StoreEmail} />

                </Box>

            </Stack>
        </Box>

        }

           <Box style={designCart} onClick={setCart}>{cartPage?"Cart":"Buy"}</Box>

        {/* <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
             <h1>body</h1>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}


        {/* <Drawer
        isOpen={isOpen}
        placement='right'
        // initialFocusRef={firstField}
        onClose={onClose}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            Create a new account
          </DrawerHeader>

          <DrawerBody>
           
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer> */}

        {/* <Drawer onClose={onClose} isOpen={isOpen} size={"lg"} style={{zindex:"100"}}>
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
      </Drawer> */}
        </>
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