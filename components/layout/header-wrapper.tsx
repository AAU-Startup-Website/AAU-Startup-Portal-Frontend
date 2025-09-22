"use client"

import { Header } from "./header"
import { useAuth } from "@/components/auth/auth-context"

export function HeaderWrapper() {
  const { user, isAuthenticated } = useAuth()

  return (
    <Header userRole={user?.role} userName={user?.name} userAvatar={user?.avatar} isAuthenticated={isAuthenticated} />
  )
}
