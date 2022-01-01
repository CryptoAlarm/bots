import { Message } from "discord.js-light";
import { IBots } from "../../types/bots";
import { currenciesMap, TokenDataUnique } from "../../types/token";
import { ReplyEmbeded } from "../methods/ReplyEmbeded";

interface Props {
  message: Message;
  TokenDataUnique: TokenDataUnique;
  instanceReference: IBots;
}

const MAX_NUMBER = 9999999999999;

const fix = (n: number) => {
  if (n > 10) return n.toFixed(2);
  else if (n > 1) return n.toFixed(4);
  else if (n > 0.1) return n.toFixed(6);
  else return n.toFixed(8);
};

const execute = (
  message: Message,
  name: string,
  value: number,
  embedMessage: string,
  embedMessageLeft?: string,
  embedMessageRight?: string
) => {

  return ReplyEmbeded(message, {
    description: `
			${embedMessageRight?.length ? `
				**${value} x ${name}**
				${embedMessageRight}\n` : ""}			
			**1x ${name}**
      ${embedMessage}
			${embedMessageLeft?.length ? `
				**Worth of calculator**
				${embedMessageLeft}\n` : ""}  
			
			${! embedMessageLeft?.length ? "**Try:**\n!" + name.toLowerCase() + " 25" : ""}
    `,
  });
};

export const Prices = ({
  message,
  TokenDataUnique,
  instanceReference,
}: Props) => {
  const params = message.content.split(" ")?.[1];

  let value: number;

  const prices = {};
  const pricesRight = {};
  const pricesLeft = {};

  try {
    if (!params) {
      throw new Error("Calculate only normal value");
    }

    value = parseFloat(params.replace(",", "."));

    if (value > MAX_NUMBER) {
      throw new Error("Cannot calculate number above " + MAX_NUMBER);
    }
  } 
  catch (e) {
    value = 1;
  }

  Object.keys(TokenDataUnique).map((key) => {
    prices[key] = 1 * (TokenDataUnique?.[key] || 0);
    pricesRight[key] = value * (TokenDataUnique?.[key] || 0);
    pricesLeft[key] = value / (TokenDataUnique?.[key] || 0);
  });

  let embedMessage = currenciesMap
    .map((token) => {
      return `${token.emoji} ${token.prefix} ${fix(
        prices?.[token.currency] || 0
      )}`;
    })
    .join("\n");

  if (value === 1) {
    return execute(message, instanceReference.name, value, embedMessage);
  }

  return execute(
    message,
    instanceReference.name,
    value,
    embedMessage,
    currenciesMap
			.map((token) => {
				return `${token.emoji} ${token.prefix} ${value} is worth of ${fix(
					pricesLeft?.[token.currency] || 0
				)} ${instanceReference.name}`;
			})
			.join("\n"),
    currenciesMap
			.map((token) => {
				return `${token.emoji} ${token.prefix} ${fix(
					pricesRight?.[token.currency] || 0
				)}`;
			})
			.join("\n")
  );
};
