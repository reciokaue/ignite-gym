import { createContext, ReactNode, useContext, useState } from 'react'
import { UserDTO } from 'src/DTOs/user'

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextData {
  user: UserDTO
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserDTO>({id: '1', name: 'Kaue', email: 'kaue@gmail.com', 'kaue.png'})

  return <AuthContext.Provider value={{
    user

  }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
