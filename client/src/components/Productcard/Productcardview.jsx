import React, {useState, useEffect} from 'react';
import "./productcard.css"
import {useSelector} from "react-redux"
import { decreaseProductCountFromCart, addProductToCart } from '../../redux/actions/action';
import { getCurrentProductCount } from '../../utils/getCurrentProductCount';
import { useDispatch } from 'react-redux';
function Productcardview({category, description, image, price, owner, title, _id}) {

   //  console.log({category, description, image, price, owner, title, _id});
     let {cartData} = useSelector((myStore)=> {return myStore});
     let [count, setCount] = useState(0);
     let dispatch = useDispatch();

    const decreasecount = ()=>{
      decreaseProductCountFromCart(dispatch, {category, description, image, price, owner, title, _id, count}, false)
    }
    const increasecount = ()=>{
      addProductToCart(dispatch, {category, description, image, price, owner, title, _id, count}, true)
    }
    const handleaddtocart = ()=>{
      addProductToCart(dispatch, {category, description, image, price, owner, title, _id, count}, true)
    }

    const getCount = ()=>{
       let currentcount = getCurrentProductCount(cartData, _id);
       setCount(currentcount);
    }

    useEffect(()=>{
      getCount()
    },[cartData])

    return (
        <div key={_id} className='productcard'>
        <img src={image} alt={title}></img>
        <p>{title}</p>
        <div className='bottomcard'>
           <h3>Rs.{price}</h3>
           {
              count > 0 ?

              <div className='addtocartwithsymbol'>
                 <div className='increasedecrease' onClick={decreasecount}>-</div>
                 <div>{count}</div>
                 <div className='increasedecrease' onClick={increasecount}>+</div>
              </div> :
              <div className='addtocartbutton' onClick={handleaddtocart}>
               <p>ADD TO Cart</p>
           </div>
           }
        </div>
      </div>
    );
}

export default Productcardview;