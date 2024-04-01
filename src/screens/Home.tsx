import { ExerciseCard } from '@components/ExerciseCard'
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { useNavigation } from '@react-navigation/native'
import { FlatList, Heading, HStack, Text, VStack } from 'native-base'
import { useState } from 'react'

export function Home() {
  const [groups, setGroups] = useState([
    'costas',
    'ombro',
    'bíceps',
    'triceps',
    'ombro',
  ])
  const [exercises, setExercises] = useState([
    'Puxada frontal',
    'Remada cavalinho',
    'Remada unilateral',
    'Rosca direta',
    'Rosca concentrada',
  ])
  const [selectedGroup, setSelectedGroup] = useState('')

  const navigation = useNavigation()

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise')
  }

  function HeaderContent() {
    return (
      <>
        <FlatList
          data={groups}
          renderItem={({ item }) => (
            <Group
              key={item}
              onPress={() => setSelectedGroup(item)}
              name={item}
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
          <Heading color="gray.200" fontSize="sm">
            Exercicios
          </Heading>
          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>
      </>
    )
  }

  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <ExerciseCard onPress={handleOpenExerciseDetails} key={item} />
        )}
        ListHeaderComponent={HeaderContent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 24 }}
      />
    </VStack>
  )
}
