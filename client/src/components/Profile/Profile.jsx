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
    // Button
} from '@chakra-ui/react'
import {Formik, Form, Field} from "formik"
import "./adminprofile.css"
function Profile(props) {


    let [tokenstate, setToken] = useState();
    let cookies = new Cookies();
    let dispatch = useDispatch();
    let [viewstate, setviewstate] = useState("view");

   useEffect(()=>{
    let token = cookies.get('jwt');
    if(token){
       
        setToken(token);
    }
   },[])

   let [profilestate, setProfile] = useState({

   });

   let [profilecurrent, setprofilecurrent] = useState({});
    


    const profileHandler = async () =>{
        let response = await getAdminProfile(getProfiledetailsRoute, tokenstate);
        // getProfiledetailsRoute
        if(response.message === "jwt malformed"){
            // alert("login again")
        }else{
            setProfile(response);
            setprofilecurrent(response)
        }
        
        console.log(response);
    }



    useEffect(()=>{
          profileHandler();
    },[tokenstate])

    const onInputChange = (e)=>{
        const {name, value} = e.target;
        
        setProfile({...profilestate , [name]:value});
   }

   const saveChangesToBackend = async ()=>{
      
      console.log(profilestate);
      let response = await axios.patch(`${requestroute}admin/profile`, 
      {
        profilestate,
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : "bearer "+  tokenstate
      }
    });
      console.log(response);
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
                    <Flex className='profileeditcontainer'> 

                        <VStack>
                         <Text fontSize='xl' >{profilecurrent.name}</Text> 
                         <Text fontSize='xl' >{profilecurrent.email}</Text> 
                         <Text fontSize='xl' >{profilecurrent.mobile}</Text> 
                         <Text fontSize='xl' >{profilecurrent.storename}</Text> 
                         <Button onClick={()=>setviewstate("edit")}>Edit</Button>
                         </VStack>
                    
                    
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
 
           {/* <Field name='name' >
             {({ field, form }) => (
               <FormControl isInvalid={form.errors.name && form.touched.name}>
                 <FormLabel>Description</FormLabel>
                 <Textarea {...field} placeholder=''> 
                 
                 </Textarea>
               </FormControl>
             )}
           </Field> */}
 
           <Field name='name' >
             {({ field, form }) => (
               <FormControl isInvalid={form.errors.name && form.touched.name}>
                 <FormLabel>Name</FormLabel>
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