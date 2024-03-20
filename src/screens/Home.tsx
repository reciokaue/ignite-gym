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
        <HStack justifyContent="space-between">
          <Heading color="gray.200" fontSize="sm">
            Exercicios
          </Heading>
          <Text color="gray.200" fontSize="sm">
            4
          </Text>
        </HStack>
        <ExerciseCard />
        <ExerciseCard />
      </VStack>
    </VStack>
  )
}
