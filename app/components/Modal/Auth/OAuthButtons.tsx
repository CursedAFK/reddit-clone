'use client'

import { auth, firestore } from '@/app/firebase/clientApp'
import { Button, Flex, Image, Text } from '@chakra-ui/react'
import { User } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'

export default function OAuthButtons() {
  const [signInWithGoogle, userCred, loading, error] = useSignInWithGoogle(auth)

  async function createUserDocument(user: User) {
    const userDocRef = doc(firestore, 'users', user.uid)

    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)))
  }

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user)
    }
  }, [userCred])

  return (
    <Flex direction='column' width='100%' mb={4}>
      <Button
        variant='oauth'
        mb={2}
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        <Image src='/images/googlelogo.png' height='20px' mr={4} />
        Continue with Google
      </Button>
      <Button variant='oauth'>Other Providers</Button>
      {error && (
        <Text textAlign='center' color='red' fontSize='10pt'>
          {error.message}
        </Text>
      )}
    </Flex>
  )
}
