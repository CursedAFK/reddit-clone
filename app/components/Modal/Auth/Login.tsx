"use client";

import { authModalState } from "@/app/atoms/authModalAtom";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

export default function Login() {
	const [loginForm, setLoginForm] = useState({
		email: "",
		password: "",
	});

	const setAuthModalState = useSetRecoilState(authModalState);

	function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		setLoginForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	}

	function onSubmit() {}

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
			<Button type="submit" width="100%" height="36px" mt={2} mb={2}>
				Log In
			</Button>
			<Flex fontSize="9pt" justifyContent="center">
				<Text mr={1}>New here?</Text>
				<Text
					color="blue.500"
					fontWeight={700}
					cursor="pointer"
					onClick={() =>
						setAuthModalState((prev) => ({
							...prev,
							view: "signup",
						}))
					}
				>
					SIGN UP
				</Text>
			</Flex>
		</form>
	);
}
