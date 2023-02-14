"use client";

import { auth } from "@/app/firebase/clientApp";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

export default function OAuthButtons() {
	const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

	return (
		<Flex direction="column" width="100%" mb={4}>
			<Button
				variant="oauth"
				mb={2}
				isLoading={loading}
				onClick={() => signInWithGoogle()}
			>
				<Image src="/images/googlelogo.png" height="20px" mr={4} />
				Continue with Google
			</Button>
			<Button variant="oauth">Other Providers</Button>
			{error && (
				<Text textAlign="center" color="red" fontSize="10pt">
					{error.message}
				</Text>
			)}
		</Flex>
	);
}
