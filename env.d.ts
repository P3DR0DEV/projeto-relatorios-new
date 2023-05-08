declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string | number
      PATH_KEY_SSH: string
      PATH_CERT_SSH: string
      SECRET: string
      DOMAIN: string
      APP_HOST: string
      NOREPLY_USER_EMAIL: string
      NOREPLY_USER_PASS: string
      DATABASE_URL: string
    }
  }
}
