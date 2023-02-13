'use client'

import { Flex } from '@chakra-ui/react'
import AuthButtons from './AuthButtons'

interface Props {}

export default function RightContent({}: Props) {
  return (
    <>
      <Flex justify='center' align='center'>
        <AuthButtons />
      </Flex>
    </>
  )
}