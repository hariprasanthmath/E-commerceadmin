import React from 'react';
import { Container, Input, Box, Heading, Button } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { loginuserRoute } from '../../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "universal-cookie"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setLoginTrue } from '../../redux/actions/action';
import { useDispatch } from 'react-redux';
function Loginpage(props) {

    const cookies = new Cookies();
    const navigate = useNavigate();
    const dispatch = useDispatch();


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

     useEffect(()=>{
        let token = cookies.get('jwt');
        if(token){
            setLoginTrue(dispatch, true)
            console.log("setting login");
           navigate('/admin');
        }
    },[])

     const notify = (message) => toast(message);

     const handleRegister = async ()=>{
        console.log(formstate);
        try{

            let response = await axios.post(loginuserRoute, {
                formstate
    
            });
            console.log(response.data);
            cookies.set('jwt' , response.data.token , {
                maxAge:24 * 60 * 60 * 100,
                path : "/"
              });
            setLoginTrue(dispatch, true)
            notify("Success");
            navigate("/admin")
    
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