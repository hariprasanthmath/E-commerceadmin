import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from '@chakra-ui/react';
import "./navbar.css"
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Input
  } from '@chakra-ui/react'

  import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure
  } from '@chakra-ui/react'

  import { useNavigate } from 'react-router-dom';
  import { useMediaQuery } from '@chakra-ui/react'

function StarterNavbar(props) {
    let navigate = useNavigate();
    const handleNavigation = (location) => {
        navigate(location)
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)')
    
    return (
        <div className='navcontainer'>
            <div id="navbar">
            <Link to='/'><div><img style={{height:"60px", width:"100%"}} src={"https://1000logos.net/wp-content/uploads/2020/08/Shopify-Logo.png"} alt="shopify" /></div></Link>
            {
                isLargerThan800 ? 
                
                <div className='loginregister'>
                     {/* rightIcon={<ChevronDownIcon />} */}
            <Menu style={{width:"300px"}}>
                  <MenuButton as={Button} >
                      Explore
                </MenuButton>
                  <MenuList>
                  <MenuItem onClick={()=>handleNavigation("/userview")} style={{width:"fit-content"}}>Store</MenuItem>
                  <MenuItem onClick={()=>handleNavigation("/trackorder")} style={{width:"fit-content"}}>Track Order</MenuItem>
                </MenuList>
            </Menu>
                 <Link to="/register" > <Button colorScheme='blue' variant='outline'>Try for free</Button></Link> 
                 <Link to="/login" ><Button colorScheme='blue' >Login</Button></Link> </div>
                 : 

                 <>
                 <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
                    Open
                </Button>
                
                 </>
            }
            
                 
        </div>

        <>
      
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>

          <DrawerBody>
          <div >
                    
              <div className='sidenavdiv'>
              <Link to="/userview" > Store</Link> 
              </div>
              <div className='sidenavdiv'>
              <Link to="/trackorder" >Track Order</Link> 
              </div>
              <div className='sidenavdiv'>
              <Link to="/register" > Try for free</Link> 
              </div>
              <div className='sidenavdiv'>
              <Link to="/login" >Login</Link> </div>
              </div>
               
                
                 
                 
          </DrawerBody>

          {/* <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>

        </div>
    );
}

export default StarterNavbar;