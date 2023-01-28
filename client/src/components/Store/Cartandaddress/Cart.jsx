import React from 'react';
import { Card, Image, Stack, CardBody, Text, Heading, CardFooter, Button,  } from '@chakra-ui/react';
import "../../Productcard/productcard.css"
import { decreaseProductCountFromCart, addProductToCart } from '../../../redux/actions/action';
import { useDispatch } from 'react-redux';
function Cart({category, description, image, price, owner, title,  _id, count}) {

    let dispatch = useDispatch();

    const decreasecount = ()=>{
        decreaseProductCountFromCart(dispatch, {category, description, image, price, owner, title, _id, count}, false)
      }
      const increasecount = ()=>{
        addProductToCart(dispatch, {category, description, image, price, owner, title, _id, count}, true)
      }

    return (
        <Card
        key={_id}
 direction={{ base: 'column', sm: 'row' }}
 overflow='hidden'
 variant='outline'
 className='eachproductcard'
>
 <Image
   objectFit='cover'
   maxW={{ base: '300px', sm: '200px' }}
   width="200px"
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
     {/* <Button variant='outline' colorScheme='blue' onClick={onOpen}>
       Edit
     </Button> */}
     <div className='addtocartwithsymbol'>
                 <div className='increasedecrease' onClick={decreasecount}>-</div>
                 <div>{count}</div>
                 <div className='increasedecrease' onClick={increasecount}>+</div>
              </div> 

     {/* <Button variant='solid' colorScheme='red'  marginLeft={"40px"} onClick={deleteAction}>
       Delete
     </Button> */}
   </CardFooter>
 </Stack>
</Card>
    );
}

export default Cart;