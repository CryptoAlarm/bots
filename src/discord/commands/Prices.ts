import {  Message, MessageEmbed } from "discord.js-light"
import { IBots } from "../../types/bots"
import { TokenDataUnique } from "../../types/token"

interface Props {
  message: Message 
  TokenDataUnique: TokenDataUnique
  instanceReference: IBots
}
export const Prices = ({message, TokenDataUnique, instanceReference}: Props) => {
  const splited = message.content.split(" ")
  
  let calculator = ""
  let calculatorConversion = ""


  if (splited[1]) {
    let value: number
    
    try {
      value = parseFloat(splited[1].replace("," , "."))

    } catch (e) {

      value = 1

    }

    if (value > 9999999999999) {
      return 
    }
    

    const prices = {}
    const pricesOut = {}

    Object.keys(TokenDataUnique)
      .map(key => {
        prices[key] = (value * (TokenDataUnique?.[key]  || 0) )
      })


    Object.keys(TokenDataUnique)
      .map(key => {
        pricesOut[key] = (value / (TokenDataUnique?.[key]  || 0) )
      })

    const fix = (n: number) => {
      return n > 10     
        ? n.toFixed(2)
        : n > 1
        ? n.toFixed(4)
        : n > 0.1
        ? n.toFixed(6)
        : n.toFixed(8)
    }

    calculator += `**${value}x ${instanceReference.name.toUpperCase()}**\n` +

    "🇺🇲 $ " + fix(prices?.["usd"] || 0) + "\n" + 
    "🇧🇷 R " + fix(prices?.["brl"]|| 0) + "\n" + 
    "🇵🇭 ₱ " + fix(prices?.["php"]|| 0) + "\n" +
    "💶 € " + fix(prices?.["eur"]|| 0) + "\n" + 
    ":flag_gb: £ " + fix(prices?.["gbp"]|| 0) + "\n" + 
    ":coin: ₿ " + fix(prices?.["btc"]|| 0) + "\n\n"

    calculatorConversion += `**Currency convertion**\n` + 

    `🇺🇲 $ ${value} is worth of ` + fix(pricesOut?.["usd"] || 0) +instanceReference.name + "\n" + 
    `🇧🇷 R ${value} is worth of ` + fix(pricesOut?.["brl"]|| 0) + instanceReference.name +"\n" + 
    `🇵🇭 ₱ ${value} is worth of ` + fix(pricesOut?.["php"]|| 0) + instanceReference.name +"\n" +
    `💶 € ${value} is worth of ` + fix(pricesOut?.["eur"]|| 0) + instanceReference.name +"\n" + 
    `:flag_gb: £${value} is worth of ` + fix(pricesOut?.["gbp"]|| 0) + instanceReference.name +"\n" + 
    `:coin: ₿${value} is worth of ` + fix(pricesOut?.["btc"]|| 0) + instanceReference.name +"\n"

    //`$${value} --- ${convertedOut} ${instanceReference.name.toUpperCase()}\n\n`
  }

  let dolar = "0";
  if (!TokenDataUnique?.usd) {
    dolar = "0"
  }
  else {  
    dolar = TokenDataUnique?.usd > 10 
      ? TokenDataUnique?.usd?.toFixed(2)
      : TokenDataUnique?.usd > 1
      ? TokenDataUnique?.usd?.toFixed(4)
      : TokenDataUnique?.usd > 0.1
      ? TokenDataUnique?.usd?.toFixed(6)
      : TokenDataUnique?.usd?.toFixed(8)
  }

  Promise.resolve(
    message.reply({
      embeds: [
        new MessageEmbed()
        .setAuthor("Click here to add our bots to your server", "https://cryptoalarm.xyz/logo.png", "https://cryptoalarm.xyz")
        .setDescription(` ${calculator}         
          **1x ${instanceReference.name.toUpperCase()}**\n` +
          "🇺🇲 $ " + dolar + "\n" + 
          "🇧🇷 R " + TokenDataUnique?.brl?.toFixed(2) + "\n" + 
          "🇵🇭 ₱ " + TokenDataUnique?.php?.toFixed(2) + "\n" +
          "💶 € " + TokenDataUnique?.eur?.toFixed(2) + "\n" + 
          ":flag_gb: £ " + TokenDataUnique?.gbp?.toFixed(2) + "\n" + 
          ":coin: ₿ " + TokenDataUnique?.btc?.toFixed(2) + "\n\n" +
          calculatorConversion +
          `${!calculator.length ? `**To calculate price, try:**\n!${instanceReference.name.toLowerCase()} 25` : "" }`
        )
        .setColor("#00ff00")
        .setFooter("https://cryptoalarm.xyz  _______ _______ _________ ________ _________ ________ _________")
        .setTimestamp()
      ]
    })
  )
 
} 
