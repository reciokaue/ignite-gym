import BodySvg from '@assets/body.svg'
import RepetitionsSvg from '@assets/repetitions.svg'
import SeriesSvg from '@assets/series.svg'
import { Button } from '@components/Button'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import {
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from 'native-base'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { ExerciseDTO } from 'src/DTOs/exercise'

interface ExerciseProps {
  route: {
    params: {
      exercise: ExerciseDTO
    }
  }
  navigation: any
}

export function Exercise({ route }: ExerciseProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { exercise } = route.params

  const navigation = useNavigation()
  const toast = useToast()

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleRegisterExercise() {
    setIsLoading(true)
    try {
      await api.post('/history', {
        exercise_id: exercise.id,
      })

      toast.show({
        title: 'Exercício registrado com sucesso!',
        placement: 'top',
        bgColor: 'green.700',
      })

      navigation.goBack()
    } catch (error) {
      const isAppError = error instanceof AppError

      toast.show({
        title: isAppError
          ? error.message
          : 'Não foi possível registrar o exercício.',
        placement: 'top',
        bgColor: 'red.500',
      })
    }
    setIsLoading(false)
  }

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          mt={4}
          mb={8}
          alignItems="center"
        >
          <Heading
            fontFamily="heading"
            color="gray.100"
            fontSize="lg"
            flexShrink={1}
          >
            {exercise.name}
          </Heading>
          <HStack alignItems="center">
            <BodySvg />
            <Text color="gray.200" ml={1} textTransform="capitalize">
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView>
        <VStack p={8}>
          <Box rounded="lg" mb={3} overflow="hidden">
            <Image
              w="full"
              h={80}
              source={{
                uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
              }}
              alt={exercise.name}
              resizeMode="cover"
            />
          </Box>
          <Box bg="gray.600" rounded="md" px={4} pb={4}>
            <HStack
              alignItems="center"
              justifyContent="space-around"
              mb={6}
              mt={5}
            >
              <HStack>
                <SeriesSvg />
                <Text color="gray.200" ml="2">
                  {exercise.series} séries
                </Text>
              </HStack>
              <HStack>
                <RepetitionsSvg />
                <Text color="gray.200" ml="2">
                  {exercise.repetitions} repetições
                </Text>
              </HStack>
            </HStack>
            <Button
              onPress={handleRegisterExercise}
              isLoading={isLoading}
              title="Marcar como realizado"
            />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  )
}
