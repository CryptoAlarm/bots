import { Message, MessageEmbed } from "discord.js-light"
import { IBots } from "../../types/bots"
import { TokenDataUnique } from "../../types/token"

interface Props {
    message: Message
    TokenDataUnique: TokenDataUnique
    instanceReference: IBots
}
export const Prices = ({ message, TokenDataUnique, instanceReference }: Props) => {
    const splited = message.content.split(" ")

    if (splited[1]) {
        let value: number

        try {
            value = parseFloat(splited[1].replace(",", "."))
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
                prices[key] = (value * (TokenDataUnique?.[key] || 0))
            })

        Object.keys(TokenDataUnique)
            .map(key => {
                pricesOut[key] = (value / (TokenDataUnique?.[key] || 0))
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

        const currencyMap = [
            {
                currency: "usd",
                emoji: "🇺🇲",
                prefix: "$"
            },
            {
                currency: "brl",
                emoji: "🇧🇷",
                prefix: "R"
            },

            {
                currency: "php",
                emoji: "🇵🇭",
                prefix: "₱"
            },/*
            {
                currency: "eur",
                emoji: "💶",
                prefix: "€"
            },
            {
                currency: "gbp",
                emoji: ":flag_gb:",
                prefix: "£"
            },
            {
                currency: "btc",
                emoji: ":coin:",
                prefix: "₿"
            }*/
        ]


        let embedMessageIn = currencyMap.map(value => {
            return `${value.emoji} ${value.prefix} ${fix(pricesOut?.[value.currency] || 0)}`
        }).join("\n")

        let embedMessageOut = currencyMap.map(value => {
            return `${value.emoji} ${value.prefix} ${fix(prices?.[value.currency] || 0)}`
        }).join("\n")


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
                        .setDescription(`
                            **1 x ${instanceReference.name.toUpperCase()}**
                            ${embedMessageIn}\n
                            **${value} x ${instanceReference.name.toUpperCase()}**
                            ${embedMessageOut}\n
                        `)
                        .setColor("#00ff00")
                        .setFooter("https://cryptoalarm.xyz  _______ _______ _________ ________ _________ ________ _________")
                        .setTimestamp()
                ]
            })
        )

    }
}
