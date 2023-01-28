import React from 'react';
import { Flex } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee , faCartShopping} from '@fortawesome/free-solid-svg-icons'


function StoreNavbar(props) {
    let navStyle = {
        marginTop : "70px"
    }

    return (

       

        <Flex style={navStyle}>
               {/* <FontAwesomeIcon icon={faCoffee} /> */}
               <FontAwesomeIcon icon={faCartShopping} />
        </Flex>
    );
}

export default StoreNavbar;