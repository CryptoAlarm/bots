import axios from "axios";
import { Lands } from "../types/wanaka";
import API from "./api";

export const getWanakaLands = async (where: object): Promise<Lands[]> => {
  try {
    const {data} = await API.post<Lands[]>("/filterLands", where)
    return data

  } catch (error) {
    return []
  }

}