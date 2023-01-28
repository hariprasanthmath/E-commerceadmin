import React ,{useState} from 'react';
import { Box } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect } from 'react';
import { requestroute } from '../../constants';
import Cookies from 'universal-cookie';
import { setLoginTrue } from '../../redux/actions/action';
import { useDispatch } from 'react-redux';

function Orders(props) {
  
    const [orders, setOrders] = useState([]);
    const [tokenstate, setTokenState] = useState("");
    let cookies = new Cookies();
    const dispatch = useDispatch();



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
        console.log(data);
        setOrders(data)
    }

    const manageCookies = () => {
        let token = cookies.get('jwt');
        console.log(token);
        if(token){
            setLoginTrue(dispatch, true)
            setTokenState(token);
        }   
    }

    useEffect(()=>{
        handleOrdersRequest();
    },[tokenstate])

    useEffect(()=>{
      manageCookies();
    },[])

    return (
        <Box>
            <h1>hello {orders.length}</h1>
            {
               orders.map((eachProduct)=>{
                    return (
                        <p>{eachProduct.orderid}</p>
                    )
                })
            }
        </Box>
    );
}

export default Orders;