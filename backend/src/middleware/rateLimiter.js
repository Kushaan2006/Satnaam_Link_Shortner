import redis from "../config/redis.js";

export const loginLimiter = async (req, res, next) => {
  try {
    const ip = req.ip;
    const key = `rateLimit:login:${ip}`;
    const count = await redis.incr(key);

    if (count == 1) {
      await redis.expire(key, 10 * 60);
    }

    if (count > 5) {
      console.log(`Login Limiter: ${ip}'s Limit Exceeded`);
      const ttl = await redis.ttl(key);
      const minsLeft = ttl < 60 ? "< 1" : Math.ceil(ttl / 60);
      return res.status(429).json({
        message: `Too many login attempts. Please try again in ${minsLeft} mins`,
      });
    }
    next();
  } catch (error) {
    console.error(`Login Limiter Failure: ${error.message}`);
    next(); //we'll allow in case redis doesnt work well, its not too strict
  }
};

export const signUpLimiter = async (req, res, next) => {
  try {
    const ip = req.ip;
    const key = `rateLimit:signup:${ip}`;
    const count = await redis.incr(key);

    if (count === 1) {
      await redis.expire(key, 60 * 60);
    }

    if (count > 5) {
      console.log(`Signup Limiter: ${ip}'s limit exceeded`);
      const ttl = await redis.ttl(key);
      const minsLeft = ttl < 60 ? "< 1" : Math.ceil(ttl / 60);
      return res.status(429).json({
        message: `Too many signup attempts. Please try again in ${minsLeft} mins`,
      });
    }
    next();
  } catch (error) {
    console.error(`Signup Limiter failure: ${error.message}`);
    next();
  }
};

export const refreshLimiter = async (req, res, next) => {
  try {
    const ip = req.ip;
    const key = `rateLimit:refresh:${ip}`;
    const count = await redis.incr(key);

    if (count === 1) {
      await redis.expire(key, 60);
    }

    if (count > 5) {
      console.log(`Refresh Limiter: ${ip}'s limit exceeded`);
      const ttl = await redis.ttl(key);
      return res.status(429).json({
        message: `Too many refresh attempts. Please try again in ${ttl} sec`,
      });
    }
    next();
  } catch (error) {
    console.error(`Refresh Limiter failure: ${error.message}`);
    next();
  }
};

export const createUrlLimiter = async (req, res, next) => {
  try {
    const id = req.user.id;
    const key = `rateLimit:createUrl:${id}`;
    const count = await redis.incr(key);

    if (count === 1) {
      await redis.expire(key, 30);
    }

    if (count > 5) {
      console.log(`CreateUrl Limiter: ${id}'s limit exceeded`);
      const ttl = await redis.ttl(key);
      return res.status(429).json({
        message: `Too many CreateUrl attempts. Please try again in ${ttl} sec`,
      });
    }
    next();
  } catch (error) {
    console.error(`CreateUrl Limiter failure: ${error.message}`);
    next();
  }
};
