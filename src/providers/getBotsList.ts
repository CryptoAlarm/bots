import "dotenv/config"
import {BotsData} from "../test.data"


export const getBotsList = async () => {

//  const { data } = await serverAPI.get<IBots[]>(endpoint)
  
  const data = BotsData

  return data
}