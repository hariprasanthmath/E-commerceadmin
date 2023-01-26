import { setDataToCart } from "../../utils/setCartData"

const initialState = {
    productData : [],
    login : false,
    jwt : "",
    cartData : []
}

export const productReducer = (state = initialState, action)=>{
    switch(action.type){
        case "SETPRODUCTSFROMSERVER" : 
           return {
              ...state,
              productData : action.payload
           }
        case "SETLOGIN" : 
           return {
            ...state,
            login : action.payload
           }
        case "SETJWTTOKEN" :
            return {
                ...state,
                jwt : action.payload
            }
        case "ADDPRODUCTTOCART" : 
            return {
                ...state,
                cartData : setDataToCart(state.cartData, action.payload, true)
            }
        case "DECREASEFROMCART" : {
            return {
                ...state,
                cartData : setDataToCart(state.cartData, action.payload, false)
            }
        }
        default : 
         return state;
    }
}

