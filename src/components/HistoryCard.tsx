import { Heading, HStack, Text, VStack } from 'native-base'

interface HistoryCardProps {
  muscleGroup: string
  exercise: string
  hour: string
}

export function HistoryCard({ exercise, hour, muscleGroup }: HistoryCardProps) {
  return (
    <HStack
      w="full"
      px={5}
      py={4}
      mb={3}
      bg="gray.600"
      rounded="md"
      alignItems="center"
    >
      <VStack mr={5}>
        <Heading color="white" fontSize="md" textTransform="capitalize">
          {muscleGroup}
        </Heading>
        <Text color="gray.100" fontSize="lg" numberOfLines={1}>
          {exercise}
        </Text>
      </VStack>
      <Text color="gray.300" fontSize="md">
        {hour}
      </Text>
    </HStack>
  )
}
