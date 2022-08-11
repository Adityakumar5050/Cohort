const express = require('express');
const router = express.Router();

router.get('/students/:name', function(req, res) {
    let studentName = req.params.name
    console.log(studentName)
    res.send(studentName)
})

router.get("/random" , function(req, res) {
    res.send("hi there")
})


router.get("/test-api" , function(req, res) {
    res.send("hi FunctionUp")
})


router.get("/test-api-2" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API")
})


router.get("/test-api-3" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's ")
})


router.get("/test-api-4" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
})



router.get("/test-api-5" , function(req, res) {
    res.send("hi FunctionUp5. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
})

router.get("/test-api-6" , function(req, res) {
    res.send({a:56, b: 45})
})

router.post("/test-post", function(req, res) {
    res.send([ 23, 45 , 6])
})


router.post("/test-post-2", function(req, res) {
    res.send(  { msg: "hi" , status: true }  )
})

router.post("/test-post-3", function(req, res) {
     let id = req.body.user
     let pwd= req.body.password

     console.log( id , pwd)

    console.log( req.body )

    res.send(  { msg: "hi" , status: true }  )
})



router.post("/test-post-4", function(req, res) {
    let arr= [ 12, "functionup"]
    let ele= req.body.element
    arr.push(ele)
    res.send(  { msg: arr , status: true }  )
})







// // Route to create new player



// // Assignments(Structure of the routes file would look like what is given at the bottom of the document):
// // You have to write a POST apis:
// // Write the api in first project directory (Routes/index.js or routes/route.js)
// // Problem Statement 1 :
// // NOTE: you must create the players array outside( on the top ) of the api( so that data is maintained across api hits )
// // Your player collection should be an ARRAY of player objects. Each player object should have the following attributes:


 let players =
    [
        {
            "name": "manish",
            "dob": "1/1/1995",
            "gender": "male",
            "city": "jalandhar",
            "sports": [
                "swimming"
         ]
        },
        {
            "name": "gopal",
            "dob": "1/09/1995",
            "gender": "male",
            "city": "delhi",
            "sports": [
                "soccer"
            ]
        },
        {
            "name": "lokesh",
            "dob": "1/1/1990",
            "gender": "male",
            "city": "mumbai",
           "sports": [
                "soccer"
            ]
        }
    ]
    router.post('/players', function (req, res) {
    
     let newPlayer = req.body
     let newPlayersName = newPlayer.name
     let isNameRepeated = false

//     //let player = players.find(p => p.name == newPlayersName)

     for(let i = 0; i < players.length; i++) {
         if(players[i].name == newPlayersName) {
             isNameRepeated = true;
             break;
         }
     }

//     //undefined is same as false/ a falsy value
     if (isNameRepeated) {
         //Player exists
         res.send("This player was already added!")
     } else {
         //New entry
         players.push(newPlayer)
         res.send(players)
     }
 });

 // //  problem 2
// you will  be give an aaray of person (i.e an array of object) ..each person will have a { name : string ,age :number ,votingstatus :true/false(Boolean)}
//
 //take input in query params as votingstatus.. and for all the people above that age , change votingstatus as true

// also return am array consisting of only the person that can vote 


// Write a post api to the above 
// take this as sample for array of persons:





router.post("/vote", function (req, res) {

    let person =[
        {
            name : "pk",
            age : 10,
            votingstatus : false
        },
    
        {
            name : "sk",
            age : 20,
            votingstatus : false
        },
        {
            name : "AA",
            age : 70,
            votingstatus : false
        },
        {
            name : "Sc",
            age : 5,
            votingstatus : false
        },
        {
            name : "HO",
            age : 40,
            votingstatus : false
        }
    ]
    
    let votingAge = req.query.votingAge;
      
        for (i = 0; i < person.length; i++) {
          if (person[i].age > votingAge) {
            person[i].votingStatus = true;
          }
        }
      
        //   let result = person.filter((x) => x.age >votingAge).map((x) => (x.votingStatus = true));
      
        res.send({ date: person, status: true });
      });





module.exports = router;





