import React from 'react';
import { Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { setLoginTrue } from '../../redux/actions/action';

function LogoutComponent(props) {

    
    let dispatch = useDispatch();
    
    let cookies = new Cookies();
    const navigate = useNavigate();

    
    const handlelogout = ()=>{
       cookies.remove("jwt", {path:"/"});
       setLoginTrue(dispatch, false)
       navigate("/")
    }

    return (
        <Button onClick={handlelogout}>Logout</Button>
    );
}

export default LogoutComponent;