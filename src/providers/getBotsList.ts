import "dotenv/config"
import API from "./api"
import { IBots } from "../types/bots"

const hostWhere = process.env.HOST_WHERE

export const getBotsList = async () => {
  try {    

    if (!hostWhere) {
      throw new Error("HOST_WHERE enviroment var isnt setup.");
    }

    const { data } = await API.get<IBots[]>(`/private/bots/${hostWhere}`)    
    return  data

  } catch (error) { 

    console.log(`Failed to fetch prices. getBotsList`)
    console.log({
      message: error?.message.substr(0,150),
      err: JSON.stringify(error || []).substr(0, 200)
    })
    return [] 
  }   
}