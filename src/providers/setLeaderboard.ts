import { Leaderboard } from "../types/bots"
import API from "./api"

let queue: Leaderboard[] =  Array<Leaderboard>()
let queueHistory: Leaderboard[] =  Array<Leaderboard>()

export const clean = async () => {
  queue = Array<Leaderboard>()
}

export const post = async () => {
  try {

    if (queue.length < 1) {
      return
    }
    console.log(`trying to push ${queue?.length} bots to leaderboard.`)

    await API.post("/private/guilds", { Guilds: queue.splice(0, 500)})    

  } 
  catch (err) { 
    
    console.log({
      log: "Failed to push bots to leaderboard",
      message: err?.message.substr(0,50),
      status: err?.statusCode,
      http: err?.status,
    })
  }
}

export const push = (guilds: Leaderboard[]) => {
  

  queue.push(
    ...guilds.filter(guild => {      
      for (let __guild of queueHistory) {
        if (__guild.id === guild.id)
          return false
      }
      return true
    })
  )

  queueHistory.push(
    ...guilds.filter(guild => {      
      for (let __guild of queueHistory) {
        if (__guild.id === guild.id)
          return false
      }
      return true
    })
  )

}


const _1minutes = 1000 * 60 * 1
const _3minutes = 1000 * 60 * 3

setTimeout(() => {
  post()

  setInterval(post, _1minutes)

}, _3minutes);