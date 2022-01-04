
export const ListCurrencies = {
  brl: 0,
  usd: 0,
  php: 0,
  eur: 0,
  gbp: 0,
  thb: 0,
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
    emoji: "🇺🇲",
    prefix: "$",
  },
  {
    currency: "brl",
    emoji: "🇧🇷",
    prefix: "R",
  },
  {
    currency: "php",
    emoji: "🇵🇭",
    prefix: "₱",
  },
  {
    currency: "eur",
    emoji: ":flag_eu:",
    prefix: "€"
  },
  {
    currency: "gbp",
    emoji: ":flag_gb:",
    prefix: "£"
  },
  {
    currency: "thb",
    emoji: ":flag_th:",
    prefix: "฿"
  },
  {
    currency: "mad",
    emoji: ":flag_ma:",
    prefix: "D"
  },
]