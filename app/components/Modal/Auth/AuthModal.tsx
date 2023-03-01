"use client";

import { authModalState } from "@/app/atoms/authModalAtom";
import { auth } from "@/app/firebase/clientApp";
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
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import ResetPassword from "./ResetPassword";

export default function AuthModal() {
	const [modalState, setModalState] = useRecoilState(authModalState);

	const [user, loading, error] = useAuthState(auth);

	function handleClose() {
		setModalState((prev) => ({
			...prev,
			open: false,
		}));
	}

	useEffect(() => {
		if (user) handleClose();
	}, [user]);

	return (
		<>
			<Modal isOpen={modalState.open} onClose={handleClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader textAlign="center">
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
							{modalState.view === "login" || modalState.view === "signup" ? (
								<>
									<OAuthButtons />
									<Text color="gray.500" fontWeight={700}>
										OR
									</Text>
									<AuthInputs />
								</>
							) : (
								<ResetPassword />
							)}
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
