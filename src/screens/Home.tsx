import { ExerciseCard } from '@components/ExerciseCard'
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
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

  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList
        data={groups}
        renderItem={({ item }) => (
          <Group
            key={item}
            onPress={() => setSelectedGroup(item)}
            name={item}
            isActive={selectedGroup === item}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
      />
      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="sm">
            Exercicios
          </Heading>
          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>
        <FlatList
          data={exercises}
          renderItem={({ item }) => <ExerciseCard key={item} />}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 10 }}
        />
      </VStack>
    </VStack>
  )
}
