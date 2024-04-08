import { Loading } from '@components/Loading'
import { useAuth } from '@contexts/Auth'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { Box, useTheme } from 'native-base'

import { AppRoutes } from './app'
import { AuthRoutes } from './auth'

export function Routes() {
  const { colors } = useTheme()
  const { user, isLoadingUserStorage } = useAuth()

  const theme = DefaultTheme
  theme.colors.background = colors.gray[700]
  theme.colors.text = colors.gray[100]

  if (isLoadingUserStorage) return <Loading />

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}
