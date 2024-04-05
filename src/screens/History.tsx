import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'
import { Heading, SectionList, Text, VStack } from 'native-base'
import { useState } from 'react'

export function History() {
  const [exercises, setExercises] = useState([
    { title: '26.08.22', data: ['Puxuda frontal', 'Remada unilateral'] },
    { title: '27.08.22', data: ['Supino reto', 'alter inclinado'] },
  ])

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />
      <SectionList
        sections={exercises}
        renderItem={({ item }) => (
          <HistoryCard exercise="puxada" hour="18:39" muscleGroup="costas" />
        )}
        renderSectionHeader={({ section }) => (
          <Heading
            fontFamily="heading"
            color="gray.200"
            fontSize="md"
            mt={10}
            mb={3}
          >
            {section.title}
          </Heading>
        )}
        px={8}
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: 'center' }
        }
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center">
            Não há exercícios registrados ainda.{'\n'}
            vamos fazer exercícios hoje?
          </Text>
        )}
      />
    </VStack>
  )
}
