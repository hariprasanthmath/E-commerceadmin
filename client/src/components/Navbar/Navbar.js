import React from 'react';
import { Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
function Navbar(props) {
    return (
        <>
          <Box display={"flex"} justifyContent={"space-around"} width={"80%"} margin={"auto"} >
          <Link to={"/create"}>Create New Product</Link>
          <Link to={"/admin"}>Admin DashBoard</Link>
        </Box>
        </>
    );
}

export default Navbar;