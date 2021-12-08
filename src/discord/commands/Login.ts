import Client from "../Client"

export const Login =  async (client: Client, discordApiKey: string) => {
  return await Promise.resolve(client.login(discordApiKey))  
}