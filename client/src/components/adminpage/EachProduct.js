import React from 'react';
import { Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button } from '@chakra-ui/react';
function EachProduct({title, image, category, description,price,_id}) {

    return (
        
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
      <Button variant='solid' colorScheme='blue'>
        Edit
      </Button>
    </CardFooter>
  </Stack>
</Card>

       
    );
}

export default EachProduct;