import React, {useState} from 'react';
import { Flex, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { requestroute } from '../../constants';
import { useEffect } from 'react';
import EachStoreviewcard from './EachStoreviewcard';
import { removeCartData } from '../../redux/actions/action';
import { useDispatch } from 'react-redux';

function Userview(props) {

    const [storelist, setStorelist] = useState([]);
    let dispatch = useDispatch();

    const getAllStoresname = async ()=>{
           
        try{
            let { data } = await axios.get(`${requestroute}user/storelist`);
           console.log(data);
           setStorelist(data.data);

        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getAllStoresname();
        removeCartData(dispatch);
    },[])


    return (


       
        <VStack>
           {
            storelist?.map((eachStore)=>{
                if(Object.keys(eachStore).includes("storename")){
                    return (
                        <>

                        <EachStoreviewcard {...eachStore} />
                        

                        </>
                    )
                }
            })
           }
        </VStack>
     
    );
}

export default Userview;