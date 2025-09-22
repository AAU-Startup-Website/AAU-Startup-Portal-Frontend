"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

interface Toast {
  id: string
  type: "success" | "error" | "info" | "warning"
  title: string
  description?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastNotificationsProps {
  className?: string
}

export function ToastNotifications({ className }: ToastNotificationsProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  // Mock function to add toasts - in real app this would be triggered by WebSocket events
  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { ...toast, id }
    setToasts((prev) => [...prev, newToast])

    // Auto remove after duration
    if (toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id)
      }, toast.duration || 5000)
    }
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const notifications = [
        {
          type: "success" as const,
          title: "Application Approved",
          description: "Your startup application has been approved for the incubation program!",
        },
        {
          type: "info" as const,
          title: "New Message",
          description: "Dr. Alemayehu sent you a message about your pitch deck.",
          action: {
            label: "View",
            onClick: () => console.log("Navigate to messages"),
          },
        },
        {
          type: "warning" as const,
          title: "Meeting Reminder",
          description: "Your investor meeting starts in 15 minutes.",
        },
      ]

      // Randomly show a notification every 10-30 seconds
      if (Math.random() > 0.7) {
        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)]
        addToast(randomNotification)
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const getToastIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "info":
        return <Info className="h-5 w-5 text-blue-600" />
      default:
        return <Info className="h-5 w-5 text-gray-600" />
    }
  }

  const getToastStyles = (type: string) => {
    switch (type) {
      case "success":
        return "border-l-4 border-l-green-500 bg-green-50"
      case "error":
        return "border-l-4 border-l-red-500 bg-red-50"
      case "warning":
        return "border-l-4 border-l-yellow-500 bg-yellow-50"
      case "info":
        return "border-l-4 border-l-blue-500 bg-blue-50"
      default:
        return "border-l-4 border-l-gray-500 bg-gray-50"
    }
  }

  if (toasts.length === 0) return null

  return (
    <div className={`fixed top-4 right-4 z-50 space-y-2 ${className}`}>
      {toasts.map((toast) => (
        <Card key={toast.id} className={`w-96 shadow-lg ${getToastStyles(toast.type)}`}>
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">{getToastIcon(toast.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900">{toast.title}</h4>
                    {toast.description && <p className="text-sm text-gray-600 mt-1">{toast.description}</p>}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeToast(toast.id)} className="h-6 w-6 p-0 ml-2">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {toast.action && (
                  <div className="mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast.action?.onClick()
                        removeToast(toast.id)
                      }}
                      className="text-xs"
                    >
                      {toast.action.label}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
