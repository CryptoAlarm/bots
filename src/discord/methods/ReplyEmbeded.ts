import { Message, MessageEmbedOptions } from "discord.js-light";


export const ReplyEmbeded = (message: Message, MyMessageEmbedOptions: MessageEmbedOptions): Promise<Message> => {
 
  let DefaultEmbedOption = {
    author: {
      name: "Click here to add our bots to your server",
      iconURL: "https://cryptoalarm.xyz/logo.png",
      url: "https://cryptoalarm.xyz"
    },
    timestamp: new Date(),
    color: "#00ff00",
    footer: {
      text: "https://cryptoalarm.xyz  _______ _______ _________ ________ _________ ________ _________",
      iconURL: "https://cryptoalarm.xyz/logo.png",
    }

  } as Partial<MessageEmbedOptions>


  return Promise.resolve<Message>(
    message.reply({
      embeds: [
        {
          ...DefaultEmbedOption,
          ...MyMessageEmbedOptions
        }
      ],
    })
  );
};
