import { ScreenHeader } from '@components/ScreenHeader'
import { Avatar, Center, ScrollView, VStack } from 'native-base'

export function Profile() {
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView>
        <Center mt={6} px={10}>
          <Avatar
            source={{ uri: 'https://github.com/reciokaue.png' }}
            size={33}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}
