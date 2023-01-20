import axios from "axios";

export const getAdminProfile = async (endPoint, jwt)=>{
     try{
          
        let {data} = await axios.get(endPoint, {
            headers : {
                
                'Authorization' : "Bearer "+  jwt
            }
        });

    
        return data;

     }catch(err){
          return err;
     }
}