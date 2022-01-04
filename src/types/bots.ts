import Client from "../discord/Client"
import {Currencies, TokenData, TokenDataUnique} from "./token"

export type Network = "eth_mainnet" | "bscscan"
export interface BotsConfig {
  ref: string[], 
  name: string[], 
  discordApiKey: string[],
  subCurrency: string[],
  network: string[]
}

export interface IBotsReduced extends BotsConfig {
  client: Client[];
}


export interface BotsModel {
  ref: string;
  name: string;
  symbol: string;
  currency: Currencies
  subCurrency: Currencies;
  discordApiKey: string;
  discordId: string  
}

export interface IBots extends BotsModel {
  client: Client;
}

export interface IBotsConfig {
  setActivityIntervalInSeconds?: number
}
export interface IMethods {

  getPricesHistoryList: (ref: string) => TokenDataUnique
  setActivity: (client: Client, name: string) => Promise<void>
}

export interface Leaderboard {
  id: string 
  token: string 
  guildId: string 
}
