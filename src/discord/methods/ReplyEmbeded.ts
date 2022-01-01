import { Message, MessageEmbedOptions } from "discord.js-light";


export const ReplyEmbeded = (message: Message, MyMessageEmbedOptions: MessageEmbedOptions): Promise<Message> => {
 
  let DefaultEmbedOptions = {
    author: {
      name: "Click here to add our bots to your server",
      iconURL: "https://cryptoalarm.xyz/logo.png",
      url: "https://cryptoalarm.xyz"
    },
    timestamp: new Date(),
    color: "#00ff00",
    footer: {
      text: "Powered by https://cryptoalarm.xyz. Access and add our bots for free!",
      iconURL: "https://cryptoalarm.xyz/logo.png",
    }

  } as Partial<MessageEmbedOptions>


  return Promise.resolve<Message>(
    message.reply({
      embeds: [
        {
          ...DefaultEmbedOptions,
          ...MyMessageEmbedOptions
        }
      ],
    })
  );
};
