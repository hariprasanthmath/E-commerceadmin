import React from 'react';
import { Flex, Text, useMediaQuery, Card, Image, Stack, CardBody, Heading, CardFooter, Button } from '@chakra-ui/react';
function EachStoreviewcard({storename, storedescription, storelogo}) {
    return (
        // <Flex >
            
        //     <Text>{storename}</Text>
        //     <Text>{storedescription}</Text>

        // </Flex>
        <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        width={"100%"}
      >
        <Image
          objectFit='cover'
          width={"300px"}
          maxW={{ base: '100%', sm: '200px' }}
          src={storelogo || 'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'}
          alt='Caffe Latte'
        />
      
        <Stack>
          <CardBody>
            <Heading size='md'>{storename}</Heading>
      
            <Text py='2'>
              {storedescription}
            </Text>
          </CardBody>
      
          <CardFooter>
            <Button variant='solid' colorScheme='blue'>
              Explore Store
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    );
}

export default EachStoreviewcard;