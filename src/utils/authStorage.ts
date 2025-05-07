import {MMKV} from 'react-native-mmkv';

const authStorage = new MMKV();

const JWT_TOKEN = 'jwt_token';

export async function saveToken(token: string) {
  authStorage.set(JWT_TOKEN, token);
}

export async function getToken() {
  return authStorage.getString(JWT_TOKEN);
}

export async function removeToken() {
  authStorage.delete(JWT_TOKEN);
}
