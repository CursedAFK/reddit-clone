'use client'

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Text,
  Input
} from '@chakra-ui/react'
import { useState } from 'react'

interface Props {
  open: boolean
  handleClose: () => void
}

export default function CreateCommunityModal({ open, handleClose }: Props) {
  const [communityName, setCommunityName] = useState('')
  const [charsRemaining, setCharsRemaining] = useState(21)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length > 21) return
    setCommunityName(e.target.value)
    setCharsRemaining(21 - e.target.value.length)
  }

  return (
    <>
      <Modal isOpen={open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display='flex'
            flexDirection={'column'}
            fontSize={15}
            padding={3}
          >
            Create a community
          </ModalHeader>
          <Box pl={3} pr={3}>
            <ModalCloseButton />
            <ModalBody
              display={'flex'}
              flexDirection={'column'}
              padding={'10px 0px'}
            >
              <Text fontWeight={600} fontSize={15}>
                Name
              </Text>
              <Text fontSize={11} color={'gray.500'}>
                Community names including capitalization cannot be changed
              </Text>
              <Text
                position={'relative'}
                top={'28px'}
                left={'10px'}
                width={'20px'}
                color={'gray.400'}
              >
                r/
              </Text>
              <Input
                position={'relative'}
                value={communityName}
                size={'sm'}
                pl={'22px'}
                onChange={handleChange}
              />
              <Text
                color={charsRemaining === 0 ? 'red' : 'gray.500'}
                fontSize={9}
              >
                {charsRemaining} Characters remaining
              </Text>
              <Box mt={4} mb={4}>
                <Text fontWeight={600} fontSize={15}>
                  Community Type
                </Text>
              </Box>
            </ModalBody>
          </Box>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleClose}>
              Close
            </Button>
            <Button variant='ghost'>Create Community</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
