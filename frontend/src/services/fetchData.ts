import { fetchProps } from "@/types"

export function fetchData({ endpoint, method, token, body, responseType }: fetchProps) {
  return fetch(`http://localhost:3000/${endpoint}`, {
    method,
    headers: token ? {
      'Content-type': 'application/json; charset=UTF-8',
      authorization:
        `Bearer ${token}`,
    } : {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: body ? JSON.stringify(body) : undefined
  })
    .then(res => {
      if (responseType === 'blob') {
        if (res.status === 404) return
        return res.blob(); // return blob if responseType is 'blob'
      } else {
        return res.json(); // otherwise return parsed JSON data
      }
    })
    .then(data => { return data })

}