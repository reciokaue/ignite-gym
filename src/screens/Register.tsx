import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { useAuth } from '@contexts/Auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorProps } from '@routes/auth'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from 'native-base'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z
  .object({
    name: z
      .string({ required_error: 'Campo obrigatório' })
      .min(3, { message: 'Mínimo de 3 letras' }),
    email: z
      .string({ required_error: 'Campo obrigatório' })
      .email('Deve ser um email valido'),
    password: z
      .string({ required_error: 'Campo obrigatório' })
      .min(7, { message: 'Mínimo de 7 letras' }),
    passwordConfirm: z
      .string({ required_error: 'Confirme a senha' })
      .min(7, { message: 'Mínimo de 7 letras' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirm'],
  })
type Props = z.infer<typeof schema>

export function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation<AuthNavigatorProps>()
  const toast = useToast()
  const { login } = useAuth()

  function handleGoToLoginScreen() {
    navigation.navigate('login')
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Props>({
    resolver: zodResolver(schema),
  })

  async function handleSignUp({ email, name, password }: Props) {
    try {
      setIsLoading(true)

      await api.post('/users', { email, name, password })
      await login(email, password)
    } catch (error) {
      const isAppError = error instanceof AppError

      toast.show({
        title: isAppError ? error.message : 'Não foi possível criar a conta.',
        placement: 'top',
        bgColor: 'red.500',
      })
    }
    setIsLoading(false)
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={BackgroundImg}
        defaultSource={BackgroundImg}
        alt="Pessoas treinando"
        resizeMode="contain"
        position="absolute"
      />
      <VStack flex={1} px={8} pb={10} justifyContent="space-between">
        <Center my={2} pt={10}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>
        <Center>
          <Heading fontFamily="heading" color="gray.100" fontSize="xl" mb={6}>
            Crie sua conta
          </Heading>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                errorMessage={errors.name?.message}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={field.onChange}
                errorMessage={errors.email?.message}
                value={field.value}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={field.onChange}
                errorMessage={errors.password?.message}
                value={field.value}
              />
            )}
          />
          <Controller
            control={control}
            name="passwordConfirm"
            render={({ field }) => (
              <Input
                placeholder="Confirme a senha"
                secureTextEntry
                onChangeText={field.onChange}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.passwordConfirm?.message}
                value={field.value}
              />
            )}
          />
        </Center>
        <Center>
          <Button
            onPress={handleSubmit(handleSignUp)}
            title="Criar e acessar"
            isLoading={isLoading}
            disabled={isLoading}
          />
          <Button
            mt={4}
            title="Fazer login"
            variant="outline"
            onPress={handleGoToLoginScreen}
            isLoading={isLoading}
            disabled={isLoading}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}
