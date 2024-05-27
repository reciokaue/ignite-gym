import AsyncStorage from '@react-native-async-storage/async-storage'

export const TOKEN_STORAGE = '@ignitegym:token'

interface StorageAuthTokenProps {
  token: string
  refresh_token: string
}

export async function storageTokenSave({
  token,
  refresh_token,
}: StorageAuthTokenProps) {
  await AsyncStorage.setItem(
    TOKEN_STORAGE,
    JSON.stringify({ token, refresh_token }),
  )
}
export async function storageTokenGet(): Promise<StorageAuthTokenProps> {
  const response = await AsyncStorage.getItem(TOKEN_STORAGE)
  const tokens: StorageAuthTokenProps = response ? JSON.parse(response) : {}

  return tokens
}
export async function storageTokenRemove() {
  await AsyncStorage.removeItem(TOKEN_STORAGE)
}
