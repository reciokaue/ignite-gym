/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-catch */
import { api } from '@services/api'
import {
  storageTokenGet,
  storageTokenRemove,
  storageTokenSave,
} from '@storage/storageToken'
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from '@storage/storageUser'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { UserDTO } from 'src/DTOs/user'

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextData {
  user: UserDTO
  isLoadingUserStorage: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  updateUser: (newUser: UserDTO) => Promise<void>
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorage, setIsLoadingUserStorage] = useState(true)

  async function login(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })
      saveAuth(data.user, data.token, data.refresh_token, true)
    } catch (error) {
      throw error
    }
  }

  async function saveAuth(
    user?: UserDTO,
    token?: string,
    refresh_token?: string,
    storage?: boolean,
  ) {
    if (user && token) {
      if (storage && refresh_token) {
        await storageUserSave(user)
        await storageTokenSave({ token, refresh_token })
      }

      api.defaults.headers.common.Authorization = `Bearer ${token}`
      setUser(user)
    }
  }

  async function logout() {
    setIsLoadingUserStorage(true)

    setUser({} as UserDTO)
    await storageUserRemove()
    await storageTokenRemove()

    setIsLoadingUserStorage(false)
  }

  async function updateUser(newUser: UserDTO) {
    setUser(newUser)
    storageUserSave(newUser)
  }

  async function loadUserData() {
    const userLogged = await storageUserGet()
    const { token, refresh_token } = await storageTokenGet()

    saveAuth(userLogged, token || '', refresh_token || '')
    setIsLoadingUserStorage(false)
  }

  useEffect(() => {
    loadUserData()

    const subscribe = api.registerInterceptTokenManager(logout)

    return () => {
      subscribe()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingUserStorage,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
