

export const getDatafrombackend = (dispatch, data)=>{
      dispatch({
        type : "SETPRODUCTSFROMSERVER",
        payload: data
      })
}

export const setLoginTrue = (dispatch, data)=>{
  dispatch({
    type: "SETLOGIN",
    payload : data
  })
}

export const setjwtToken = (dispatch, data) => {
  dispatch({
    type: "SETJWTTOKEN",
    payload : data 
  })
}

export const addProductToCart = (dispatch, data) =>{
  dispatch({
    type: "ADDPRODUCTTOCART",
    payload : data
  })
}

export const decreaseProductCountFromCart = (dispatch, data) =>{
   dispatch({
    type : "DECREASEFROMCART",
    payload : data
   })
}
