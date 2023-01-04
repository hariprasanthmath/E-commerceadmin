import React from 'react';
import { useState } from 'react';
function Adminpage(props) {

    let [data, setdata] = useState("");
    const getmainroutedata = async ()=>{
         let response = await fetch("http://localhost:5000");
         let result = await response.json();
         setdata(result.message)
  
    }
    return (
        <>
          <p>{data}</p>
          <button onClick={getmainroutedata}>
             click
          </button>
          </>
    );
}

export default Adminpage;