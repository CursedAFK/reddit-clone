import { Button, Flex, Image, Input, Stack } from '@chakra-ui/react'
import { useRef } from 'react'

interface Props {
  selectedFile?: string
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void
  setSelectedTab: (value: string) => void
  setSelectedFile: (value: string) => void
}

export default function ImageUpload({
  onSelectImage,
  setSelectedFile,
  setSelectedTab,
  selectedFile
}: Props) {
  const selectedFileRef = useRef<HTMLInputElement | null>(null)

  return (
    <Flex justify={'center'} align='center' width={'100%'} direction='column'>
      {selectedFile ? (
        <>
          <Image src={selectedFile} maxWidth={'400px'} maxHeight={'400px'} />
          <Stack direction={'row'} mt={4}>
            <Button height={'28px'} onClick={() => setSelectedTab('Post')}>
              Back to Post
            </Button>
            <Button
              variant={'outline'}
              height='28px'
              onClick={() => setSelectedFile('')}
            >
              Remove
            </Button>
          </Stack>
        </>
      ) : (
        <Flex
          justify={'center'}
          align={'center'}
          p={20}
          border='1px dashed'
          borderColor={'gray.200'}
          w={'100%'}
          borderRadius={4}
        >
          <Button
            variant={'outline'}
            height={'28px'}
            onClick={() => selectedFileRef.current?.click()}
          >
            Upload
          </Button>
          <Input
            type={'file'}
            ref={selectedFileRef}
            hidden
            onChange={onSelectImage}
          />
        </Flex>
      )}
    </Flex>
  )
}
