import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserDTO } from 'src/DTOs/user'

export const USER_STORAGE = '@gymignite:user'

export async function storageUserSave(user: UserDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
}
