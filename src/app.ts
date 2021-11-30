import { Client } from "discord.js";

import { PriceBotClass } from "./types/bots";
import { TokenData } from "./types/token";

export default class PRICEBOT {
  
  private client: Client[] = [];
  private requestIntervalInSeconds: number;
  private isConfigRightFormated: boolean;
  private TokenData?: TokenData;
  private TokenDataHistory?: TokenData;
  private turnIntoSubcurrencyAndPercent: boolean[] = [];
  private params: PriceBotClass;

  private GuildsRefId?: string[];

  constructor({
    currencyIdDecode,
    discordApiKey,
    subCurrency,
    symbolIdDecode,
    network,
  }: PriceBotClass) {
    this.isConfigRightFormated = this.validateConfig({
      currencyIdDecode,
      symbolIdDecode,
      discordApiKey,
      subCurrency,
      network,
    });

    this.params = {
      currencyIdDecode,
      symbolIdDecode,
      discordApiKey,
      subCurrency,
      network,
    };

    this.requestIntervalInSeconds = 15 * 1000;

    discordApiKey.forEach((_) =>
      this.client.push(
        new Client({
          messageCacheMaxSize: 10,
          messageCacheLifetime: 0,
          messageSweepInterval: 0,
          

          fetchAllMembers: false,
        })
      )
    );
    discordApiKey.forEach((_) =>
      this.turnIntoSubcurrencyAndPercent.push(false)
    );
  }

  private validateConfig = (_: PriceBotClass): boolean => {
    try {
      return (
        _.currencyIdDecode.length === _.discordApiKey.length &&
        _.currencyIdDecode.length === _.subCurrency.length &&
        _.currencyIdDecode.length === _.symbolIdDecode.length
      );
    } catch (err) {
      console.log("validation error");
      console.log(err);
      return false;
    }
  };
}
