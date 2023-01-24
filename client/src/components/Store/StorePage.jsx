import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { requestroute } from '../../constants';
import { useEffect } from 'react';
import { useState } from 'react';

function StorePage(props) {

    const {storename} = useParams();

    
    useEffect(()=>{
        getStoreData();
    },[])

    const [currentpageData, setCurrpageData] = useState();
    

    const getStoreData =  async () =>{
         let {data} = await axios.get(`${requestroute}store/${storename}`)
         console.log(data);
         setCurrpageData(data);
    }




   

    return (
        <div>
            this is storepage
        </div>
    );
}

export default StorePage;

 // console.log(storename);

    // const [currpage, setCurr] = useState();

    // useEffect(()=>{
    //       setCurr(storename)
    // },[])

    

    // useEffect(()=>{
    //     getStoreData();
    // },[currpage])