import "dotenv/config"
import API from "./api"
import { IBots } from "../types/bots"

export const getBotsList = async () => {
  try {
    const { data } = await API.get<IBots[]>(`/getBotsList`)
    
    return data

  } catch (error) { return [] }   
}