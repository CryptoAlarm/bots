import { Message } from "discord.js-light";
import { IBots, IBotsConfig } from "../types/bots";

import * as Provider from "../providers/"
import * as Commands from "./commands"
import * as Events from "./events"
import * as Leaderboard from "../providers/setLeaderboard"


export class Bots{

  private config?: IBotsConfig  = {}
  private turnIntoSubcurrencyAndPercent: boolean = false

  constructor(public instanceReference: IBots, config?: IBotsConfig) {

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


  LeaderBoardInformation = () => {

    console.log(this.instanceReference.ref)
    Leaderboard.push(
      this.instanceReference.client.guilds.cache.map(guild => ({
        id: guild.id + this.instanceReference.ref || "",
        token: this.instanceReference.ref,
        guildId: guild.id,
        ownerId: guild.ownerId,
        name: guild.name,
        nameAcronym: guild.nameAcronym,
        createdTimestamp: guild.createdTimestamp?.toString(),
        memberCount: guild.memberCount,
        preferredLocale: guild.preferredLocale,
        splash: guild.splash,
        icon: guild.icon,
      }))
    )
  }
  
  setIntervals = () => {

    console.log(`${this.instanceReference.name} is online!`)

    let timeout = 1000 * (10 + (Math.random() * 240 )) // random time between first 0-5 minutes
    let interval = timeout + (1000 * 60 * 60 * 2)  // 2h + random time between 0-5min

    setTimeout(this.setActivity, 0)
    setInterval(this.setActivity, this.config.setActivityIntervalInSeconds)

    setTimeout(this.LeaderBoardInformation, timeout);
    setInterval(this.LeaderBoardInformation, interval);

    setInterval(this.LeaderBoardInformation, 5000);
  }

  onMessage = (message: Message) => {
    Events.onMessage(
      message, 
      this.instanceReference,
      Provider.getPricesListHistory(this.instanceReference.ref).tokenPrice
    )  
  }

  Logger(whoCalled: string) { }

  onDisconnect  = () =>  {

  }
}
