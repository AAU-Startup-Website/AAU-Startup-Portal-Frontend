"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Info,
  MessageSquare,
  Users,
  CheckCheck,
  Check,
} from "lucide-react"

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(1)
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const conversations = [
    {
      id: 1,
      name: "Dr. Alemayehu Geda",
      role: "Mentor",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Great progress on your pitch deck! Let's schedule a follow-up meeting.",
      timestamp: "2 min ago",
      unread: 2,
      online: true,
      type: "direct",
    },
    {
      id: 2,
      name: "EthioPay Team",
      role: "Team Chat",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Meron: The new payment gateway integration is ready for testing",
      timestamp: "15 min ago",
      unread: 0,
      online: false,
      type: "group",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      role: "Investor",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "I'd like to discuss the Series A terms. Are you available this week?",
      timestamp: "1 hour ago",
      unread: 1,
      online: true,
      type: "direct",
    },
    {
      id: 4,
      name: "AAU Startups Portal",
      role: "System",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Your application has been approved! Welcome to the incubation program.",
      timestamp: "2 hours ago",
      unread: 0,
      online: false,
      type: "system",
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "Dr. Alemayehu Geda",
      content: "Hi Meron! I've reviewed your latest business plan. Overall, it's very impressive.",
      timestamp: "10:30 AM",
      isOwn: false,
      status: "read",
    },
    {
      id: 2,
      sender: "You",
      content: "Thank you for the feedback! I'm particularly excited about the rural expansion strategy.",
      timestamp: "10:32 AM",
      isOwn: true,
      status: "read",
    },
    {
      id: 3,
      sender: "Dr. Alemayehu Geda",
      content:
        "Yes, that's exactly what caught my attention. The market opportunity is huge, and your approach is very thoughtful.",
      timestamp: "10:35 AM",
      isOwn: false,
      status: "read",
    },
    {
      id: 4,
      sender: "You",
      content:
        "I'd love to get your thoughts on the financial projections. Do you think our growth assumptions are realistic?",
      timestamp: "10:37 AM",
      isOwn: true,
      status: "read",
    },
    {
      id: 5,
      sender: "Dr. Alemayehu Geda",
      content: "Great progress on your pitch deck! Let's schedule a follow-up meeting.",
      timestamp: "10:45 AM",
      isOwn: false,
      status: "delivered",
    },
  ]

  const selectedConversation = conversations.find((conv) => conv.id === selectedChat)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message via WebSocket
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const getMessageStatus = (status: string) => {
    switch (status) {
      case "sent":
        return <Check className="h-3 w-3 text-muted-foreground" />
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-muted-foreground" />
      case "read":
        return <CheckCheck className="h-3 w-3 text-aau-blue" />
      default:
        return null
    }
  }

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar - Conversations List */}
        <div className="w-80 border-r bg-muted/30">
          <div className="p-4 border-b">
            <h1 className="text-2xl font-bold mb-4">Messages</h1>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedChat(conversation.id)}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedChat === conversation.id ? "bg-aau-blue/10" : "hover:bg-muted/50"
                  }`}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                      <AvatarFallback className="bg-aau-blue text-white">
                        {conversation.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">{conversation.name}</h3>
                      <div className="flex items-center space-x-1">
                        {conversation.unread > 0 && (
                          <Badge className="bg-aau-blue text-white text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center">
                            {conversation.unread}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                      <div className="flex items-center space-x-1">
                        {conversation.type === "group" && <Users className="h-3 w-3 text-muted-foreground" />}
                        {conversation.type === "system" && <Info className="h-3 w-3 text-muted-foreground" />}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs mt-1">
                      {conversation.role}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b bg-background">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={selectedConversation.avatar || "/placeholder.svg"}
                        alt={selectedConversation.name}
                      />
                      <AvatarFallback className="bg-aau-blue text-white">
                        {selectedConversation.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-semibold">{selectedConversation.name}</h2>
                      <p className="text-sm text-muted-foreground">
                        {selectedConversation.online ? "Online" : "Last seen 2 hours ago"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Info className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-xs lg:max-w-md ${message.isOwn ? "order-2" : "order-1"}`}>
                        {!message.isOwn && <p className="text-xs text-muted-foreground mb-1">{message.sender}</p>}
                        <div className={`p-3 rounded-lg ${message.isOwn ? "bg-aau-blue text-white" : "bg-muted"}`}>
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <div
                          className={`flex items-center mt-1 space-x-1 ${message.isOwn ? "justify-end" : "justify-start"}`}
                        >
                          <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                          {message.isOwn && getMessageStatus(message.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t bg-background">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="pr-12"
                    />
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-aau-blue hover:bg-aau-blue/90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                <p className="text-muted-foreground">Choose a conversation from the sidebar to start messaging.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
