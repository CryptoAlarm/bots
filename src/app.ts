import Client from "./discord/Client";
import { getBotsList } from "./providers/getBotsList";
import { IBots, BotsModel } from "./types/bots";
import { Bots } from "./discord/BotsController";

let instance: Bots[] = [];

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
      for (const bot of instance) {
        if (bot.instanceReference.discordId === newBot.discordId)
          return false
      }
      return true
    });

  for (const bot of BotsList) {
    try {      
      instance.unshift(new Bots(bot));

      await instance[0].Login();

      bot.client.once("ready", instance[0].setIntervals);
      bot.client.on("messageCreate", instance[0].onMessage);            
          
    } catch (error) {
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
