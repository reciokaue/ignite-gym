import { ExerciseCard } from '@components/ExerciseCard'
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { NavigatorProps } from '@routes/app'
import { api } from '@services/api'
import { useQuery } from '@tanstack/react-query'
import {
  Center,
  FlatList,
  Heading,
  HStack,
  Skeleton,
  Text,
  VStack,
} from 'native-base'
import { useState } from 'react'
import { ExerciseDTO } from 'src/DTOs/exercise'

export function Home({ navigation: { navigate } }: NavigatorProps) {
  const [selectedGroup, setSelectedGroup] = useState('')

  const { data: groups } = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const response = await api.get(`/groups`)
      return response.data as string[]
    },
  })
  const { data: exercises, isLoading } = useQuery({
    queryKey: ['exercises', selectedGroup],
    queryFn: async () => {
      const response = await api.get(`/exercises/bygroup/${selectedGroup}`)
      return response.data as ExerciseDTO[]
    },
  })

  function handleOpenExerciseDetails(exercise: ExerciseDTO) {
    navigate('exercise', { exercise })
  }

  return (
    <VStack flex={1}>
      <HomeHeader />
      <VStack>
        <FlatList
          data={groups}
          renderItem={({ item }) => (
            <Group
              key={item}
              name={item}
              onPress={() => setSelectedGroup(item)}
              isActive={selectedGroup.toUpperCase() === item.toUpperCase()}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          py={4}
          _contentContainerStyle={{ paddingLeft: 6, paddingRight: 3 }}
        />
      </VStack>
      <FlatList
        data={exercises || []}
        ListHeaderComponent={
          <HStack justifyContent="space-between" mb={5}>
            <Heading fontFamily="heading" color="gray.200" fontSize="sm">
              Exercícios
            </Heading>
            <Text color="gray.200" fontSize="sm">
              {exercises?.length || ''}
            </Text>
          </HStack>
        }
        renderItem={({ item }) => (
          <ExerciseCard
            data={item}
            onPress={() => handleOpenExerciseDetails(item)}
            key={item.id}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 10,
          paddingHorizontal: 24,
          flexGrow: 1,
        }}
        ListEmptyComponent={() => Loading(isLoading)}
      />
    </VStack>
  )
}

const Loading = (isLoading: boolean) => {
  return isLoading ? (
    [0, 1, 2].map((i) => (
      <Skeleton
        key={`sh-${i}`}
        h={20}
        p={4}
        rounded="md"
        startColor="gray.500"
        endColor="gray.400"
        mt={2}
      />
    ))
  ) : (
    <Center flex={1} h="full" pb={16}>
      <Text color="gray.200">Selecione um grupo muscular.</Text>
    </Center>
  )
}
