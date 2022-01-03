import Client from "./discord/Client";
import { getBotsList } from "./providers/getBotsList";
import { IBots, BotsModel } from "./types/bots";
import { Bots } from "./discord/BotsController";
import { InstancesIdWhoShouldUseShards } from "./discord/ShardsOptions";

let instance: Bots[] = [];
let instanceFailedToLogin: string[] = []


async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function BotsMapCallback(instanceReference: Partial<BotsModel>) {
  return {
    ...instanceReference,

    client: new Client({
      ClientOptions: {
        intents: ["GUILD_MESSAGES"],
      },
      
      instanceReference,
    }),
  } as IBots;
}

async function BotsBuildObjectAndCheckForChanges () {
  
  const botsModel = await getBotsList();

  const BotsList = botsModel.map(BotsMapCallback)
    .filter(newBot => {      

      if (instanceFailedToLogin.includes(newBot.discordId)) {
        return false
      }

      for (const bot of instance) {
        if (bot.instanceReference.discordId === newBot.discordId)
          return false
      }
      return true
    });

  for (const bot of BotsList) {
    try {      
      const thisBot = new Bots(bot)      

      thisBot.Login()
        .then(response => {
          bot.client.once("ready", thisBot.setIntervals);
          bot.client.on("messageCreate", thisBot.onMessage);
       
          instance.unshift(thisBot);   
        })
        .catch(error => {
     
          instanceFailedToLogin.push(thisBot.instanceReference.discordId)
          
          console.log(`Failed to login bot ${thisBot.instanceReference.name}`)
          console.log({
            message: error?.message?.substr(0, 100),
            err: JSON.stringify(error || []),
            instance: {
              ...thisBot.instanceReference,
              client: null,
              discordApiKey: null
            }
          })
        })
        
          
      if (InstancesIdWhoShouldUseShards.includes(bot.discordId)) {
        await sleep(3000)
      }
    } 
    catch (error) {
      console.log("Failed to authenticate " + bot.name)
    }
  }
}

export default async () => {
  try {
    setTimeout(BotsBuildObjectAndCheckForChanges, 0);
    setInterval(BotsBuildObjectAndCheckForChanges, 1000 * 60)
  } catch (error) {}
}
