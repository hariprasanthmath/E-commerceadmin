import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from '@chakra-ui/react';
import "./navbar.css"
function StarterNavbar(props) {
    return (
        <div id="navbar">
            <Link to='/'><img src={"https://1000logos.net/wp-content/uploads/2020/08/Shopify-Logo.png"} alt="shopify" /></Link>
            <div>
                 <Link to="/register" > <Button colorScheme='blue' variant='outline'>Try for free</Button></Link> </div>
                 <Link to="/login" ><Button colorScheme='blue' >Login</Button></Link> 
                 
        </div>
    );
}

export default StarterNavbar;