import API from "./api"
import { TokenData, TokenDataUnique } from "../types/token"

let data: TokenData = {}

export const getPricesListHistory = (ref: string): {tokenPriceHistory: TokenDataUnique, tokenPrice: TokenDataUnique} => {
  
  if (process.env.ENVIROMENT_DEV) {
    return {
      "tokenPrice": {
        usd: 20,
        brl: 100
      },
      tokenPriceHistory: {
        usd: 10,
        brl: 50
      }
    }
  }
  
  return {
    tokenPrice: data?.[ref] || {},
    tokenPriceHistory: data?.["_24hoursBefore"]?.[ref] || {},
  }
}

;(() => {

 
  if (process.env.ENVIROMENT_DEV) {
    return false
  }
  
  const factory = async () => {
    try { 
      const {data: response} = await API.get<TokenData>("/mergePrices") 
      data = response
    } 
    catch (error) {} 
  }

  factory()  
  setInterval(factory, 2000) 
})();
