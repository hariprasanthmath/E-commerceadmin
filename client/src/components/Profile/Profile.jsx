import React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import Cookies from "universal-cookie";
import { useDispatch } from 'react-redux';
import { getAdminProfile } from '../../utils/getAdminProfileData';
import { getProfiledetailsRoute, requestroute } from '../../constants';
import { Flex, VStack, Text} from '@chakra-ui/react';
import { Card, CardBody, Image, Stack, Heading,  Divider, CardFooter, ButtonGroup, Button, Textarea } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Box,
    // Button
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import {Formik, Form, Field} from "formik"
import { isExpired, decodeToken } from "react-jwt";
import { setLoginTrue } from '../../redux/actions/action';
import "./adminprofile.css"
function Profile(props) {


    let [tokenstate, setToken] = useState("");
    let cookies = new Cookies();
    let dispatch = useDispatch();
    let [viewstate, setviewstate] = useState("view");
    const navigate = useNavigate();
    
   let [profilestate, setProfile] = useState({

   });
   let [profilecurrent, setprofilecurrent] = useState({});

   useEffect(()=>{
    profileHandler();

   },[])


    const profileHandler = async () =>{

      let token = cookies.get('jwt');

      if(token){
            // console.log(token);
            localStorage.setItem("jwt", token);
            setToken(token);
      }
   

    }

    useEffect(()=>{
        getandsetAdminProfile();
    },[tokenstate])

    const getandsetAdminProfile = async ()=>{
      // console.log(tokenstate);
      let response = await getAdminProfile(getProfiledetailsRoute, tokenstate);
      // // getProfiledetailsRoute
      if(response.message === "jwt malformed"){
          // alert("login again")
      }else{
          setProfile(response);
          setprofilecurrent(response)
      }

    }


    const onInputChange = (e)=>{
        const {name, value} = e.target;
        
        setProfile({...profilestate , [name]:value});
   }

   const saveChangesToBackend = async ()=>{
      
      // console.log(profilestate);
      let response = await axios.patch(`${requestroute}admin/profile`, 
      {
        profilestate,
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : "bearer "+  tokenstate
      }
    });
      // console.log(response);
      profileHandler();
      setviewstate("view");
   }
    return (
        <div>
            {
                Object.keys(profilecurrent).length > 0 ? 
                <> 
                {
                    viewstate === "view" ?
                    <Flex  className='profileeditcontainer'> 
                       <Box className='admincontent'>

                        <VStack>
                         <Text fontSize='xl' ><span className='littledarktext'>Name : </span>{profilecurrent.name}</Text> 
                         <Text fontSize='xl' ><span className='littledarktext'>Email : </span>{profilecurrent.email}</Text> 
                         <Text fontSize='xl' ><span className='littledarktext'>Mobile : </span>{profilecurrent.mobile}</Text> 
                         <Text fontSize='xl' ><span className='littledarktext'>Store Name :</span>{profilecurrent.storename}</Text> 
                         <Button onClick={()=>setviewstate("edit")}>Edit</Button>
                         </VStack>
                       </Box>
                    
                    
                    </Flex> : 
                     <Flex className='profileeditcontainer'>
                     <VStack>
 
                    
 
                     <Formik
               initialValues={{ ...profilestate}}
 
           >
           <Form onChange={onInputChange}>
           <Field name='email' >
             {({ field, form }) => (
                 <FormControl isInvalid={form.errors.name && form.touched.name}>
                 <FormLabel>Email</FormLabel>
                 <Input {...field} placeholder='' name="email"  />
                 
                 </FormControl>
              
             )}
           </Field>
 
           <Field name='storedescription' >
             {({ field, form }) => (
               <FormControl isInvalid={form.errors.name && form.touched.name}>
                 <FormLabel>Store Description</FormLabel>
                 <Textarea {...field} placeholder=''> 
                 
                 </Textarea>
               </FormControl>
             )}
           </Field>
 
           <Field name='name' >
             {({ field, form }) => (
               <FormControl isInvalid={form.errors.name && form.touched.name}>
                 <FormLabel>Name</FormLabel>
                 <Input {...field} placeholder='' />
                 
               </FormControl>
             )}
           </Field>

           <Field name='storelogo' >
             {({ field, form }) => (
               <FormControl isInvalid={form.errors.name && form.touched.name}>
                 <FormLabel>Store logo url</FormLabel>
                 <Input {...field} placeholder='' />
                 
               </FormControl>
             )}
           </Field>
 
           <Field name='mobile' >
             {({ field, form }) => (
               <FormControl isInvalid={form.errors.name && form.touched.name}>
                 <FormLabel>Mobile</FormLabel>
                 <Input {...field} placeholder='' />
                 
               </FormControl>
             )}
           </Field>
 
           
           <Field name='storename' >
             {({ field, form }) => (
               <FormControl isInvalid={form.errors.name && form.touched.name}>
                 <FormLabel>storename</FormLabel>
                 <Input {...field} placeholder='' />
                 
               </FormControl>
             )}
           </Field>
 
 
           
 
           <Button
           mt={4}
           colorScheme='teal'
           marginLeft="5px"
           variant={"outline"}
           onClick={saveChangesToBackend}
           >
             save
           </Button>

           <Button
           mt={4}
           colorScheme='red'
           marginLeft="5px"
        //    variant={"outline"}
           onClick={()=>{setviewstate("view"); }}
           >
             cancel
           </Button>
         </Form>
          
 
           
 
          
 
           </Formik>
 
 
                     </VStack>
 
              
 
                 </Flex>
                }
               
                </>
               
                
                :<div>loading</div>
            }
        </div>
    );
}

export default Profile;