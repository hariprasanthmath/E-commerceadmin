import React from 'react';
import { Container, Input, Box, Heading, Button } from '@chakra-ui/react';
import "./Registeration.css"
function RegistrationPage(props) {


    return (
        <Container className="registercontainer">
            <Box><Heading>Register</Heading></Box>
            <label for="username">User Name</label>
            <Input id="username">
            
            </Input>
            <label for="username">Email</label>
            <Input id="Email">
            
            </Input >
            <label for="password">Password</label>
            <Input id="password">
            
            </Input>
            <label for="mobile">Mobile</label>
            <Input id="mobile">

            </Input>
            
            <Button></Button>
            



        </Container>
    );
}

export default RegistrationPage;