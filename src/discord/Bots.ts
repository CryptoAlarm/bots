import { Message } from "discord.js-light";
import { IBots, IBotsConfig } from "../types/bots";

import * as Provider from "../providers/"
import * as Commands from "./commands"
import * as Events from "./events"


export class Bots{

  private config?: IBotsConfig  = {}
  private turnIntoSubcurrencyAndPercent: boolean = false

  constructor(private instanceReference: IBots, config?: IBotsConfig) {

    this.config = {
      setActivityIntervalInSeconds: 1000 * (config?.setActivityIntervalInSeconds || 15)
    } 
  }

  Login = () => {
    return Commands.Login(this.instanceReference.client, this.instanceReference.discordApiKey)      
  }

  setActivity  = () =>  {
    
    const { tokenPrice, tokenPriceHistory } = Provider.getPricesListHistory(this.instanceReference.ref)

    this.turnIntoSubcurrencyAndPercent = !this.turnIntoSubcurrencyAndPercent

    Commands.setActivity({
      instanceReference: this.instanceReference,
      tokenPrice,
      tokenPriceHistory,
      turnIntoSubcurrencyAndPercent: this.turnIntoSubcurrencyAndPercent
    })

  }
  
  setIntervals = () => {
    setTimeout(this.setActivity, 0)
    setInterval(this.setActivity, this.config.setActivityIntervalInSeconds)
  }

  onMessage = (message: Message) => {
    return Events.onMessage(
      message, 
      this.instanceReference,
      Provider.getPricesListHistory(this.instanceReference.ref).tokenPrice
    )  
  }

  Logger(whoCalled: string) {

  }

  onDisconnect  = () =>  {

  }
}
