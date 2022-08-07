function  printDate(){
    let dob = new Date()
    console.log(dob.getDate()) 
    printmonth()
    }
    
    function  printmonth(){
      let  dob =  new Date()
      console.log(dob.getMonth()) 
      printBatchinfo()
    }
    
      function  printBatchinfo(){
        let dob = new Date()
        console.log("Plutonium, W3D5, topic for today is Nodejs module system" ) 
        }
        module.exports.printDate = printDate