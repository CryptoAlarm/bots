import { Message } from "discord.js-light";
import { IBots } from "../../types/bots";
import {Prices, WanakaFilter} from "../commands";

const prefix = "!"  

const is = (command: string, startWith: string): boolean => {
  return command.startsWith(prefix + startWith)
}
const includes = (command: string, checkIfIncluded: string) => {
  return command.includes(checkIfIncluded.toUpperCase())
}

export default (message: Message, instanceReference: IBots, TokenDataUnique) => {
  try {
  
    const command = message.content.toUpperCase();
   
    if (is(command, instanceReference.name.toUpperCase())) {      
      return Prices({ message,instanceReference, TokenDataUnique })
    }
   
    else if (instanceReference.symbol === "WANA") {

      if (is(command, "HELP")) {
        return WanakaFilter.help(message)
      }

      else if (is(command, "FILTER")) {
        return WanakaFilter.filter(message)
      }

      else {

        const landBaseURL = "https://marketplace.wanakafarm.com/#/lands"

        if (is(command, "LAND") || includes(command, landBaseURL)) {
          return WanakaFilter.byLand(message)
        }
        
      }
    }



   

  } catch (error) { }
}