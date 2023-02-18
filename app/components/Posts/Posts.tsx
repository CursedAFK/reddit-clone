'use client'

import { useEffect, useState } from 'react'
import { Community } from '@/app/atoms/communitiesAtom'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { auth, firestore } from '@/app/firebase/clientApp'
import usePost from '@/app/hooks/usePost'
import { Post } from '@/app/atoms/postsAtom'
import PostItem from './PostItem'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Stack } from '@chakra-ui/react'

type Props = {
  communityData: Community
}

const Posts = (props: Props) => {
  const [loading, setLoading] = useState(false)

  const [user] = useAuthState(auth)

  const {
    postStateValue,
    setPostStateValue,
    onVote,
    onDeletePost,
    onSelectPost
  } = usePost()

  const getPosts = async () => {
    try {
      const postQuery = query(
        collection(firestore, 'posts'),
        where('communityId', '==', props.communityData.id),
        orderBy('createdAt', 'desc')
      )

      const postDocs = await getDocs(postQuery)

      const posts = postDocs.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      setPostStateValue(prev => ({
        ...prev,
        posts: posts as Post[]
      }))
    } catch (error: any) {
      console.log('getPosts error', error.message)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <Stack>
      {postStateValue.posts.map(post => (
        <PostItem
          key={post.id}
          post={post}
          userIsCreator={user?.uid === post.creatorId}
          userVoteValue={undefined}
          onVote={onVote}
          onDeletePost={onDeletePost}
          onSelectPost={onSelectPost}
        />
      ))}
    </Stack>
  )
}

export default Posts
