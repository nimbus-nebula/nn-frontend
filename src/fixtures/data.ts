const localPort : string | undefined  = process.env.REACT_APP_LOCAL_PORT;
const deployPort = "http://tanpantz.com:8000"
export const PORT = localPort ? localPort : deployPort;
let USER_TOKEN = "";
let USER_NAME = "";

export function setUserToken(token: string) {
    USER_TOKEN = token;
}

export function getUserToken() {
    return USER_TOKEN;
}

export function setUsername(username: string) {
    USER_NAME = username;
}

export function getUsername() {
    return USER_NAME;
}