const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const commonMV=require("../middleware/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser)

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId",commonMV.validTocken,commonMV.checkIfAuthorise, userController.getUserData)


//router.post("/users/:userId/posts",commonMV.authorise, userController.postMessage)

router.put("/users/:userId",commonMV.validTocken,commonMV.checkIfAuthorise, userController.updateUser)

router.delete('/users/:userId',commonMV.validTocken,commonMV.checkIfAuthorise, userController.deleteUser)


module.exports = router;
