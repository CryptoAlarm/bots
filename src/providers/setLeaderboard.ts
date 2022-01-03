import API from "./api"

export interface Leaderboard {
  id: string 
  token: string 
  guildId: string 
  createdTimestamp?: string
}

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

    const {data} = await API.post("/private/guilds", {
      Guilds: queue.splice(0, 1000)
    }, {
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    })    

    if (data.ok === true) { clean() }
  } 
  catch (err) { 
    
    console.log(`Failed to push bots to leaderboard`)
    console.log({
      message: err?.message.substr(0,150),
      err: JSON.stringify(err || [], null, 2).substr(0, 2500)
    })
    console.log(err)
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


const _2minutes = 1000 * 60 * 2
const _3minutes = 1000 * 60 * 3

setTimeout(() => {
  post()

  setInterval(post, _2minutes)

}, _3minutes);