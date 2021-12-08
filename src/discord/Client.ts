import { Client } from "discord.js-light";
import { BotsModel } from "../types/bots";
import { ClientProps } from "../types/discord";

import { LightCache } from "./CacheControl";
import { InstancesIdWhoShouldUseShards, ShardsOptions } from "./ShardsOptions";


export default class extends Client {

  readonly instanceReference: Partial<BotsModel>

  constructor({ ClientOptions, instanceReference }: ClientProps) {

    InstancesIdWhoShouldUseShards.includes(instanceReference.discordId)
      ?  super({ ...LightCache, ...ClientOptions, ...ShardsOptions })
      :  super({ ...LightCache, ...ClientOptions })

    this.instanceReference = instanceReference;
  }

}
