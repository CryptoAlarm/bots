import { Message, MessageEmbedOptions } from "discord.js-light";


export const ReplyEmbeded = (message: Message, MyMessageEmbedOptions: MessageEmbedOptions): Promise<Message> => {
 
  let DefaultEmbedOptions = {
    author: {
      name: "Click here to add our bots to your server",
      iconURL: "https://codehall.cryptoalarm.com.br/logo.png",
      url: "https://codehall.cryptoalarm.com.br"
    },
    timestamp: new Date(),
    color: "#00ff00",
    footer: {
      text: "Powered by https://codehall.cryptoalarm.com.br. Access and add our bots for free!",
      iconURL: "https://codehall.cryptoalarm.com.br/logo.png",
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
