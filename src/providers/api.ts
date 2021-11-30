import axios from "axios"
import {endpoint} from "../config/server" 
import "dotenv/config"

export default axios.create({
  baseURL: endpoint,
  headers: {
    authorization: `Bearer ${process.env.AUTHORIZATION}`
  }
})