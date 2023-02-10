import React from 'react';
import { Heading, Text } from '@chakra-ui/react'
import "./Maincard.css"
import {motion} from "framer-motion"

function MainCard(props) {
    return (
        <motion.div
          initial={{y:"-100vw"}}
          animate={{ y:0}}
          transition={{ delay : 0, duration: 1}}
          id='maincardleft'>
            <Text className='maintext'>Create your own ecommerce website in 3 easy steps</Text>
            <Text className='summarytext'>Build interactive digital experiences with your customers with just a few clicks. try it now! </Text>
        </motion.div>
    );
}

export default MainCard;