"use client";

import { authModalState } from "@/app/atoms/authModalAtom";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/app/firebase/errors";

export default function SignUp() {
	const [signUpForm, setSignUpForm] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState("");

	const setAuthModalState = useSetRecoilState(authModalState);

	const [createUserWithEmailAndPassword, user, loading, userError] =
		useCreateUserWithEmailAndPassword(auth);

	function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		setSignUpForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	}

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (error) setError("");

		if (signUpForm.password !== signUpForm.confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
	}

	return (
		<form onSubmit={onSubmit}>
			<Input
				required
				name="email"
				placeholder="email"
				type="email"
				mb={2}
				onChange={onChange}
				fontSize="10pt"
				_placeholder={{ color: "gray.500" }}
				_hover={{
					bg: "white",
					border: "1px solid",
					borderColor: "blue.500",
				}}
				_focus={{
					outline: "none",
					bg: "white",
					border: "1px solid",
					borderColor: "blue.500",
				}}
				bg="gray.50"
			/>
			<Input
				required
				name="password"
				placeholder="password"
				type="password"
				onChange={onChange}
				mb={2}
				fontSize="10pt"
				_placeholder={{ color: "gray.500" }}
				_hover={{
					bg: "white",
					border: "1px solid",
					borderColor: "blue.500",
				}}
				_focus={{
					outline: "none",
					bg: "white",
					border: "1px solid",
					borderColor: "blue.500",
				}}
				bg="gray.50"
			/>
			<Input
				required
				name="confirmPassword"
				placeholder="confirm password"
				type="password"
				onChange={onChange}
				mb={2}
				fontSize="10pt"
				_placeholder={{ color: "gray.500" }}
				_hover={{
					bg: "white",
					border: "1px solid",
					borderColor: "blue.500",
				}}
				_focus={{
					outline: "none",
					bg: "white",
					border: "1px solid",
					borderColor: "blue.500",
				}}
				bg="gray.50"
			/>
			{(error || userError) && (
				<Text textAlign="center" color="red" fontSize="10pt">
					{error ||
						FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
				</Text>
			)}
			<Button
				type="submit"
				width="100%"
				height="36px"
				mt={2}
				mb={2}
				isLoading={loading}
			>
				Sign Up
			</Button>
			<Flex fontSize="9pt" justifyContent="center">
				<Text mr={1}>Already a redditor?</Text>
				<Text
					color="blue.500"
					fontWeight={700}
					cursor="pointer"
					onClick={() =>
						setAuthModalState((prev) => ({
							...prev,
							view: "login",
						}))
					}
				>
					LOG IN
				</Text>
			</Flex>
		</form>
	);
}
