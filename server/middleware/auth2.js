const jwt = require("jsonwebtoken");
const config = require("../config/index")
async function auth2(req, res, next){
    let authorization = req.headers.authorization;
   console.log(authorization);
    if(authorization){
      
        try{
            let token = authorization.split(" ").pop();
            console.log(token);
            if(token){
                jwt.verify(token, config.JWTKEY);
                let email = jwt.decode(token);
                
                console.log(email);
                // res.send("testing passed")
                req.email = email.email;
                next();
            }else{
                return res.send({message:"not authorized 1"})
            }
        }catch(err){
            console.log(err);
        //    return res.redirect('/logout');
            return res.send(err)
        }
    }else{
        return res.send({message:"not authorized"});
    }
}

module.exports = auth2;