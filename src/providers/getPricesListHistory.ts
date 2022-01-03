import API from "./api"
import { TokenData, TokenDataUnique } from "../types/token"

let data: TokenData = {}

export const getPricesListHistory = (ref: string): {tokenPriceHistory: TokenDataUnique, tokenPrice: TokenDataUnique} => {
  
  return {
    tokenPrice: data?.[ref] || {},
    tokenPriceHistory: data?.["_24hoursBefore"]?.[ref] || {},
  }
}

;(() => {

  const factory = async () => {
    try { 
      const {data: response} = await API.get<TokenData>("/mergePrices") 
      data = response
    } 
    catch (error) {
      console.log(`Failed to fetch prices. getPricesListHistory`)
      console.log({
        message: error?.message.substr(0,150),
        err: JSON.stringify(error || []).substr(0, 200)
      })
    } 
  }

  factory()  
  setInterval(factory, 2000) 
})();
