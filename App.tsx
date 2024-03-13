import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

export default function App() {
  const [fontsloaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <View>
      {fontsloaded && <Text>Hello world</Text>}
      <StatusBar style="auto" />
    </View>
  )
}
