"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import * as api from "../../../api/index";

export default function Account() {

	const router = useRouter()

	useEffect(() => {
		api
			.getMe()
			.then((res) => {
				// TODO: Do someting with the data like render account editing info
				console.log(res.data)
			})
			.catch(() => {
				router.push("/")
			})
	})

	return (
		<div>
			Account Page
		</div>
	)
}