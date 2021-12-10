import axios from "axios"
import "dotenv/config"

export default axios.create({
  baseURL: process.env.ENDPOINT_API,
  headers: {
    authorization: `Bearer ${process.env.AUTHORIZATION}`
  }
})