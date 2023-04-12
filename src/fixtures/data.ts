const localPort: string | undefined = process.env.REACT_APP_LOCAL_PORT;
const deployPort = "http://tanpantz.com:8000";
export const PORT = localPort ? localPort : deployPort;
export const DOMAIN = PORT == localPort ? "localhost" : "tanpantz.com";
let ACCESS_TOKEN = "";
let REFRESH_TOKEN = "";
let USER_NAME = "";

export function setAccessToken(accessToken: string) {
  ACCESS_TOKEN = accessToken;
}

export function getAccessToken() {
  return ACCESS_TOKEN;
}

export function setRefreshToken(refreshToken: string) {
  REFRESH_TOKEN = refreshToken;
}

export function getRefreshToken() {
  return REFRESH_TOKEN;
}

export function setUsername(username: string) {
  USER_NAME = username;
}

export function getUsername() {
  return USER_NAME;
}
