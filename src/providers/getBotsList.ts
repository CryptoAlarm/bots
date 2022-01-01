import "dotenv/config"
import API from "./api"
import { IBots } from "../types/bots"

const hostWhere = process.env.HOST_WHERE

export const getBotsList = async () => {
  try {    

    if (process.env.ENVIROMENT_DEV) {
      return [
        {
          ref: "binancecoin",
          name: "BNB",
          symbol: "BNB",
          currency: "usd",
          subCurrency: "brl",
          discordApiKey: process.env.DISCORD_API_KEY_DEBUG1,
          discordId: process.env.DISCORD_ID_KEY_DEBUG1,          
        }
      ] as IBots[]
    }


    if (!hostWhere) {
      throw new Error("HOST_WHERE enviroment var isnt setup.");
    }

    const { data } = await API.get<IBots[]>(`/private/bots/${hostWhere}`)    
    return  data

  } catch (error) { 
    return [] 
  }   
}