import "dotenv/config"
import {BotsData} from "../test.data"

let data:any = BotsData

export const getBotsList = async () => {
  try {
    //  const { data } = await serverAPI.get<IBots[]>(endpoint)
    

    let data = BotsData

    return data

  } catch (error) { return [] }   
}