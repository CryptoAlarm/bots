import { IBots } from "../../types/bots";
import { TokenDataUnique } from "../../types/token";

interface setActivityProps {
  instanceReference: IBots;
  tokenPrice: TokenDataUnique;
  tokenPriceHistory: TokenDataUnique;
  turnIntoSubcurrencyAndPercent: boolean;
}

const fix = (n: number, h?: number): string => n.toFixed(h || 2);

const mapCurrencyToPrefix = {
  brl: "R$",
  php: "₱",
  eur: "€",
  gbp: "£",
  thb: "฿",
  usd: "$",
};

const buildDescriptionPrice = (
  main: number,
  sub: number,
  mainPrefix: string,
  subPrefix: string
): string => {

  let subCurrencyDescription = ""

  if (mainPrefix !== subPrefix) {
    subCurrencyDescription = `│${subPrefix} ${fix(sub || 0)}`
  }

  if (typeof main === "number" && main <= 0.001) {
    return `${mainPrefix}${fix(main, 8)}`;
  }
  if (typeof main === "number" && main <= 1) {
    return `${mainPrefix}${fix(main, 4)}` + subCurrencyDescription;
  }

  return `${mainPrefix}${fix(main || 0)}` + subCurrencyDescription;
};
const buildDescriptionPercent = (main: number, percent: number, mainPrefix: string): string => {
  let symbol = percent < 0 ? "⬊" : "⬈";

  if (typeof main === "number" && main <= 0.001) {
    return `${mainPrefix}${fix(main, 8)} ${symbol} ${percent.toFixed(2)}%`;
  }
  if (typeof main === "number" && main <= 1) {
    return `${mainPrefix}${fix(main, 4)} ${symbol} ${percent.toFixed(2)}%`;
  }

  return `${mainPrefix}${fix(main || 0)} ${symbol} ${percent.toFixed(2)}%`;
};

const percentActivity = (
  todayPrice: number,
  yesterdayPrice: number,
  currency: string,
  mainCurrencyPrefix: string
) => {


  if (!todayPrice || !yesterdayPrice) return "";

  return buildDescriptionPercent(
    todayPrice || 0,
    (todayPrice / yesterdayPrice - 1) * 100,
    mainCurrencyPrefix
  );
};

export const setActivity = (setActivityProps: setActivityProps) => {
  try {
    const {
      instanceReference,
      tokenPrice,
      tokenPriceHistory,
      turnIntoSubcurrencyAndPercent

    } = setActivityProps;

    const mainCurrency = instanceReference.currency;
    const mainCurrencyPrefix = mapCurrencyToPrefix?.[mainCurrency];

    const subCurrency = instanceReference.subCurrency;
    const subCurrencyPrefix = mapCurrencyToPrefix?.[subCurrency];

    let name = "";

    if (subCurrency === mainCurrency) {
      name = percentActivity(
        tokenPrice?.[mainCurrency], 
        tokenPriceHistory[mainCurrency], 
        mainCurrency, 
        mainCurrencyPrefix
      );
    }
    else if (turnIntoSubcurrencyAndPercent) {
      name = buildDescriptionPrice(
        tokenPrice?.[mainCurrency],
        tokenPrice?.[subCurrency],
        mainCurrencyPrefix,
        subCurrencyPrefix
      );
    } else {
      name = percentActivity(
        tokenPrice?.[mainCurrency], 
        tokenPriceHistory[mainCurrency], 
        mainCurrency, 
        mainCurrencyPrefix
      );
    }

    if (!name) {
      name = buildDescriptionPrice(
        tokenPrice?.[mainCurrency],
        tokenPrice?.[subCurrency],
        mainCurrencyPrefix,
        subCurrencyPrefix
      );

      if (!name) return false
    }
    instanceReference.client.user?.setActivity({
      type: "PLAYING",
      name: name,
    });

  } catch (error) {}
};
