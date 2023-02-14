'use client'

import { auth } from '@/app/firebase/clientApp'
import { Button, Flex } from '@chakra-ui/react'
import { signOut, User } from 'firebase/auth'
import AuthModal from '../../Modal/Auth/AuthModal'
import AuthButtons from './AuthButtons'
import Icons from './Icons'

interface Props {
  user?: User | null
}

export default function RightContent({ user }: Props) {
  return (
    <>
      <AuthModal />
      <Flex justify='center' align='center'>
        {user ? <Icons /> : <AuthButtons />}
      </Flex>
    </>
  )
}
