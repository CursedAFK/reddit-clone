'use client'

import PageContent from '@/app/components/Layout/PageContent'
import NewPostForm from '@/app/components/Posts/NewPostForm'
import { auth } from '@/app/firebase/clientApp'
import { Box, Text } from '@chakra-ui/react'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function SubmitPostPage() {
  const [user] = useAuthState(auth)

  return (
    <PageContent>
      <>
        <Box p={'14px 0px'} borderBottom={'1px solid'} borderColor={'white'}>
          <Text>Create a post</Text>
        </Box>
        {user && <NewPostForm user={user} />}
      </>
      <></>
    </PageContent>
  )
}
