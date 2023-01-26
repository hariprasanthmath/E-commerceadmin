export const setDataToCart = (cartData, currentData , INCREASE)=>{
      let isPresent = false;
      console.log("setcartdata", cartData, currentData);

      if(cartData.length > 0){

        cartData = cartData.filter((eachProduct)=>{
            if(eachProduct?._id === currentData._id){
                if(INCREASE){
                    eachProduct.count = eachProduct.count + 1 || 1;
                    
                }else{
                    eachProduct.count = currentData.count - 1 ;
                    
                }
                isPresent = true;
            }
           
                return eachProduct;
            
           
          })

      }


     

      if(!isPresent && INCREASE){
        currentData.count = 1;
        cartData.push(currentData);
      }

      cartData = cartData.filter((eachProduct)=>{
        if(eachProduct.count > 0){
            return eachProduct;
        }
      })
      
     console.log(cartData, "in setCartfunction");
      return cartData;
}