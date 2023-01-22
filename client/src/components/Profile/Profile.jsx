import React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import Cookies from "universal-cookie";
import { useDispatch } from 'react-redux';
import { getAdminProfile } from '../../utils/getAdminProfileData';
import { getProfiledetailsRoute } from '../../constants';
import { Flex, VStack, Text} from '@chakra-ui/react';
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

   let [profilestate, setProfile] = useState({

   });
    


    const profileHandler = async () =>{
        let response = await getAdminProfile(getProfiledetailsRoute, tokenstate);
        // getProfiledetailsRoute
        if(response.message === "jwt malformed"){
            alert("login again")
        }else{
            setProfile(response);
        }
        
        console.log(response);
    }



    useEffect(()=>{
          profileHandler();
    },[tokenstate])
    return (
        <div>
            {
                Object.keys(profilestate).length > 0 ? 
               
                <Flex>
                    <VStack>

                    <Text fontSize='xl'>{profilestate.name}</Text> 
                    
                    <p>{profilestate.email}</p>
                    <p>{profilestate.mobile}</p>


                    </VStack>

             

                </Flex>
                
                :<div>loading</div>
            }
        </div>
    );
}

export default Profile;