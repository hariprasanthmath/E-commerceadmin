import React from 'react';
import {Flex, Button, Box} from "@chakra-ui/react"
import { NavLink } from 'react-router-dom';
import { useRef } from 'react';
import "./admindashboard.css"
import { sidemenu } from '../../constants';
function Admindashboard(props) {

   


    return (
       <Flex flexDirection={"column"} className="dashlinkcontainer">
       
          {
            sidemenu.map((eachItem)=>{
                return (
                    <>
                    <Box className="sidenavlinkadmin">
                    <NavLink  key={eachItem.name}  to={eachItem.path}>  {eachItem.name}</NavLink>
                    </Box>
                    </>
                )
            })
          }
       </Flex>
    );
}

export default Admindashboard;