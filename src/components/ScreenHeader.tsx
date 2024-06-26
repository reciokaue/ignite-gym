import { Center, Heading } from 'native-base'

interface ScreenHeaderProps {
  title: string
}

export function ScreenHeader({ title }: ScreenHeaderProps) {
  return (
    <Center bg="gray.600" pb={6} pt={16}>
      <Heading fontFamily="heading" color="gray.100" fontSize="xl">
        {title}
      </Heading>
    </Center>
  )
}
