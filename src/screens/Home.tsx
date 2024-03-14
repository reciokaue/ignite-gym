import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { FlatList, HStack, VStack } from 'native-base'
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
    </VStack>
  )
}
