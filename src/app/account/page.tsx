"use client"

import { useRouter } from "next/navigation";
import { useAuth } from "../../../providers/AuthProvider";

export default function Account() {

	const { signOut, authenticated, user } = useAuth()
	const router = useRouter()

	if (!authenticated) {
		router.push("/")
	}
	return (
		<div className="text-white">
			Hello {user.username}
			<button className="rounded-full bg-primary-400 py-1 px-3" type="button" onClick={signOut}>Log out</button>
		</div>
	)
}