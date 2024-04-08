/* eslint-disable no-useless-catch */
import { api } from '@services/api'
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

  async function logout() {
    setIsLoadingUserStorage(true)

    setUser({} as UserDTO)
    await storageUserRemove()

    setIsLoadingUserStorage(false)
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
        isLoadingUserStorage,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
