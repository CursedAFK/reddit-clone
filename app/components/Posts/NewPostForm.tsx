import { Post } from '@/app/atoms/postsAtom'
import { firestore, storage } from '@/app/firebase/clientApp'
import { Alert, AlertIcon, Flex, Icon, Text } from '@chakra-ui/react'
import { User } from 'firebase/auth'
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { BiPoll } from 'react-icons/bi'
import { BsLink45Deg, BsMic } from 'react-icons/bs'
import { IoDocumentText, IoImageOutline } from 'react-icons/io5'
import ImageUpload from './PostForm/ImageUpload'
import Textinputs from './PostForm/Textinputs'
import TabItem from './TabItem'

interface Props {
  user: User
}

export interface TabItemProps {
  title: string
  icon: typeof Icon.arguments
}

const formTabs: TabItemProps[] = [
  {
    title: 'Post',
    icon: IoDocumentText
  },
  {
    title: 'Images & Video',
    icon: IoImageOutline
  },
  {
    title: 'Link',
    icon: BsLink45Deg
  },
  {
    title: 'Poll',
    icon: BiPoll
  },
  {
    title: 'Talk',
    icon: BsMic
  }
]

export default function NewPostForm({ user }: Props) {
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title)
  const [textInput, setTextInput] = useState({
    title: '',
    body: ''
  })
  const [selectedFile, setSelectedFile] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const pathname = usePathname()
  const router = useRouter()

  const extractSubReddit = (str: string | null): string | null => {
    const regex = /\/r\/(\w+)\//
    const match = str?.match(regex)

    if (match) {
      return match[1]
    } else {
      return null
    }
  }

  const handleCreatePost = async () => {
    const communityId = extractSubReddit(pathname)!

    const newPost: Post = {
      communityId,
      creatorId: user.uid,
      creatorDisplayName: user.email!.split('@')[0],
      title: textInput.title,
      body: textInput.body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp
    }

    setLoading(true)

    try {
      const postDocRef = await addDoc(collection(firestore, 'posts'), newPost)

      if (selectedFile) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`)

        await uploadString(imageRef, selectedFile, 'data_url')

        const downloadURL = await getDownloadURL(imageRef)

        await updateDoc(postDocRef, {
          imageURL: downloadURL
        })
      }
    } catch (error: any) {
      console.log('handleCreatePost Error', error.message)
      setError(true)
    }

    setLoading(false)

    // router.back()
  }

  function onSelectImage(event: React.ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader()

    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0])
    }

    reader.onload = readerEvent => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string)
      }
    }
  }

  function onTextChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const {
      target: { name, value }
    } = event
    setTextInput(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <Flex direction={'column'} bg='white' borderRadius={4} mt={2}>
      <Flex width={'100%'}>
        {formTabs.map((tab, index) => (
          <TabItem
            key={index}
            item={tab}
            selected={tab.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex p={4}>
        {selectedTab === 'Post' && (
          <Textinputs
            textInputs={textInput}
            loading={loading}
            handleCreatePost={handleCreatePost}
            onChange={onTextChange}
          />
        )}
        {selectedTab === 'Images & Video' && (
          <ImageUpload
            selectedFile={selectedFile}
            onSelectImage={onSelectImage}
            setSelectedTab={setSelectedTab}
            setSelectedFile={setSelectedFile}
          />
        )}
      </Flex>
      {error && (
        <Alert status='error'>
          <AlertIcon />
          <Text>Error creating post</Text>
        </Alert>
      )}
    </Flex>
  )
}
