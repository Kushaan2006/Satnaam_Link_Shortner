import "dotenv/config";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

// await redis.set("foo", "bar");
// const val = await redis.get("foo");
// console.log(val);

export default redis;
