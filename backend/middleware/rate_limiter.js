import { ratelimit } from "../config/upstash.js";

export default async function rateLimiter(req, res, next) {
  try {
    const { success } = await ratelimit.limit("api");
    if(!success) return res.status(429).json({message: "Too many requests, pls try again later"});
    next();
  } catch (error) {
    console.log("Rate limit error", error);
    next(error)
  }
}
