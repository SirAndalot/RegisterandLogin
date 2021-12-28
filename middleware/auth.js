const jwt = require("jsonwebtoken");

const verifyUserToken = (req, res, next) => {
    let bearerToken = req.headers.authorization|| '';
    // console.log(token,'token')
    if (!bearerToken) return res.status(401).send("Access denied");
    try {
   
        console.log(typeof(bearerToken))
        // token = token.split('')
        const [, token] = bearerToken.split(' ')
      
        if (token == 'null' || !token) return res.status(401).send('Unauthorized request');
        let verifieduser = jwt.verify(token, "verySecretValue")
        if (!verifieduser) return res.status(401).send("Unauthorized request")

        req.user = verifieduser;
        req.user_type= "user";
        next();
    } catch (err) {
      

        res.status(400).send("invalid Token");
    }
}
const IsUser = async (req, res, next) => {
    console.log("type",req.user_type)
    if (req?.user_type ==  "user") {
        next();
    }
    else{
        return res.status(401).send("Unauthorized");
    }
  
}

module.exports = {
    verifyUserToken,
    IsUser
};