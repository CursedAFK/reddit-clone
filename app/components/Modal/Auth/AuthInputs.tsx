'use client'

import { authModalState } from "@/app/atoms/authModalAtom";
import { Flex } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import Login from "./Login";
import SignUp from "./SignUp";

interface Props {}

export default function AuthInputs({}: Props) {
	const modalState = useRecoilValue(authModalState)

	return (
			<Flex direction='column' align='center' width='100%' mt={4}>
				{modalState.view === 'login' ? <Login /> : <SignUp />}
			</Flex>
		)
}