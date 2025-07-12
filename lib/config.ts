if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

const config = {
  env: {
    databaseURL: process.env.DATABASE_URL!,
    prodApiEndpoint: process.env.PROD_API_ENDPOINT!,
  },
};

export default config;
