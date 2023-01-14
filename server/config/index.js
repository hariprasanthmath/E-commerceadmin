require("dotenv").config();

const config = {
    JWTKEY : process.env.JWTSECRETKEY,
    JWTEXPIRETIME : process.env.TOKENEXPTIME
}

module.exports = config;