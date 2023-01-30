import React ,{useState} from 'react';
import { Box, Container, Button, Text, Select } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect } from 'react';
import { requestroute } from '../../constants';
import Cookies from 'universal-cookie';
import { setLoginTrue } from '../../redux/actions/action';
import { useDispatch } from 'react-redux';
import { HStack } from '@chakra-ui/react';
import "./order.css"
import { useRef } from 'react';
import { findCartTotal } from '../../utils/findCartTotal';
import { orderFilter } from '../../utils/orderFilter';
import AccorditionTemplate from './AccorditionTemplate';

function Orders(props) {
  
    const [orders, setOrders] = useState([]);
    const [tokenstate, setTokenState] = useState("");
    const [changestate, setChangestate] = useState(0);
    const [filterstate, setFilterState] = useState(orders);
    let cookies = new Cookies();
    const dispatch = useDispatch();
    const selectRef = useRef();
    let orderStatus = {
        new : {
            text : "Accept Order",
            nextStatus : "orderaccepted",
        },
        orderaccepted : {
            text : "Dispatch Order",
            nextStatus : "deliver"
        },
        deliver : {
            text : "Deliver Order",
            nextStatus : "delivered"
        },
        delivered : {
            text : "Order Delivered",
            nextStatus : "delivered"
        }
    }



    const handleOrdersRequest = async () =>{
        let {data, name} = await axios.get(`${requestroute}admin/cart`,{
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : "Bearer "+  tokenstate
            }
        });
        if(name){
            alert("oops")
        }
        console.log(data, "this is data");
        setOrders(data)
        setFilterState(data);
    }

    const manageCookies = () => {
        let token = cookies.get('jwt');
        console.log(token);
        if(token){
            setLoginTrue(dispatch, true)
            setTokenState(token);
        }   
    }

    const changeOrderStatus = async (nextStatus, orderid) =>{
        console.log(nextStatus , orderid);

        try{
           let response = await axios.patch(`${requestroute}cart/orderstatus/${orderid}`,{
              nextStatus,
              headers : {
                'Content-Type' : 'application/json',
              }
             });
             console.log(response);
             setChangestate(changestate => changestate+1);

        }catch(err){

        }
    }

    const filterOrder = ()=>{
        console.log(selectRef.current.value);
        let result = orderFilter(orders ,selectRef.current.value);
        console.log(result);
        setFilterState(result);
    }

    useEffect(()=>{
        handleOrdersRequest();
    },[tokenstate, changestate])

    useEffect(()=>{
      manageCookies();
    },[])

    return (
        <Box>
            <h1>Total Orders {orders.length}</h1>
            
            <Select className='orderfilter'  ref={selectRef} onChange={filterOrder}>
                 <option value='all'>All</option>
                  <option value='new'>New Order</option>
                  <option value='orderaccepted'>Accepted Order</option>
                  <option value='deliver'>Out for delivery</option>
                  <option value='delivered'>Delivered Order</option>
            </Select>
            {
               filterstate.length > 0 &&  filterstate?.map((eachOrder)=>{
                    return (
                        <Box className= {"eachorderbox"}>
                            <HStack className='marginbottom10'>

                            <p> <span className='littlebold'>Order ID : </span>{eachOrder.orderid}</p>

                            <p><span className='littlebold'>Status</span> <span className={'paddingbox radius4 status' + eachOrder.status}>{eachOrder.status}</span></p>
                            </HStack>
                           
                           <HStack
                            overflowX="scroll"
                            className='marginbottom10'
                           >
                            {
                                eachOrder.cartData.map((eachProduct)=>{
                                    return (
                                        
                                           
                                            <img src={eachProduct.image} style={{width:"100px"}}></img>
                                         
                                        
                                    )
                                })
                            } 
                             </HStack>
                           
                           {
                            eachOrder.status === "delivered" ? <></> :
                            <Button  onClick={()=>changeOrderStatus(orderStatus[eachOrder.status].nextStatus, eachOrder.orderid)}>{orderStatus[eachOrder.status].text}</Button> 
                           }

                           <Text><span className='littlebold'>Order Value : </span> $ {findCartTotal(eachOrder.cartData)}</Text>

                         <AccorditionTemplate userData={eachOrder.userData} />
                           
                        </Box>
                    )
                })
            }
        </Box>
    );
}

export default Orders;