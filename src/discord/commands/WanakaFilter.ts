import { Message } from "discord.js-light";
import { ReplyEmbeded } from "../methods/ReplyEmbeded";
import {getPricesListHistory} from "../../providers/"
import {
  ApiResponse,
  BigNumberParse,
  TransactionsEntities,
  EndpointAPI,
  EndpointLand,
  LandApiResponse,
  Seasons,
  RarityImages,
  EndpointAPI2,
  NFTEntitiesV2,
  TransactionsResponse,
  RarityStars,
  LandsFilter,
  Lands,
  Rarity,
} from "../../types/wanaka";
import { getWanakaLands } from "../../providers/getWanakaLands";
import axios from "axios";

const buildParams = (params: string[]) => {
  const s = params.join(" ").toLowerCase();

  let Rare = selectRarity(s);
  let Seasons = selectSeason(s);

  return {
    ...Rare,
    ...Seasons,
  };
};

const selectSeason = (s: string): Partial<LandsFilter> => {
  let __return: Partial<LandsFilter> = {};

  if (s.includes("pack") || s.includes("ispack") || s.includes("packed")) {
    return {
      Spring: null,
      Summer: null,
      Autumn: null,
      Winter: null,
    };
  }

  if (s.includes("spring")) {
    __return["Spring"] = true;
  }
  if (s.includes("summer")) {
    __return["Summer"] = true;
  }
  if (s.includes("winter")) {
    __return["Winter"] = true;
  }

  if (s.includes("autumn") || s.includes("autunm")) {
    __return["Autumn"] = true;
  }

  return __return;
};
const selectRarity = (s: string): { Rare: Rarity } | {} => {
  if (s.includes("immortal") || s.includes("imortal") || s.includes("inmortal"))
    return { Rare: "Immortal" };

  if (
    s.includes("uncommon") ||
    s.includes("uncomon") ||
    s.includes("incomum") ||
    s.includes("incommun")
  )
    return { Rare: "Uncommon" };

  if (
    s.includes("common") ||
    s.includes("comon") ||
    s.includes("comum") ||
    s.includes("commun")
  )
    return { Rare: "Common" };

  if (s.includes("legendary") || s.includes("legendario"))
    return { Rare: "Legendary" };

  if (
    s.includes("mythical") ||
    s.includes("mithical") ||
    s.includes("mitico") ||
    s.includes("mythic")
  )
    return { Rare: "Mythical" };

  if (s.includes("rare") || s.includes("raro")) return { Rare: "Rare" };

  if (s.includes("pack") || s.includes("ispack") || s.includes("packed"))
    return { Rare: null };

  return {};
};

const FetchFilter = async (content: string): Promise<Lands[]> => {
  const params = content.split(" ").slice(1);
  let query;

  const s = params.join(" ").toLowerCase();

  if (
    s.includes("4") ||
    s.includes("4s") ||
    s.includes("4 seasons") ||
    s.includes("4season")
  ) {
    query = {
      ...selectRarity(s),
      Spring: true,
      Summer: true,
      Autumn: true,
      Winter: true,
    };
  } else if (
    s.includes("3") ||
    s.includes("3s") ||
    s.includes("3 seasons") ||
    s.includes("3season")
  ) {
    query = {
      ...selectRarity(s),
      OR: [
        {
          Spring: true,
          Summer: true,
          Autumn: true,
        },
        {
          Spring: true,
          Summer: true,
          Winter: true,
        },
        {
          Spring: true,
          Autumn: true,
          Winter: true,
        },
        {
          Summer: true,
          Autumn: true,
          Winter: true,
        },
      ],
    };
  } else if (
    s.includes("2") ||
    s.includes("2s") ||
    s.includes("2 seasons") ||
    s.includes("2season")
  ) {
    query = {
      ...selectRarity(s),
      OR: [
        {
          Spring: true,
          Summer: true,
        },
        {
          Spring: true,
          Autumn: true,
        },
        {
          Spring: true,
          Winter: true,
        },
        {
          Summer: true,
          Autumn: true,
        },
        {
          Summer: true,
          Winter: true,
        },
        {
          Autumn: true,
          Winter: true,
        },
      ],
    };
  } else {
    query = buildParams(params);
  }

  let take = 4

  if (s.includes("plus"))
    take = 20


  let where = {
    where: {
      ...query,
      NOT: {
        activeOrder_price: null
      }
    },
    take   
  }
  return getWanakaLands(where)

};
export const help = (message: Message) => {
  ReplyEmbeded(message, {
    description:
      "!land <landID>\n" +
      "!land 5780\n\n\n" +
      "!filter Rarity Season[] Options\n\n" +
      "E.g.\n" +
      "!filter packed\n\n" +
      "!filter mythic 4s\n" +
      "!filter 3s plus\n" +
      "!filter uncommon summer spring\n" +
      "!filter spring rare winter\n" +
      "!filter uncommon winter spring summer \n" +
      "!filter immortal summer spring autumn winter\n" +
      "!filter mythic",
  });
};

export const byLand = async (message: Message) => {

  let landID = null;

  if (! message.content.toUpperCase().startsWith("!LAND")) {  
    let temp = message.content.toString().split(" ")
    let index = 0;
    for (let i = 0; i < temp.length;i++) {
      if (temp[i].includes("https://marketplace.wanakafarm.com/#/lands")) {
        index = i
      }          
    }
    const _content = temp[index].split("/")
    landID = parseInt(_content[_content.length-1])
  }
  if (!landID) {  
    landID = parseInt(message.content.split(" ")[1]);
  }

  if (landID < 1 || landID > 15000) {
    return 
  }
  
  const responseLand = await axios.get(`${EndpointLand}/${landID}`);
  const Land: LandApiResponse = responseLand.data;

  const responseNFT = await axios.post(EndpointAPI2, NFTEntitiesV2(landID));
  const data: ApiResponse = responseNFT.data.data.nftentities[0];

  const responseTransactions = await axios.post(EndpointAPI, TransactionsEntities(landID));
  const transactions: TransactionsResponse[] = responseTransactions.data.data.transactionEntities


  if (!Land || !data || !transactions) {
    return
  }

  const price = BigNumberParse(data?.activeOrder?.price || 0);

  let type = Land.name.split(" ")[1].toLowerCase();
  let stars = ""

  if (! RarityImages.hasOwnProperty(type)) {  
    type = "boxed"   
  }
  if (RarityStars.hasOwnProperty(type)) {  
    stars = RarityStars[type]
  
  }

  let Fields = Land.attributes.map((attributes) => {

    function buildFields(name: string, value: string) {
      return { name, value, inline: true }
    }

    if (attributes.trait_type === "Season") {
      const __seasons = attributes.value.toString().split(",")

      return buildFields(
        "Seasons",
        __seasons.map((type) => Seasons[type]).join(" ")
      )
    }

    if (attributes.trait_type === "IncreaseMutantRate") {
      return buildFields("Mutant Rate", attributes.value.toString() + "%")
    }

    if (attributes.trait_type === "Rare") {
      return buildFields("Rarity", "**" + attributes.value + "**")
    }

    return buildFields(
      attributes.trait_type,
      attributes.value.toString()
    )

  })

  transactions.map((t, i) => {

    if (i % 2 !== 0) { return  }
    if (i >= 6) { return  }
    if (BigNumberParse(t.price) <= 5) { return  } 

    let _i1 = ((i + 1) < transactions.length ) ?
      ":coin: " +BigNumberParse(transactions[i+1].price).toString() + " (History transactions)" : "."

    Fields.push({
      name: ":coin: " +BigNumberParse(transactions[i].price).toString() + " (History transactions)",
      value: _i1,
      inline: false
    })
  })

  Fields.push({
    name: "https://wanakafarmtools.com",
    "value": "Visit the best tools for Wanaka farm", 
    "inline": false
  })
  

  ReplyEmbeded(message, {
    author: {
      name: "Click here to access wanakafarm tools",
      url: "https://wanakafarmtools.com",
      icon_url: "https://cryptoalarm.xyz/logo.png"
    },
    title: `${Land.name} ${stars}`,
    fields: Fields,
    description: `
      **Price**: ${(price < 5 ? "NOT FOR SALE" : ":coin: " + price.toFixed(2))}
      **ID**: #${Land.itemId}
      **Owner**: ${data?.owner?.address}
    `,
    url: `https://marketplace.wanakafarm.com/#/lands/${landID}`,
    thumbnail: {
      url: `${RarityImages?.[type]}`
    }

  })
  
}
export const filter = async (message: Message) => {

  message.react("⏰").catch(() => {})

  const Lands = await FetchFilter(message.content)

  const Fields = Lands.map(land => {
    let seasons = ""

    let landId = land?.itemId
    let rare = land?.["Rare"]
    let price = land?.["activeOrder_price"]
    let level = land?.["Level"]

    if (land?.["Spring"]) 
      seasons += Seasons["Spring"] + " "
    if (land?.["Summer"]) 
      seasons += Seasons["Summer"] + " "
    if (land?.["Autumn"]) 
      seasons += Seasons["Autumn"] + " "
    if (land?.["Winter"]) 
      seasons += Seasons["Winter"] + " "

    if (rare == null || rare == "null") {
      seasons = "Packed box"
      rare = ""
    }

    let stars = ""

    try {
      if (RarityStars.hasOwnProperty(rare?.toLowerCase() || "")) {  
        stars = RarityStars?.[rare?.toString().toLocaleLowerCase() || ""]
      
      }
    } catch (error) {
      
    }
 

    const cc = (s: string) => {
      
      for (let i = 8 - s.length; i > 0 ; i--) {
        s+= " "
      }
      return s + "│"
    }
    const b = (s: string) => {
      
      for (let i = 10 - s.length; i > 0 ; i--) {
        s+= " "
      }
      return s + "│"
    }
    function fx (p: number | string) {

      if (typeof p == "string")
        return p
      return p < 10 ? "0" + p : p.toString()
    }

    const wanaInDolar = getPricesListHistory("wanaka-farm").tokenPrice?.usd || 0

    return {
      name: `:coin: ${cc(price?.toFixed(0) || "")}Lvl ${fx(level || "?")}│${b(" " +` $${((price || 0)*(wanaInDolar || 0)).toFixed(0)}`)}${b("" +seasons)}${rare} ${stars}`,
      value: `https://marketplace.wanakafarm.com/#/lands/${landId}` ,
      inline: false 
    }
  })


  Fields.push({
    name: "**!filter help** | for more options...",
    value: "All requests are cached and may ** take a few hours ** to update new offers",
    inline: false
  })
  Fields.push({
    name: "https://wanakafarmtools.com",
    value: "Access the best wanaka farm tools!",
    inline: false
  })

  return ReplyEmbeded(message, {
    description: `
      https://wanakafarmtools.com
      Access the best tools for Wanaka
    `,
    author: {
      name: "Click here to access wanakafarm tools",
      url: "https://wanakafarmtools.com",
      icon_url: "https://cryptoalarm.xyz/logo.png"
    },
    fields: Fields
  })  
}