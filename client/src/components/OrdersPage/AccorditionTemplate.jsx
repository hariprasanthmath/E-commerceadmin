import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Text
  } from '@chakra-ui/react'
import "./order.css"
function AccorditionTemplate({userData}) {
    return (
        <Accordion  allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
                User Details
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text><span className='littlebold'>Email : </span>{userData.email}</Text>
            <Text><span className='littlebold'>Name : </span>{userData.name}</Text>
            <Text><span className='littlebold'>Phone : </span>{userData.phone}</Text>
          </AccordionPanel>
        </AccordionItem>
        </Accordion>
    );
}

export default AccorditionTemplate;