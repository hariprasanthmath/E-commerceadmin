import React, { useEffect } from 'react';
import { motion } from "framer-motion"
import {Box, VStack, Input, Checkbox, Button} from "@chakra-ui/react"
import axios from "axios"
import { useRef, useState } from 'react';
import { requestroute } from '../../constants';
import Navbar from '../Navbar/Navbar';
import Cookies from "universal-cookie"
import { useDispatch } from 'react-redux';
import { setLoginTrue } from '../../redux/actions/action';
import App from '../ImageUpload/App';
function CreateProduct(props) {
    const imageRef = useRef();
    const [images, setImages] = useState(null)
    const imageBox = {

        // border: "2px solid crimson",

        // width: "50%"
        // padding: "2px",
        // borderRadius: "4px"

    }

    const InputStyle = {
        maxWidth: "500px" 
    }

    // const currentuseremail  = "admintest@gmail.com"

    let [productdata, setProductdata] = useState({
         title: "",
         description: "",
         image: "",
         price: "",
         category:"",
        //  owner: currentuseremail
    });

    let [tokenstate, setToken] = useState();
    let cookies = new Cookies();
    let dispatch = useDispatch();

   useEffect(()=>{
    let token = cookies.get('jwt');
    if(token){
        setLoginTrue(dispatch, true)
        setToken(token);
    }
   },[])


    const handleSubmitCreateProduct = async (e)=>{
        e.preventDefault();

        let productvalues = Object.values(productdata);
        let allPresent = true;
        productvalues.map((eachElement)=>{
            if( eachElement.length == 0 ){

                allPresent = false;

            }

        })

        

        if(allPresent){
            try{
                // productdata.image = imageRef.current.value;
                let response = await axios.post(`${requestroute}product`, {
                    productdata,
                    headers : {
                        'Content-Type' : 'application/json',
                        'Authorization' : "bearer "+  tokenstate
                    }
        
                });
                console.log(response);
        
               }catch(err){
        
                console.log(err);
        
               }
        }else{
            alert("all fields are required")
        }

      
    }


    const handleInputChange = (e)=>{
         const {name, value} = e.target;
         setProductdata({...productdata, [name]:value});
    }

    useEffect(()=>{
        imageRef.current.value = images;
    },[images])



    return (
      <>
      {/* <Navbar/> */}
        <Box>
        <VStack onChange={handleInputChange}>
          <Input placeholder='enter product title' name="title" style={InputStyle} required/>
          <Input placeholder='Description' style={InputStyle} name="description" required/>
           <Box style={imageBox}>
             <Input ref={imageRef} placeholder='Image' style={InputStyle} name="image" required/>
             <App setImages={setImages} images={images}/>
           </Box>
          <Input placeholder='price' type="number" style={InputStyle} name="price" required/>
          <Input placeholder='category' style={InputStyle} name="category" required/>
          <Button onClick={handleSubmitCreateProduct}>Create Product</Button>
       </VStack>
        </Box>
        
        

      </>
    );
}

export default CreateProduct;




// console.log(productdata);
// try{
//     const response = await axios.get("http://localhost:5000/");
//     let result = response.data
//     console.log(result);
// }catch(err){
//     console.log(err);
// }