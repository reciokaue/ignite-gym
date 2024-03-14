import { MaterialIcons } from '@expo/vector-icons'
import { Avatar, Heading, HStack, Icon, Text, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native'

export function HomeHeader() {
  return (
    <HStack bg="gray.600" pt={10} pb={5} px={8} alignItems="center">
      <Avatar
        source={{ uri: 'https://github.com/reciokaue.png' }}
        size={16}
        borderWidth={2}
        borderColor="gray.400"
        mr={4}
      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá
        </Text>
        <Heading color="gray.100" fontSize="md">
          Kaue
        </Heading>
      </VStack>
      <TouchableOpacity>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  )
}
