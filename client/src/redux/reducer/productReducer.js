const initialState = {
    productData : [],
    login : false
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
        default : 
        return state;
    }
}

