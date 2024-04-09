import AsyncStorage from '@react-native-async-storage/async-storage'

export const TOKEN_STORAGE = '@ignitegym:token'

export async function storageTokenSave(token: string) {
  await AsyncStorage.setItem(TOKEN_STORAGE, JSON.stringify(token))
}
export async function storageTokenGet() {
  const token = await AsyncStorage.getItem(TOKEN_STORAGE)
  return token
}
export async function storageTokenRemove() {
  await AsyncStorage.removeItem(TOKEN_STORAGE)
}
