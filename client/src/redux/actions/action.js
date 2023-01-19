

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
