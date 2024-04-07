import { Provider } from '@contexts/Provider'
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { Routes } from '@routes/index'
import { useFonts } from 'expo-font'

export default function App() {
  const [fontsloaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <Provider loading={fontsloaded}>
      <Routes />
    </Provider>
  )
}
