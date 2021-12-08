import { ClientOptions } from "discord.js-light";
import { BotsModel } from "./bots";

export interface ClientProps {
  ClientOptions: ClientOptions;
  instanceReference: Partial<BotsModel>;
}
