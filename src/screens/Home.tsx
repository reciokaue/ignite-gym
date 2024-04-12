import { ExerciseCard } from '@components/ExerciseCard'
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { useNavigation } from '@react-navigation/native'
import { api } from '@services/api'
import { useQuery } from '@tanstack/react-query'
import { FlatList, Heading, HStack, Text, VStack } from 'native-base'
import { useState } from 'react'
import { ExerciseDTO } from 'src/DTOs/exercise'

export function Home() {
  const [selectedGroup, setSelectedGroup] = useState('')

  const { data: groups } = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const response = await api.get(`/groups`)
      return response.data as string[]
    },
  })
  const { data: exercises } = useQuery({
    queryKey: ['exercises', selectedGroup],
    queryFn: async () => {
      const response = await api.get(`/exercises/bygroup/${selectedGroup}`)
      console.log(response.data)
      return response.data as ExerciseDTO[]
    },
  })

  const navigation = useNavigation()

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise')
  }

  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <ExerciseCard onPress={handleOpenExerciseDetails} key={item.id} />
        )}
        ListHeaderComponent={
          <>
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
              my={10}
              maxH={10}
              minH={10}
            />
            <HStack justifyContent="space-between" mb={5}>
              <Heading fontFamily="heading" color="gray.200" fontSize="sm">
                Exercicios
              </Heading>
              <Text color="gray.200" fontSize="sm">
                {exercises?.length || ''}
              </Text>
            </HStack>
          </>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 24 }}
      />
    </VStack>
  )
}
