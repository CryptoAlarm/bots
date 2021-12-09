import Client from "./discord/Client";
import { getBotsList } from "./providers/getBotsList";
import { IBots, BotsModel } from "./types/bots";
import {Bots} from "./discord/Bots"


let instance: Bots[] = []

function BotsMapCallback(instanceReference: Partial<BotsModel>) {

  return {
    ...instanceReference,

    client: new Client({ 
      ClientOptions: {
        intents: ["GUILD_MESSAGES"]
      },
      instanceReference     
    })
  } as IBots

}

;(async () => {
  try {
    const botsModel = await getBotsList();

    const BotsList = botsModel.map(BotsMapCallback);

    for (const bot of BotsList) {
      try {
        instance.unshift(new Bots(bot))        

        await instance[0].Login()

        bot.client.once("ready", instance[0].setIntervals)        
        bot.client.on("messageCreate", instance[0].onMessage)

      } catch (error) { }     
    }
    
    
  } catch (error) { }
})();
