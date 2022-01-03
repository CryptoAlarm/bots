import BotsApplication from "./app"
import "dotenv/config"

import express from "express"
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});
app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}`)
})

/**
 * 
console.log("PID " + process.pid)

function printProgress(progress){
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
  process.stdout.write(progress);
}
const used = process.memoryUsage();

let memoryUsage = ""
for (let key in used) {
  memoryUsage += `${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB. `

}
printProgress(memoryUsage)
setInterval(() => {

  const used = process.memoryUsage();

  let memoryUsage = ""
  for (let key in used) {
    memoryUsage += `${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB. `

  }
  printProgress(memoryUsage)
 

}, 5000);


 */
process.on("uncaughtException", (error, origin) => {
  
  //console.log("Catch supremo")
  
  try {
    console.error({
   //   name: error.name?.substr(0, 150),
      message: error.message?.substr(0, 150),
   //   stack: error.stack?.substr(0,150),
   //   origin: origin?.substr(0,200)      
    })
    
  } 
  catch (error) {
    
  }
})




try {
  
  BotsApplication()

} 
catch (error) {
  
}
