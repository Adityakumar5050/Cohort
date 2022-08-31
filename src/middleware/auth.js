
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authentication = async function (req,res,next){
   try{ 
    let token = req.headers["x-Auth-token"];
    if (!token) 
        {token = req.headers["x-auth-token"]};
    if (!token) 
       { return res.status(403).send({ status: false, msg: "token must be present" })};
next()}
   catch (error) {
       res.status(500).send({ error: error.message })
   }
    }

const authorization = async function (req, res, next) {
    try{
        let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];


    let decodedToken = jwt.verify(token, "functionup-plutonium-very-very-secret-key");
    if (decodedToken.userId !== req.params.userId) {
        return res.status(401).send({ status: false, msg: "UserId or Token is Wrong" });
    }
    else { next() }}

    catch (error) {
        res.status(500).send({ error: error.message })
    }
}



    // const params = async function (req,res,next){
    //  try{let userId = req.params.userId;
    //  let userDetails = await userModel.findById(userId);




















































//  const jwt = require("jsonwebtoken");

// const validTocken = function(req,res,next){

//     let token = req.headers["x-Auth-token"];
//     if(!token) token = req.headers["x-auth-token"];
//     if (!token) return res.send({status:false, msg:"token must be present"});
//     //console.log(token);
    
    
//     let decodedToken = jwt.verify(token,"functionup-plutonium")
//     req["decodedToken"]=decodedToken
//     //console.log(decodedToken)
//     if (!decodedToken){
//      return res.send({ status: false, msg: "token is invalid" });
//     }
//          next()
//  }

// // //-----------------------------------------------------------------------------

// const checkIfAuthorise = function(req, res, next) {
//     // comapre the logged in user's id and the id in request
//    let loggedInUserId= req.decodedToken.userId

//     let reqestedUserId=req.params.userId
//     console.log(reqestedUserId,loggedInUserId)
//     if(reqestedUserId != loggedInUserId ){
//         return res.send({status:false,message:"no permission"})
//     }
//     next()
// }





  module.exports.authentication = authentication
 module.exports.authorization = authorization