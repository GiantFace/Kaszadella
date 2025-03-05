if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

const config = {
  env: {
    databaseURL: process.env.DATABASE_URL,
    upstash: {
      redisUrl: process.env.UPSTASH_REDIS_URL!,
      redisToken: process.env.UPSTASH_REDIS_TOKEN!,
    },
  },
};

export default config;
