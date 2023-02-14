"use client";

import { RecoilRoot } from "recoil";

interface Props {
	children: React.ReactNode;
}

export default function RecoilWrapper({ children }: Props) {
	return <RecoilRoot>{children}</RecoilRoot>;
}
