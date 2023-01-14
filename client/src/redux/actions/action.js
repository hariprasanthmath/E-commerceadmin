

export const getDatafrombackend = (dispatch, data)=>{
      dispatch({
        type : "SETPRODUCTSFROMSERVER",
        payload: data
      })
}

