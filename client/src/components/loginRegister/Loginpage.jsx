import React from 'react';
import { Container, Input, Box, Heading, Button } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { loginuserRoute } from '../../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Loginpage(props) {
    let [formstate, setFormState] = useState({
        
        email : "",
        password: "",
        
    });

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormState({
         ...formstate,
         [name] : value
        })
     }

     const notify = (message) => toast(message);

     const handleRegister = async ()=>{
        console.log(formstate);
        try{

            let response = await axios.post(loginuserRoute, {
                formstate
    
            });
            console.log(response.data);
            notify("Success");
    
           }catch(err){
            let {response }  = err;
            console.log(response.data.message);
            notify(response.data.message);
    
           }
      

    }

    return (
        <>
        <Container className="registercontainer" onChange={handleChange}>
            <Box className="headingbox"><Heading size='lg' >Login</Heading></Box>
            
            
            
            <label for="email">Email</label>
            <Input id="email" name="email">
            
            </Input >
            <label for="password">Password</label>
            <Input id="password" name="password">
            
            </Input>
            
            
            <Button className="registerbutton" onClick={handleRegister}>Register</Button>
            



        </Container>
        <ToastContainer/>
        </>
    );
}

export default Loginpage;