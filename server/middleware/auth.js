const jwt = require("jsonwebtoken");
const config = require("../config/index")
async function auth(req, res, next){
    let authorization = req.headers.authorization;

    if(authorization){
        let token = authorization.split(" ").pop();
        try{
            if(token){
                jwt.verify(token, config.JWTKEY);
                let email = jwt.decode(token);
                
                console.log(email);
                // res.send("testing passed")
                req.email = email.email;
                next();
            }else{
                return res.send({message:"not authorized"})
            }
        }catch(err){
            return res.send("testing error")
        }
    }else{
        return res.send({message:"not authorized"});
    }
}

module.exports = auth;