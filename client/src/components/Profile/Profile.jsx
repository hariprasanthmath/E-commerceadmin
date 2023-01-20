import React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import Cookies from "universal-cookie";
import { useDispatch } from 'react-redux';
import { getAdminProfile } from '../../utils/getAdminProfileData';
import { getProfiledetailsRoute } from '../../constants';

function Profile(props) {


    let [tokenstate, setToken] = useState();
    let cookies = new Cookies();
    let dispatch = useDispatch();

   useEffect(()=>{
    let token = cookies.get('jwt');
    if(token){
       
        setToken(token);
    }
   },[])
    


    const profileHandler = async () =>{
        let response = await getAdminProfile(getProfiledetailsRoute, tokenstate);
        // getProfiledetailsRoute
        console.log(response);
    }

    useEffect(()=>{
          profileHandler();
    },[tokenstate])
    return (
        <div>
            
        </div>
    );
}

export default Profile;