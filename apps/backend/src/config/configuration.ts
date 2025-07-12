// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  database: {
    url: process.env.DATABASE_URL,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5750,
    db: process.env.POSTGRES_DB,
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    authschClientId: process.env.AUTH_CLIENT_ID,
    authschClientSecret: process.env.AUTH_CLIENT_SECRET,
  },
});
