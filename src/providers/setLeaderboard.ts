import API from "./api"

export interface Leaderboard {
  id: string 
  token: string 
  guildId: string 
  ownerId?: string 
  name?: string 
  nameAcronym?: string 
  createdTimestamp?: string
  memberCount?: number
  preferredLocale?: string
  splash?: string
  icon?: string
}

let queue: Leaderboard[] =  Array<Leaderboard>()


export const clean = async () => {
  queue = Array<Leaderboard>()
}

export const post = async () => {
  try {
    console.log(`trying to push ${queue?.length} bots to leaderboard.`)
    const {data} = await API.post<{ok: boolean}>("/private/guilds", queue)    
    if (data.ok === true) { clean() }
  } 
  catch (err) { 
    console.log(`Failed to push bots to leaderboard`)
    console.log({
      message: err?.message.substr(0,150),
      err: JSON.stringify(err || []).substr(0, 200)
    })
  } 
}

export const push = (guilds: Leaderboard[]) => {
  
  queue.push(
    ...guilds.filter(guild => {      
      for (let __guild of queue) {
        if (__guild.id === guild.id)
          return false
      }
      return true
    })
  )
}


const _30minutes = 1000 * 60 * 30
const _5minutes = 1000 * 60 * 5

setTimeout(post,_5minutes);
setInterval(post, _30minutes)