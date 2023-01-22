import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import "./simplenav.css"
import { DashLinkNav } from '../../constants';
import {
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
} from '@chakra-ui/react';

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import LogoutComponent from '../LogoutComp/LogoutComponent';

function Navbar(props) {

  const { isOpen, onOpen, onClose } = useDisclosure();
  

  let navbardesign = {
    position: "fixed",
    top: 0,
    width: "100%",
    overflow: "hidden",
    zIndex: 100
  }





    return (
        <>
          
          <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} bgColor={"red.300"}  style={navbardesign}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
             
             <LogoutComponent/>
              
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
           
           
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {
                DashLinkNav.map((eachItem)=>{
                       return (
                        <Text><Link to={eachItem.location}>{eachItem.name}</Link></Text>
                       )
                })
              }
               
            </Stack>
            
          </Box>
        ) : null}
      </Box>

        </>
    );
}

export default Navbar;


