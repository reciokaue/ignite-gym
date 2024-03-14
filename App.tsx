import { Loading } from '@components/Loading'
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { Register } from '@screens/Register'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import { THEME } from 'src/theme'

export default function App() {
  const [fontsloaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      {fontsloaded ? <Register /> : <Loading />}
    </NativeBaseProvider>
  )
}
