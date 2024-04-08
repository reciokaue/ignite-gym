/* eslint-disable no-useless-catch */
import { api } from '@services/api'
import { storageUserGet, storageUserSave } from '@storage/storageUser'
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
  login: (email: string, password: string) => Promise<void>
  isLoadingUserStorage: boolean
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorage, setIsLoadingUserStorage] = useState(true)

  async function login(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })

      if (data.user) {
        setUser(data.user)
        storageUserSave(data.user)
      }
    } catch (error) {
      throw error
    }
  }

  async function loadUserData() {
    const userLogged = await storageUserGet()
    if (userLogged) setUser(userLogged)
    setIsLoadingUserStorage(false)
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        isLoadingUserStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
