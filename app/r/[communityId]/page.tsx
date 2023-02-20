import { Community } from '@/app/atoms/communitiesAtom'
import About from '@/app/components/Community/About'
import CreatePostLink from '@/app/components/Community/CreatePostLink'
import Header from '@/app/components/Community/Header'
import PageContent from '@/app/components/Layout/PageContent'
import Posts from '@/app/components/Posts/Posts'
import { firestore } from '@/app/firebase/clientApp'
import { doc, getDoc } from 'firebase/firestore'

interface Props {
  params: {
    communityId: string
  }
}

async function getCommunityDocs(communityId: string) {
  const communityDocRef = doc(firestore, 'communities', communityId)
  const communityDoc = await getDoc(communityDocRef)
  return JSON.parse(
    JSON.stringify({
      id: communityDoc.id,
      ...communityDoc.data()
    })
  ) as Community
}

export default async function CommunityPage({
  params: { communityId }
}: Props) {
  const communityData = await getCommunityDocs(communityId)

  if (!communityData.creatorId) throw new Error('No community')

  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        <>
          <About communityData={communityData} />
        </>
      </PageContent>
    </>
  )
}
