"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Bell, Check, CheckCheck, MessageSquare, Calendar, FileText, DollarSign, Settings, X } from "lucide-react"

interface NotificationCenterProps {
  className?: string
}

export function NotificationCenter({ className }: NotificationCenterProps) {
  const [unreadCount, setUnreadCount] = useState(5)
  const [activeTab, setActiveTab] = useState("all")

  const notifications = [
    {
      id: 1,
      type: "message",
      title: "New message from Dr. Alemayehu",
      description: "Great progress on your pitch deck! Let's schedule a follow-up meeting.",
      timestamp: "2 minutes ago",
      read: false,
      avatar: "/placeholder.svg?height=40&width=40",
      actionUrl: "/messages",
    },
    {
      id: 2,
      type: "application",
      title: "Application Status Update",
      description: "Your EthioPay Solutions application has been approved for the incubation program.",
      timestamp: "1 hour ago",
      read: false,
      avatar: null,
      actionUrl: "/founder",
    },
    {
      id: 3,
      type: "booking",
      title: "Meeting Reminder",
      description: "Your meeting with Sarah Johnson is scheduled for tomorrow at 2:00 PM.",
      timestamp: "3 hours ago",
      read: true,
      avatar: "/placeholder.svg?height=40&width=40",
      actionUrl: "/bookings",
    },
    {
      id: 4,
      type: "investment",
      title: "Investment Interest",
      description: "Catalyst Fund has expressed interest in your startup. Review their proposal.",
      timestamp: "1 day ago",
      read: false,
      avatar: "/placeholder.svg?height=40&width=40",
      actionUrl: "/investor",
    },
    {
      id: 5,
      type: "system",
      title: "Resource Booking Confirmed",
      description: "Your Innovation Lab booking for December 15th has been confirmed.",
      timestamp: "2 days ago",
      read: true,
      avatar: null,
      actionUrl: "/bookings",
    },
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4 text-blue-600" />
      case "booking":
        return <Calendar className="h-4 w-4 text-green-600" />
      case "application":
        return <FileText className="h-4 w-4 text-orange-600" />
      case "investment":
        return <DollarSign className="h-4 w-4 text-purple-600" />
      case "system":
        return <Settings className="h-4 w-4 text-gray-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  const markAsRead = (notificationId: number) => {
    // In a real app, this would update the notification status via API
    console.log("Marking notification as read:", notificationId)
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    // In a real app, this would update all notifications via API
    console.log("Marking all notifications as read")
    setUnreadCount(0)
  }

  const deleteNotification = (notificationId: number) => {
    // In a real app, this would delete the notification via API
    console.log("Deleting notification:", notificationId)
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "unread") return !notification.read
    if (activeTab === "messages") return notification.type === "message"
    if (activeTab === "system") return notification.type === "system"
    return true
  })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className={`relative ${className}`}>
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notifications</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  <CheckCheck className="h-4 w-4 mr-1" />
                  Mark all read
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 mx-4 mb-4">
                <TabsTrigger value="all" className="text-xs">
                  All
                </TabsTrigger>
                <TabsTrigger value="unread" className="text-xs">
                  Unread
                </TabsTrigger>
                <TabsTrigger value="messages" className="text-xs">
                  Messages
                </TabsTrigger>
                <TabsTrigger value="system" className="text-xs">
                  System
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-0">
                <ScrollArea className="h-96">
                  <div className="space-y-1">
                    {filteredNotifications.length > 0 ? (
                      filteredNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`flex items-start space-x-3 p-4 hover:bg-muted/50 transition-colors border-l-2 ${
                            notification.read ? "border-transparent" : "border-aau-blue bg-blue-50/50"
                          }`}
                        >
                          <div className="flex-shrink-0 mt-1">
                            {notification.avatar ? (
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={notification.avatar || "/placeholder.svg"} alt="Avatar" />
                                <AvatarFallback className="bg-aau-blue text-white text-xs">
                                  {notification.title.substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                            ) : (
                              <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center">
                                {getNotificationIcon(notification.type)}
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="text-sm font-medium text-foreground">{notification.title}</h4>
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                  {notification.description}
                                </p>
                                <p className="text-xs text-muted-foreground mt-2">{notification.timestamp}</p>
                              </div>
                              <div className="flex items-center space-x-1 ml-2">
                                {!notification.read && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => markAsRead(notification.id)}
                                    className="h-6 w-6 p-0"
                                  >
                                    <Check className="h-3 w-3" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteNotification(notification.id)}
                                  className="h-6 w-6 p-0"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                        <h3 className="text-sm font-medium text-muted-foreground">No notifications</h3>
                        <p className="text-xs text-muted-foreground">You're all caught up!</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
