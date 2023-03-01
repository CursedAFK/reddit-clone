'use client'

import { Flex } from '@chakra-ui/react'
import { User } from 'firebase/auth'
import AuthModal from '../../Modal/Auth/AuthModal'
import AuthButtons from './AuthButtons'
import Icons from './Icons'
import UserMenu from './UserMenu'

interface Props {
  user?: User | null
}

export default function RightContent({ user }: Props) {
  return (
    <>
      <AuthModal />
      <Flex justify='center' align='center'>
        {user ? <Icons /> : <AuthButtons />}
        <UserMenu user={user} />
      </Flex>
    </>
  )
}
