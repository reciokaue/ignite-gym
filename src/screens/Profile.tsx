import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { ScreenHeader } from '@components/ScreenHeader'
import { useAuth } from '@contexts/Auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@services/api'
import { useMutation } from '@tanstack/react-query'
import { AppError } from '@utils/AppError'
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
import { Controller, useForm } from 'react-hook-form'
import { TouchableOpacity } from 'react-native'
import { z } from 'zod'

const photo_size = 33

const schema = z
  .object({
    name: z
      .string({ required_error: 'Campo obrigatório' })
      .min(3, { message: 'Mínimo de 3 letras' }),
    email: z
      .string({ required_error: 'Campo obrigatório' })
      .email('Deve ser um email valido'),
    oldPassword: z
      .string({ required_error: 'Campo obrigatório' })
      .min(7, { message: 'Mínimo de 7 letras' })
      .nullable()
      .nullish()
      .transform((value) => !!value || null),
    password: z
      .string({ required_error: 'Campo obrigatório' })
      .min(7, { message: 'Mínimo de 7 letras' })
      .nullable()
      .nullish()
      .transform((value) => !!value || null),
    passwordConfirm: z
      .string({ required_error: 'Campo obrigatório' })
      .min(7, { message: 'Mínimo de 7 letras' })
      .nullable()
      .nullish()
      .transform((value) => !!value || null),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirm'],
  })
  .refine((data) => data.password == null, {
    message: 'Preencha a senha antiga',
    path: ['oldPassword'],
  })
type Props = z.infer<typeof schema>

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://github.com/reciokaue.png')

  const toast = useToast()
  const { user, updateUser } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Props>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  })

  const updateUserMutation = useMutation({
    mutationFn: async (data: Props) => {
      await api.put('/users', data)
      updateUser({
        ...user,
        name: data.name,
      })

      toast.show({
        title: 'Dados atualizados com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      })
    },
    onError: (error) => {
      const isAppError = error instanceof AppError

      toast.show({
        title: isAppError
          ? error.message
          : 'Não foi possível atualizar os dados',
        placement: 'top',
        bgColor: 'red.500',
      })
    },
  })

  async function handleProfileUpdate(data: Props) {
    updateUserMutation.mutateAsync(data)
  }

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

          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input
                placeholder="Nome"
                onChangeText={field.onChange}
                errorMessage={errors.name?.message}
                value={field.value}
                bg="gray.600"
              />
            )}
          />
          <Input value={user.email} bg="gray.600" disabled />
        </Center>
        <VStack px={10} mt={12} mb={9}>
          <Heading fontFamily="heading" color="gray.200" fontSize="md" mb={2}>
            Alterar senha
          </Heading>
          <Controller
            control={control}
            name="oldPassword"
            render={({ field }) => (
              <Input
                placeholder="Senha antiga"
                secureTextEntry
                onChangeText={field.onChange}
                errorMessage={errors.oldPassword?.message}
                bg="gray.600"
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={field.onChange}
                returnKeyType="send"
                errorMessage={errors.password?.message}
                bg="gray.600"
              />
            )}
          />
          <Controller
            control={control}
            name="passwordConfirm"
            render={({ field }) => (
              <Input
                placeholder="Confirmar nova senha"
                secureTextEntry
                onChangeText={field.onChange}
                returnKeyType="send"
                errorMessage={errors.passwordConfirm?.message}
                bg="gray.600"
              />
            )}
          />
          <Button
            isLoading={isSubmitting || updateUserMutation.isPending}
            isDisabled={isSubmitting || updateUserMutation.isPending}
            onPress={handleSubmit(handleProfileUpdate)}
            title="Atualizar"
            mt={4}
          />
        </VStack>
      </ScrollView>
    </VStack>
  )
}
