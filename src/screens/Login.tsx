import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { useAuth } from '@contexts/Auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorProps } from '@routes/auth'
import { AppError } from '@utils/AppError'
import axios from 'axios'
import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from 'native-base'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  email: z
    .string({ required_error: 'Campo obrigatório' })
    .email('Deve ser um email valido'),
  password: z
    .string({ required_error: 'Campo obrigatório' })
    .min(7, { message: 'Mínimo de 7 letras' }),
})
type Props = z.infer<typeof schema>

export function Login() {
  const navigation = useNavigation<AuthNavigatorProps>()
  const { login } = useAuth()
  const toast = useToast()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Props>({
    resolver: zodResolver(schema),
  })

  async function handleLogin({ email, password }: Props) {
    await login(email, password).catch((error) => {
      const isAppError = error instanceof AppError

      toast.show({
        title: isAppError ? error.message : 'Não foi possível fazer login.',
        placement: 'top',
        bgColor: 'red.500',
      })
    })
  }

  function handleGoToRegister() {
    navigation.navigate('register')
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={8} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />
        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>
        <Center>
          <Heading fontFamily="heading" color="gray.100" fontSize="xl" mb={6}>
            Acesse sua conta
          </Heading>
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
                onSubmitEditing={handleSubmit(handleLogin)}
                returnKeyType="send"
              />
            )}
          />
          <Button onPress={handleSubmit(handleLogin)} title="Acessar" />
        </Center>

        <Center mt={24}>
          <Button
            onPress={handleGoToRegister}
            title="Criar conta"
            variant="outline"
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}
