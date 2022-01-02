import BotsApplication from "./app"
import "dotenv/config"
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

  console.log("Catch supremo")
  
  try {
    console.error({
      name: error.name?.substr(0, 150),
      message: error.message?.substr(0, 150),
      stack: error.stack?.substr(0,150)
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
