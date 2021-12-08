import { Message } from "discord.js-light";
import { IBots } from "../../types/bots";
import {Prices} from "../commands";

export default (message: Message, instanceReference: IBots, TokenDataUnique): void => {
  try {

   
    if (message.content.toUpperCase().startsWith("!" + instanceReference.name.toUpperCase())) {
      
      Prices({
        message,
        instanceReference,
        TokenDataUnique
      })
      
    }

  } catch (error) { }
}