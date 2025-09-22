"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Paperclip, MoreVertical, Reply, Check, CheckCheck } from "lucide-react"

interface Message {
  id: number
  sender: string
  content: string
  timestamp: string
  isOwn: boolean
  status: "sent" | "delivered" | "read"
  mentions?: string[]
  attachments?: string[]
}

interface MessageThreadProps {
  messages: Message[]
  onSendMessage: (content: string) => void
  threadTitle: string
  participants: string[]
}

export function MessageThread({ messages, onSendMessage, threadTitle, participants }: MessageThreadProps) {
  const [newMessage, setNewMessage] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage)
      setNewMessage("")
      setReplyingTo(null)
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

  const formatMessageContent = (content: string, mentions?: string[]) => {
    if (!mentions) return content

    let formattedContent = content
    mentions.forEach((mention) => {
      formattedContent = formattedContent.replace(
        `@${mention}`,
        `<span class="bg-aau-blue/10 text-aau-blue px-1 rounded">@${mention}</span>`,
      )
    })

    return <span dangerouslySetInnerHTML={{ __html: formattedContent }} />
  }

  return (
    <div className="flex flex-col h-full">
      {/* Thread Header */}
      <div className="p-4 border-b bg-muted/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">{threadTitle}</h3>
            <p className="text-sm text-muted-foreground">
              {participants.length} participants: {participants.join(", ")}
            </p>
          </div>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs lg:max-w-md ${message.isOwn ? "order-2" : "order-1"}`}>
                {!message.isOwn && (
                  <div className="flex items-center space-x-2 mb-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg" alt={message.sender} />
                      <AvatarFallback className="bg-aau-blue text-white text-xs">
                        {message.sender.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-xs text-muted-foreground">{message.sender}</p>
                  </div>
                )}
                <div className={`p-3 rounded-lg ${message.isOwn ? "bg-aau-blue text-white" : "bg-muted"}`}>
                  <div className="text-sm">{formatMessageContent(message.content, message.mentions)}</div>
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {message.attachments.map((attachment, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <Paperclip className="h-3 w-3 mr-1" />
                          {attachment}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <div className={`flex items-center mt-1 space-x-1 ${message.isOwn ? "justify-end" : "justify-start"}`}>
                  <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                  {message.isOwn && getMessageStatus(message.status)}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setReplyingTo(message.id)}
                    className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100"
                  >
                    <Reply className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Reply Indicator */}
      {replyingTo && (
        <div className="px-4 py-2 bg-muted/50 border-t">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Replying to {messages.find((m) => m.id === replyingTo)?.sender}
            </p>
            <Button variant="ghost" size="sm" onClick={() => setReplyingTo(null)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="p-4 border-t bg-background">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Paperclip className="h-4 w-4" />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="Type a message... Use @username to mention"
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
        <p className="text-xs text-muted-foreground mt-2">Press Enter to send • Use @username to mention someone</p>
      </div>
    </div>
  )
}
