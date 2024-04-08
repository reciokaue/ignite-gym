import defaultUserPhoto from '@assets/userPhotoDefault.png'
import { useAuth } from '@contexts/Auth'
import { MaterialIcons } from '@expo/vector-icons'
import { Avatar, Heading, HStack, Icon, Text, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native'

export function HomeHeader() {
  const { user } = useAuth()

  return (
    <HStack bg="gray.600" pt={10} pb={4} px={8} alignItems="center">
      <Avatar
        source={user.avatar ? { uri: user.avatar } : defaultUserPhoto}
        size={14}
        mr={4}
      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá
        </Text>
        <Heading fontFamily="heading" color="gray.100" fontSize="md">
          {user.name}
        </Heading>
      </VStack>
      <TouchableOpacity>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  )
}
