import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from '@chakra-ui/react';
import "./navbar.css"
function StarterNavbar(props) {
    
    return (
        <div className='navcontainer'>
            <div id="navbar">
            <Link to='/'><div><img style={{height:"60px", width:"100%"}} src={"https://1000logos.net/wp-content/uploads/2020/08/Shopify-Logo.png"} alt="shopify" /></div></Link>
            <div className='loginregister'>
                 <Link to="/trackorder" >Track Order</Link>
                 <Link to="/register" > <Button colorScheme='blue' variant='outline'>Try for free</Button></Link> 
                 <Link to="/login" ><Button colorScheme='blue' >Login</Button></Link> </div>
                 
        </div>
        </div>
    );
}

export default StarterNavbar;