import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { authModalState } from '../atoms/authModalAtom'
import {
  Community,
  CommunitySnippet,
  communityState
} from '../atoms/communitiesAtom'
import { auth, firestore } from '../firebase/clientApp'

export default function useCommunityData() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState)

  const setAuthModalState = useSetRecoilState(authModalState)

  const [user] = useAuthState(auth)

  async function joinCommunity(communityData: Community) {
    if (!user) {
      setAuthModalState({
        open: true,
        view: 'login'
      })
      return
    }

    setLoading(true)

    try {
      const batch = writeBatch(firestore)
      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageUrl || ''
      }

      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          communityData.id
        ),
        newSnippet
      )

      batch.update(doc(firestore, `communities`, communityData.id), {
        numberOfMembers: increment(1)
      })

      await batch.commit()

      setCommunityStateValue(prev => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet]
      }))
    } catch (error: any) {
      console.log('joinCommunity Error', error)
      setError(error.message)
    }

    setLoading(false)
  }

  async function leaveCommunity(communityId: string) {
    setLoading(true)

    try {
      const batch = writeBatch(firestore)

      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets`, communityId)
      )

      batch.update(doc(firestore, `communities`, communityId), {
        numberOfMembers: increment(-1)
      })

      await batch.commit()

      setCommunityStateValue(prev => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          snippet => snippet.communityId !== communityId
        )
      }))
    } catch (error: any) {
      console.log('leaveCommunity Error', error)
      setError(error.message)
    }

    setLoading(false)
  }

  function onJoinOrLeaveCommunity(communityData: Community, isJoined: boolean) {
    if (isJoined) {
      leaveCommunity(communityData.id)
      return
    }
    joinCommunity(communityData)
  }

  async function getMySnippets() {
    setLoading(true)

    try {
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      )
      const snippets = snippetDocs.docs.map(doc => ({
        ...doc.data()
      }))

      setCommunityStateValue(prev => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[]
      }))
    } catch (error: any) {
      console.log('getMySnippets Error', error)
      setError(error.message)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (!user) return
    getMySnippets()
  }, [user])

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading
  }
}
