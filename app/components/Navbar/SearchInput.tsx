'use client'

import { SearchIcon } from '@chakra-ui/icons'
import { Flex, InputGroup, Input, InputLeftElement } from '@chakra-ui/react'

interface Props {}

export default function SearchInput({}: Props) {
  return (
    <Flex flexGrow={1} mr={2} align='center'>
      <InputGroup>
        <InputLeftElement
          pointerEvents='none'
          children={<SearchIcon color='gray.400' mb={1} />}
        />
        <Input
          placeholder='Search Reddit'
          fontSize='10pt'
          _placeholder={{ color: 'gray.500' }}
          _hover={{ bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
          _focus={{
            outline: 'none',
            border: '1px solid',
            borderColor: 'blue.500'
          }}
          height='34px'
          bg='gray.50'
        />
      </InputGroup>
    </Flex>
  )
}
