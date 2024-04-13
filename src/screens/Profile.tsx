import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { ScreenHeader } from '@components/ScreenHeader'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import {
  Avatar,
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  useToast,
  VStack,
} from 'native-base'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

const photo_size = 33

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://github.com/reciokaue.png')

  const toast = useToast()

  async function handlePhotoSelect() {
    setPhotoIsLoading(true)
    try {
      const { canceled, assets: photos } =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
          aspect: [4, 4],
          allowsEditing: true,
        })

      const uri = photos && photos[0].uri

      if (!canceled && uri) {
        const { size: photoSize }: any = await FileSystem.getInfoAsync(uri)

        if (photoSize && photoSize / 1024 / 1025 > 5)
          toast.show({
            title: 'Essa imagem é muito grande. Escolha uma de até 5MB',
            placement: 'top',
            bgColor: 'red.500',
          })
        else {
          setUserPhoto(uri)

          toast.show({
            title: 'Imagem alterada com sucesso!',
            placement: 'top',
            bgColor: 'green.500',
          })
        }
      }
    } catch (e) {
      console.log(e)
    }
    setPhotoIsLoading(false)
  }

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
            <Avatar source={{ uri: userPhoto }} size={photo_size} />
          )}
          <TouchableOpacity onPress={handlePhotoSelect}>
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

          <Input placeholder="Nome" bg="gray.600" />
          <Input placeholder="Email" bg="gray.600" isDisabled />
        </Center>
        <VStack px={10} mt={12} mb={9}>
          <Heading fontFamily="heading" color="gray.200" fontSize="md" mb={2}>
            Alterar senha
          </Heading>
          <Input placeholder="Senha antiga" bg="gray.600" secureTextEntry />
          <Input placeholder="Nova senha" bg="gray.600" secureTextEntry />
          <Input
            placeholder="Confirmar nova senha"
            bg="gray.600"
            secureTextEntry
          />
          <Button title="Atualizar" mt={4} />
        </VStack>
      </ScrollView>
    </VStack>
  )
}
