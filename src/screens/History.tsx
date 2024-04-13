import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'
import { api } from '@services/api'
import { useQuery } from '@tanstack/react-query'
import { Heading, SectionList, Skeleton, Text, VStack } from 'native-base'
import { HistoryListDTO } from 'src/DTOs/history'

export function History() {
  const { data: history, isLoading } = useQuery({
    queryKey: ['history'],
    queryFn: async () => {
      const response = await api.get(`/history`)
      return response.data as HistoryListDTO[]
    },
    refetchInterval: 60 * 5, // 5 minutes
  })

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />
      <SectionList
        sections={history || []}
        renderItem={({ item }) => (
          <HistoryCard
            exercise={item.name}
            hour={item.created_at}
            muscleGroup={item.group}
          />
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
          !history && { flex: 1, justifyContent: 'center' }
        }
        ListEmptyComponent={() =>
          isLoading ? (
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
            <Text color="gray.100" textAlign="center">
              Não há exercícios registrados ainda.{'\n'}
              vamos fazer exercícios hoje?
            </Text>
          )
        }
      />
    </VStack>
  )
}
