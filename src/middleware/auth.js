 const jwt = require("jsonwebtoken");

const validTocken = function(req,res,next){

    let token = req.headers["x-Auth-token"];
    if(!token) token = req.headers["x-auth-token"];
    if (!token) return res.send({status:false, msg:"token must be present"});
    //console.log(token);
    
    
    let decodedToken = jwt.verify(token,"functionup-plutonium")
    req["decodedToken"]=decodedToken
    //console.log(decodedToken)
    if (!decodedToken){
     return res.send({ status: false, msg: "token is invalid" });
    }
         next()
 }

// //-----------------------------------------------------------------------------

const checkIfAuthorise = function(req, res, next) {
    // comapre the logged in user's id and the id in request
   let loggedInUserId= req.decodedToken.userId

    let reqestedUserId=req.params.userId
    console.log(reqestedUserId,loggedInUserId)
    if(reqestedUserId != loggedInUserId ){
        return res.send({status:false,message:"no permission"})
    }
    next()
}





 module.exports.validTocken = validTocken
 module.exports.checkIfAuthorise = checkIfAuthorise