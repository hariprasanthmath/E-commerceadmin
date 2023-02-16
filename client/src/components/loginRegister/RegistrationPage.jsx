import React from 'react';
import { useState } from 'react';
import { Container, Input, Box, Heading, Button } from '@chakra-ui/react';
import "./Registeration.css"
import axios from "axios";
import { registeruserRoute } from '../../constants';
// import { useToast } from '@chakra-ui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegistrationPage(props) {
    
    // const toast = useToast()
    let [formstate, setFormState] = useState({
        name :"",
        email : "",
        password: "",
        mobile : ""
    });

    const handleChange = (e) =>{
       const {name, value} = e.target;
       setFormState({
        ...formstate,
        [name] : value
       })
    }

//    const customToast = (message) =>{
         
//     toast({
//         title: message,
//         description: "",
//         status: 'failure',
//         duration: 9000,
//         isClosable: true,
//       })

//    }

const notify = (message) => toast(message);


    const handleRegister = async ()=>{
        console.log(formstate);
        try{

            let response = await axios.post(registeruserRoute, {
                formstate
    
            });
            console.log(response.data);
            notify(response.data.message)
    
           }catch(err){
            let {response }  = err;
            console.log(response.data.message);
    
           }
      

    }


    return (
        <Container className="registercontainer" onChange={handleChange}>
            <Box className="headingbox"><Heading size='lg' >Register</Heading></Box>
            <label for="name">User Name</label>
            <Input id="name" name="name">
            
            </Input>
            <label for="email">Email</label>
            <Input id="email" name="email">
            
            </Input >
            <label for="password">Password</label>
            <Input id="password" name="password">
            
            </Input>
            <label for="mobile">Mobile</label>
            <Input id="mobile" name="mobile">

            </Input>
            
            <Button className="registerbutton" onClick={handleRegister}>Register</Button>
            
            <ToastContainer/>


        </Container>
    );
}

export default RegistrationPage;