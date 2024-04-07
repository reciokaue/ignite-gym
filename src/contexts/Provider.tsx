import { Loading } from '@components/Loading'
import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import { ReactNode } from 'react'
import { THEME } from 'src/theme'

interface ProviderProps {
  loading?: boolean
  children: ReactNode
}

export function Provider({ loading, children }: ProviderProps) {
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      {loading ? children : <Loading />}
    </NativeBaseProvider>
  )
}
