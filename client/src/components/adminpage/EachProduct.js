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
import { useState } from 'react';
import {useForm} from "react-hook-form"
import {Formik, Form, Field} from "formik"
import { useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import { requestroute } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { getDatafrombackend } from '../../redux/actions/action';
function EachProduct({title, image, category, description,price,_id}) {

    const preloadedValues = {
        title, image, category, description,price,_id
    }

    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    // const {register, handleSubmit} = useForm({
    //     defaultValues: preloadedValues
    // })

    

    let [details, setDetails] = useState({
        title, image, category, description, price, _id
    });

    // let handleEdit = (e)=>{
    //     let {name, value} = e.target.value;
    //     setDetails({...details, [name]:value});
    // }

    // let [editedValue, setEdit] = useState({
    //     ...preloadedValues
    // });

    let dispatch = useDispatch();

  const getAndSetData = async ()=>{
    let {data} = await axios.get(`${requestroute}products`);
    console.log(data);
    
    getDatafrombackend(dispatch,data);
  }

    const saveChangesToBackend = async ()=>{
        let postResponse = await axios.patch(`${requestroute}products/${_id}`, {
            details
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
            let response = await axios.delete(`${requestroute}product/${_id}`);
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