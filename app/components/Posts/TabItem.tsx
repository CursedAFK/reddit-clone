import { Flex, Icon, Text } from '@chakra-ui/react'
import { TabItemProps } from './NewPostForm'

interface Props {
  item: TabItemProps
  selected: boolean
  setSelectedTab: (title: string) => void
}

export default function TabItem({ item, selected, setSelectedTab }: Props) {
  return (
    <Flex
      justify={'center'}
      align={'center'}
      flexGrow={1}
      p={'14px 0px'}
      cursor='pointer'
      _hover={{
        bg: 'gray.50'
      }}
      color={selected ? 'blue.500' : 'gray.500'}
      borderWidth={selected ? '0px 1px 2px 0' : '0px 1px 1px 0'}
      borderBottomColor={selected ? 'blue.500' : 'gray.200'}
      borderRightColor={'gray.200'}
      fontWeight={700}
      onClick={() => setSelectedTab(item.title)}
    >
      <Flex alignItems={'center'} height={'20px'} mr={2}>
        <Icon as={item.icon} />
      </Flex>
      <Text fontSize={'10pt'}>{item.title}</Text>
    </Flex>
  )
}
