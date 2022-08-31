// const jwt = require("jsonwebtoken");
// const userModel = require("../models/userModel");

const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");




/////============================================== CREATING A USER ========================================

const createUser = async function (req, res) {
  try {
    let data = req.body;
    if (!data) {
      res.status(400).send({ msg: "body is empty.please enter keys" })
    }
    let savedData = await userModel.create(data);
    res.status(201).send({ msg: savedData });
  }

  catch (error) {
    res.status(500).send({ error: error.message })
  }
};

////=================================== WHEN USER LOGIN =========================================================

const loginUser = async function (req, res) {
  try {
    let userName = req.body.emailId;
    let password = req.body.password;

    let user = await userModel.findOne({ emailId: userName, password: password });
    if (!(userName && password))
      return res.status(400).send({
        status: false,
        msg: "please enter userName and password"
      });
    if (!user)
      return res.status(401).send({
        status: false,
        msg: "username or the password is not correct",
      });

    let token = jwt.sign(
      {
        userId: user._id.toString(), //////////////// PAYLOAD
        batch: "PLUTONIUM",
        organisation: "FunctionUp",
      },
      "functionup-plutonium-very-very-secret-key" //// SECRET KEY
    );
    res.setHeader("x-auth-token", token);
    res.status(201).send({ status: true, token: token });
  }

  catch (error) {
    res.status(500).send({ error: error.message })
  }
};



////============================================ GET USER DATA ===================================================

const getUserData = async function (req, res) {
  try{
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.status(404).send({ status: false, msg: "No such user exists" });
  res.status(200).send({ status: true, data: userDetails });
}
  catch (error) {
    res.status(500).send({ error: error.message })
  }
};

/////======================================== UPDATE USER DATA =========================================

const updateUser = async function (req, res) {
 try{ let userData = req.body;
  let userId = req.params.userId;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData, { new: true });
  res.status(201).send({ status: updatedUser, data: updatedUser });}

  catch (error) {
    res.status(500).send({ error: error.message })
  }
};

/////================================= DELETING A USER ==========================================================

const deleteUser = async function (req, res) {
 try{ let userId = req.params.userId;
  let updatedUser = await userModel.findOneAndUpdate(
    { _id: userId },
    { isDeleted: true },
    { new: true }
  );
  res.status(201).send({ status: true, data: updatedUser });}
  catch (error) {
    res.status(500).send({ error: error.message })
  }
}



module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;


// const jwt = require("jsonwebtoken");
// const userModel = require("../models/userModel");

// const authentication = async function (req,res,next){
//    try{ 
//     let token = req.headers["x-Auth-token"];
//     if (!token) 
//         {token = req.headers["x-auth-token"]};
//     if (!token) 
//        { return res.status(403).send({ status: false, msg: "token must be present" })};
// next()}
//    catch (error) {
//        res.status(500).send({ error: error.message })
//    }
//     }

// const authorization = async function (req, res, next) {
//     try{
//         let token = req.headers["x-Auth-token"];
//     if (!token) token = req.headers["x-auth-token"];


//     let decodedToken = jwt.verify(token, "functionup-plutonium-very-very-secret-key");
//     if (decodedToken.userId !== req.params.userId) {
//         return res.status(401).send({ status: false, msg: "UserId or Token is Wrong" });
//     }
//     else { next() }}

//     catch (error) {
//         res.status(500).send({ error: error.message })
//     }
// }



    // const params = async function (req,res,next){
    //  try{let userId = req.params.userId;
    //  let userDetails = await userModel.findById(userId);

















































// // const createUser = async function (abcd, xyz) {
// //   //You can name the req, res objects anything.
// //   //but the first parameter is always the request 
// //   //the second parameter is always the response
// //   let data = abcd.body;
// //   let savedData = await userModel.create(data);
// //   console.log(abcd.newAtribute);
// //   xyz.send({ msg: savedData });
// // };

// // //-------------------------------------------------Login--------------------------------------------------

// // const loginUser = async function (req, res) {
// //   let userName = req.body.emailId;
// //   let password = req.body.password;

// //   let user = await userModel.findOne({ emailId: userName, password: password });
// //   if (!user)
// //     return res.send({
// //       status: false,
// //       msg: "username or the password is not corerct",           
// //     });


// //     let token = jwt.sign(
// //     {
// //       userId: user._id.toString(),
// //       batch: "Plutonium",
// //       organisation: "FunctionUp",
// //     },
// //     "functionup-plutonium"
// //   );
// //   res.setHeader("x-auth-token", token);
// //   res.send({ status: true, data: token });
// // };

// // //-------------------------------------------------------GetUser------------------------------------------------

// // const getUserData = async function (req, res) {


// //   let userId = req.params.userId;
// //   let userDetails = await userModel.findById(userId);
// //   if (!userDetails)
// //     return res.send({ status: false, msg: "No such user exists" });

// //   res.send({ status: true, data: userDetails });
// // };

// // //---------------------------------------------------Update ---------------------------------------------------

// // const updateUser = async function (req, res) {

// //   let userId = req.params.userId;
// //   let user = await userModel.findById(userId);
// //   //Return an error if no user with the given id exists in the db
// //   if (!user) {
// //     return res.send("No such user exists");
// //   }

// //   let userData = req.body;
// //   let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, {$set:userData}, { new: true , upsert: true});
// //   res.send({ status: updatedUser, data: updatedUser });
// // };

// // //---------------------------------------------Post Message------------------------------------------------------

// // // const postMessage = async function (req, res) {
// // //     let message = req.body.message
// // //     let token = req.headers["x-auth-token"]
// // //     if(!token) return res.send({status: false, msg: "token must be present in the request header"})
// // //     let decodedToken = jwt.verify(token, 'functionup-plutonium')

// // //     if(!decodedToken) return res.send({status: false, msg:"token is not valid"})
    
// //     //userId for which the request is made. In this case message to be posted.
// //     let userToBeModified = req.params.userId
// //     //userId for the logged-in user
// //     let userLoggedIn = decodedToken.userId

// //     //userId comparision to check if the logged-in user is requesting for their own data
// //     if(userToBeModified != userLoggedIn) return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'})

// //     let user = await userModel.findById(req.params.userId)
// //     if(!user) return res.send({status: false, msg: 'No such user exists'})
    
// //     let updatedPosts = user.posts
// //     //add the message to user's posts
// //     updatedPosts.push(message)
// //     let updatedUser = await userModel.findOneAndUpdate({_id: user._id},{posts: updatedPosts}, {new: true})

// //     //return the updated user document
// //     return res.send({status: true, data: updatedUser})
// // }

// //-----------------------------------------------------------Delete--------------------------------------------------------------------



// const deleteUser = async function (req, res) {
  
//   let userId = req.params.userId;
//   let user = await userModel.findById(userId);
//   if(!user){
//      return res.send({satus:false, msg:"invaild userID"})
//     }
//   //Return an error if no user with the given id exists in the db

//   //let userData = req.body;
//   let deleteUser = await userModel.findOneAndUpdate({ _id: userId }, {isDeleted:true},{new:true});
//   res.send({ status: true, data: deleteUser });
// };



// //------------------------------------------Export Module--------------------------------------------------

// module.exports.createUser = createUser;
// module.exports.getUserData = getUserData;
// module.exports.updateUser = updateUser;
// module.exports.loginUser = loginUser;
// //module.exports.postMessage = postMessage
// module.exports.deleteUser = deleteUser
