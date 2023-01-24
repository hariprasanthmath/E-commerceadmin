const jwt = require("jsonwebtoken");
const config = require("../config/index")
async function auth(req, res, next){
    let authorization = req.body.headers.Authorization;
   
    if(authorization){
        let token = authorization.split(" ").pop();
        console.log(token);
        try{
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
            // return   res.redirect('/logout');
            return res.send(err)
        }
    }else{
        return res.send({message:"not authorized"});
    }
}

module.exports = auth;