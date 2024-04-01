import { ScreenHeader } from '@components/ScreenHeader'
import { Avatar, Center, ScrollView, Skeleton, Text, VStack } from 'native-base'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

const photo_size = 33

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={photo_size}
              h={photo_size}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <Avatar
              source={{ uri: 'https://github.com/reciokaue.png' }}
              size={photo_size}
            />
          )}
          <TouchableOpacity>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>
        </Center>
      </ScrollView>
    </VStack>
  )
}
