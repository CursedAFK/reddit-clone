"use client";

import { authModalState } from "@/app/atoms/authModalAtom";
import {
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
    Text,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";

export default function AuthModal() {
	const [modalState, setModalState] = useRecoilState(authModalState);

	function handleClose() {
		setModalState((prev) => ({
			...prev,
			open: false,
		}));
	}

	return (
		<>
			<Modal isOpen={modalState.open} onClose={handleClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader textAlign='center'>
						{modalState.view === "login" ? "Log In" : "Sign Up"}
						{modalState.view === "resetPassword" ? "Reset Password" : ""}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody
						display="flex"
						flexDirection="column"
						alignItems="center"
						justifyContent="center"
						pb={6}
					>
						<Flex
							direction="column"
							align="center"
							justify="center"
							width="70%"
						>
							<OAuthButtons />
							<Text color='gray.500' fontWeight={700}>OR</Text>
							<AuthInputs />
							{/*<ResetPassword />*/}
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
