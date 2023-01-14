import React from 'react';
import MainCard from './MainCard';
import "./LandingPage.css"
import { useMediaQuery, HStack } from '@chakra-ui/react';
function LandingPage(props) {

    return (
        <div id="maincontainer">
            <HStack>
               <MainCard/>
 
            </HStack>
            
        </div>
    );
}

export default LandingPage;