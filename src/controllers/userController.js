const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (abcd, xyz) {
  //You can name the req, res objects anything.
  //but the first parameter is always the request 
  //the second parameter is always the response
  let data = abcd.body;
  let savedData = await userModel.create(data);
  console.log(abcd.newAtribute);
  xyz.send({ msg: savedData });
};

//-------------------------------------------------Login--------------------------------------------------

const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.send({
      status: false,
      msg: "username or the password is not corerct",           
    });


    let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "Plutonium",
      organisation: "FunctionUp",
    },
    "functionup-plutonium"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, data: token });
};

//-------------------------------------------------------GetUser------------------------------------------------

const getUserData = async function (req, res) {


  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });

  res.send({ status: true, data: userDetails });
};

//---------------------------------------------------Update ---------------------------------------------------

const updateUser = async function (req, res) {

  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  //Return an error if no user with the given id exists in the db
  if (!user) {
    return res.send("No such user exists");
  }

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, {$set:userData}, { new: true , upsert: true});
  res.send({ status: updatedUser, data: updatedUser });
};

//---------------------------------------------Post Message------------------------------------------------------

// const postMessage = async function (req, res) {
//     let message = req.body.message
//     let token = req.headers["x-auth-token"]
//     if(!token) return res.send({status: false, msg: "token must be present in the request header"})
//     let decodedToken = jwt.verify(token, 'functionup-plutonium')

//     if(!decodedToken) return res.send({status: false, msg:"token is not valid"})
    
//     //userId for which the request is made. In this case message to be posted.
//     let userToBeModified = req.params.userId
//     //userId for the logged-in user
//     let userLoggedIn = decodedToken.userId

//     //userId comparision to check if the logged-in user is requesting for their own data
//     if(userToBeModified != userLoggedIn) return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'})

//     let user = await userModel.findById(req.params.userId)
//     if(!user) return res.send({status: false, msg: 'No such user exists'})
    
//     let updatedPosts = user.posts
//     //add the message to user's posts
//     updatedPosts.push(message)
//     let updatedUser = await userModel.findOneAndUpdate({_id: user._id},{posts: updatedPosts}, {new: true})

//     //return the updated user document
//     return res.send({status: true, data: updatedUser})
// }

//-----------------------------------------------------------Delete--------------------------------------------------------------------



const deleteUser = async function (req, res) {
  
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if(!user){
     return res.send({satus:false, msg:"invaild userID"})
    }
  //Return an error if no user with the given id exists in the db

  //let userData = req.body;
  let deleteUser = await userModel.findOneAndUpdate({ _id: userId }, {isDeleted:true},{new:true});
  res.send({ status: true, data: deleteUser });
};



//------------------------------------------Export Module--------------------------------------------------

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
//module.exports.postMessage = postMessage
module.exports.deleteUser = deleteUser
