import axios from "axios"
import { TokenData, TokenDataUnique } from "../types/token"

let data: TokenData = {}

const factory = async () => {
  try { 
    const {data: response} = await axios.get<TokenData>("https://cryptoalarm.xyz/api/getPriceInfo") 
    data = response
  } 
  catch (error) {} 
}

factory()
setInterval(factory, 2000)

export const getPricesListHistory = (ref: string): {tokenPriceHistory: TokenDataUnique, tokenPrice: TokenDataUnique} => {
  return {
    tokenPrice: data?.[ref] || {},
    tokenPriceHistory: data?.["_24hoursBefore"]?.[ref] || {},
  }
}
