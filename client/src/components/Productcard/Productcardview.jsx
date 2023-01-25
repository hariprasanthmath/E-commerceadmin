import React, {useState} from 'react';
import "./productcard.css"
function Productcardview({name, imageURL, price}) {

    let [count, seCount] = useState(0);
    const decreasecount = ()=>{
        
    }
    const increasecount = ()=>{

    }
    const handleaddtocart = ()=>{
        
    }

    return (
        <div className='productcard'>
        <img src={imageURL} alt={name}></img>
        <p>{name}</p>
        <div className='bottomcard'>
           <h3>{price}</h3>
           {
              count > 0 ?

              <div className='addtocartwithsymbol'>
                 <div onClick={decreasecount}>-</div>
                 <div>{count}</div>
                 <div onClick={increasecount}>+</div>
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