"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AAULoading } from "@/components/ui/aau-loading"
import { useAuth } from "@/components/auth/auth-context"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRoles?: string[]
  redirectTo?: string
}

export function AuthGuard({ children, requiredRoles = [], redirectTo = "/login" }: AuthGuardProps) {
  const router = useRouter()
  const { user, isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (loading) return
    if (!isAuthenticated) {
      router.push(redirectTo)
      return
    }
    if (requiredRoles.length && user?.role && !requiredRoles.includes(user.role)) {
      router.push("/unauthorized")
    }
  }, [loading, isAuthenticated, user?.role, requiredRoles, router, redirectTo])

  if (loading) return <AAULoading />
  if (!isAuthenticated) return <AAULoading />
  if (requiredRoles.length && user?.role && !requiredRoles.includes(user.role)) return <AAULoading />

  return <>{children}</>
}
