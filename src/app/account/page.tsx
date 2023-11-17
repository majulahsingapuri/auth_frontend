"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../../../providers/AuthProvider";

export default function Account() {
  const { authenticated } = useAuth();
  const router = useRouter();

  if (!authenticated) {
    router.replace("/");
  }

  return <div className="text-white"></div>;
}
