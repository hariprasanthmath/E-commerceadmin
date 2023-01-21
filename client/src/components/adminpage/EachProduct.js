import React from 'react';
import { Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button, Textarea } from '@chakra-ui/react';
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
import { useState, useEffect } from 'react';
import {useForm} from "react-hook-form"
import {Formik, Form, Field} from "formik"
import { useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import { requestroute } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import { setLoginTrue } from '../../redux/actions/action';
import { getDatafrombackend } from '../../redux/actions/action';
function EachProduct({title, image, category, description,price,_id}) {
    let dispatch = useDispatch();
    

  
    // Edit model properties
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)


    let [tokenstate, setToken] = useState("");
    let cookies = new Cookies();
    

   useEffect(()=>{
    let token = cookies.get('jwt');
    // console.log(token);
    if(token){
        setLoginTrue(dispatch, true)
        setToken(token);
    }
   },[])
    



    
     // current product properties state
    let [details, setDetails] = useState({
        title, image, category, description, price, _id
    });

  


   // getupdated data from the backend and update that to ui
  const getAndSetData = async ()=>{
   
    let {data} = await axios.get(`${requestroute}adminproducts`
    , 
    {
      headers : {
        'Authorization' : "Bearer "+ tokenstate
      }
    }
    );
    console.log(data);
    
    getDatafrombackend(dispatch,data);
  }


    // update changed values to backend
    const saveChangesToBackend = async ()=>{
        let postResponse = await axios.patch(`${requestroute}products/${_id}`, {
            details,
            headers : {
              'Content-Type' : 'application/json',
              'Authorization' : "bearer "+  tokenstate
          }
        });
        console.log(postResponse.data);
        getAndSetData();
        setTimeout(()=>{
            onClose();
            
        }, 2000)
    }


    const onInputChange = (e)=>{
         const {name, value} = e.target;
         
         setDetails({...details, [name]:value});
    }

    const deleteAction = async ()=>{
        
        try{
            let response = await axios.delete(`${requestroute}product/${_id}`
            , {
              headers : {
                'Authorization' : "Bearer "+ tokenstate
              }
            }
            );
            console.log(response);
        }catch(err){
            console.log(err);
        }

    }

    return (
        <>
         <Card
         key={_id}
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src={image}
    alt='Caffe Latte'
  />

  <Stack>
    <CardBody>
      <Heading size='md'>{title}</Heading>

      <Text py='2'>
        {description}
      </Text>
      <Text color='blue.600' fontSize='2xl'>
        {`$ ${price}`}
      </Text>
    </CardBody>

    <CardFooter>
      <Button variant='outline' colorScheme='blue' onClick={onOpen}>
        Edit
      </Button>

      <Button variant='solid' colorScheme='red'  marginLeft={"40px"} onClick={deleteAction}>
        Delete
      </Button>
    </CardFooter>
  </Stack>
</Card>
 
<Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit product details</ModalHeader>
          <ModalCloseButton />

          <ModalBody>

          <Formik
              initialValues={{ ...details}}

          >
          <Form onChange={onInputChange}>
          <Field name='title' >
            {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel>Title</FormLabel>
                <Input {...field} placeholder='' name="title" />
                </FormControl>
             
            )}
          </Field>

          <Field name='description' >
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel>Description</FormLabel>
                <Textarea {...field} placeholder=''> 
                
                </Textarea>
              </FormControl>
            )}
          </Field>

          <Field name='price' >
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel>Price</FormLabel>
                <Input {...field} placeholder='' />
                
              </FormControl>
            )}
          </Field>

          <Field name='image' >
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel>Price</FormLabel>
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
        </Form>
         

          

         

          </Formik>

          </ModalBody>

        </ModalContent>
      </Modal>

</>
       
    );
}

export default EachProduct;