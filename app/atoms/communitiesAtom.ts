import { Timestamp } from 'firebase/firestore'
import { atom } from 'recoil'

export interface Community {
  id: string
  creatorId: string
  createdAt?: Timestamp
  numberOfMembers: number
  privacyType: 'public' | 'private' | 'restricted'
  imageUrl?: string
}

export interface CommunitySnippet {
  communityId: string
  isModerator?: boolean
  imageURL?: string
}

interface CommunityState {
  mySnippets: CommunitySnippet[]
}

const defaultCommunityState: CommunityState = {
  mySnippets: []
}

export const communityState = atom<CommunityState>({
  key: 'communityState',
  default: defaultCommunityState
})