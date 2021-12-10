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
      const {data: response} = await API.get<TokenData>("/getPriceInfo") 
      data = response
    } 
    catch (error) {} 
  }

  factory()
  setInterval(factory, 2000) 
})();
