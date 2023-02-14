'use client'

import { Button, Flex, Image } from "@chakra-ui/react"

export default function OAuthButtons() {
	return (
			<Flex direction='column' width='100%' mb={4}>
				<Button variant='oauth' mb={2}>
					<Image src="/images/googlelogo.png" height='20px' mr={4} />
					Continue wuth Google
				</Button>
				<Button variant='oauth'>Other Providers</Button>
			</Flex>
		)
}