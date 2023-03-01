'use client'

import { Button, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { useEffect } from 'react'

interface Props {
  error: Error
}

export default function Error({ error }: Props) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Flex
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      minHeight={'60vh'}
    >
      Sorry, that community does not exist or has been banned
      <Link href={'/'}>
        <Button mt={4}>GO HOME</Button>
      </Link>
    </Flex>
  )
}
