import { Loading } from '@components/Loading'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import { ReactNode } from 'react'
import { THEME } from 'src/theme'

import { AuthProvider } from './Auth'

interface ProviderProps {
  loading?: boolean
  children: ReactNode
}
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})

export function Provider({ loading, children }: ProviderProps) {
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{loading ? children : <Loading />}</AuthProvider>
      </QueryClientProvider>
    </NativeBaseProvider>
  )
}
