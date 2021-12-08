import Client from "./discord/Client";
import { getBotsList } from "./providers/getBotsList";
import { IBotsReduced, IBots, BotsModel } from "./types/bots";

import {Bots} from "./discord/Bots"

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

    const __Bots = botsModel.map(BotsMapCallback);

   /* const Bots = BotsMap.reduce((previous, currentObject) => {

      for (const key of Object.keys(currentObject)) {
        previous[key] = previous[key] || []        
        previous[key].push(currentObject[key])
      }

      return previous

    }, {} as IBotsReduced)*/

    let instance:Bots[] = []

    for (const bot of __Bots) {
      try {
        instance.unshift(new Bots(bot))        

        await instance[0].Login()
        bot.client.once("ready", instance[0].setIntervals)        
        bot.client.on("messageCreate", instance[0].onMessage)

      } catch (error) {
        console.log(error)
      }     
    }

   
   
    
    
  } catch (error) { }
})();
