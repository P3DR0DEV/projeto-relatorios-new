export interface fetchProps {
  endpoint: string
  method: "POST" | "GET" | "PUT" | "DELETE"
  token?: string
  body?: string | Record<string, any> | null //eslint-disable-line
  responseType?: "json" | "blob"
}
