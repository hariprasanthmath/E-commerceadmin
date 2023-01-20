import React from 'react';
import {Flex, Button} from "@chakra-ui/react"
import { NavLink } from 'react-router-dom';
import { useRef } from 'react';
import "./admindashboard.css"
function Admindashboard(props) {

    const sidemenu = [
        {
            name: "Profile",
            path : "profile"
        },
        {
            name : "Analytics",
            path : "analytics"
        },
        {
            name : "Products",
            path : "products"
        },
        {
            name : "Create Product",
            path : "create"
        }
    ]

    // let linkref = useRef();
    // console.log(linkref.current);
    return (
       <Flex flexDirection={"column"} className="">
       
          {
            sidemenu.map((eachItem)=>{
                return (
                    <>
                    {/* <NavLink className="sidenavlinkadmin" key={eachItem.name}  to={eachItem.path}>  {eachItem.name}</NavLink> */}
                    <Button className="sidenavlinkadmin"><NavLink  key={eachItem.name}  to={eachItem.path}>  {eachItem.name}</NavLink></Button>
                    </>
                )
            })
          }
       </Flex>
    );
}

export default Admindashboard;