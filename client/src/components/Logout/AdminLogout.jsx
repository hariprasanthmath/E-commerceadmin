import React, {useEffect} from 'react';
import { Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { setLoginTrue } from '../../redux/actions/action';
function AdminLogout(props) {

    let dispatch = useDispatch();
    
    let cookies = new Cookies();
    const navigate = useNavigate();

    
    const handlelogout = ()=>{
       cookies.remove("jwt", {path:"/"});
       setLoginTrue(dispatch, false)
       navigate("/")
    }

    useEffect(()=>{
         setTimeout(()=>{
               handlelogout();
         },2000)
    },[])

    return (
        <div>
            session expired logging out...
        </div>
    );
}

export default AdminLogout;