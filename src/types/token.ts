
export const ListCurrencies = {
  brl: 0,
  usd: 0,
  php: 0,
  eur: 0,
  gbp: 0,
  thb: 0,
  idr: 0,
  mad: 0
}

export type Currencies = keyof typeof ListCurrencies
export interface TokenData {
  [key: string]: {
    [key in Currencies]: number
  }
}
export type TokenDataUnique = {
  [key in Currencies]?: number
}

export const ListCurrenciesArray = Object.keys(ListCurrencies) as Currencies[]

export type Providers =
  | "apeswap"
  | "mir4"
  | "factorychain"
  | "pancakeswap"
  | "coingecko";
export interface Tokens {
  ref: string;
  contract: string;
  api: Providers;
}

export type TokensReduced = {
  [key in Providers]: Partial<Tokens>[];
};

export const currenciesMap = [
  {
    currency: "usd",
    emoji: "πΊπ²",
    prefix: "$",
  },
  {
    currency: "brl",
    emoji: "π§π·",
    prefix: "R",
  },
  {
    currency: "php",
    emoji: "π΅π­",
    prefix: "β±",
  },
  {
    currency: "eur",
    emoji: ":flag_eu:",
    prefix: "β¬"
  },
  {
    currency: "gbp",
    emoji: ":flag_gb:",
    prefix: "Β£"
  },
  {
    currency: "thb",
    emoji: ":flag_th:",
    prefix: "ΰΈΏ"
  },
  {
    currency: "mad",
    emoji: ":flag_ma:",
    prefix: "D"
  },
  {
    currency: "idr",
    emoji: ":flag_id:",
    prefix: "R"
  },
]