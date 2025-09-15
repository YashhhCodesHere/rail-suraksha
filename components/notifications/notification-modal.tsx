"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Bell, AlertTriangle, Clock, CheckCircle, Info, X, AlertCircle } from "lucide-react"

interface Notification {
  id: number
  title: string
  message: string
  type: "alert" | "warning" | "success" | "info"
  timestamp: Date
  isRead: boolean
  priority: "high" | "medium" | "low"
}

interface NotificationModalProps {
  notifications: Notification[]
  unreadCount: number
  onMarkAsRead: (id: number) => void
  onMarkAllAsRead: () => void
  onRemoveNotification: (id: number) => void
}

export function NotificationModal({
  notifications,
  unreadCount,
  onMarkAsRead,
  onMarkAllAsRead,
  onRemoveNotification
}: NotificationModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) {
      return `${minutes}m ago`
    } else if (hours < 24) {
      return `${hours}h ago`
    } else {
      return `${days}d ago`
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50 dark:bg-red-950/20'
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20'
      case 'low':
      default:
        return 'border-l-blue-500 bg-blue-50 dark:bg-blue-950/20'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="animate-pulse-glow bg-transparent relative hover-lift animate-bounce-in animate-delay-500 transition-all duration-200"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs animate-pulse"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[80vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-primary" />
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {unreadCount} unread
                </Badge>
              )}
            </div>
            {unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={onMarkAllAsRead}
                className="text-xs"
              >
                Mark all read
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>

        <Separator />

        <ScrollArea className="flex-1 max-h-96">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No notifications</h3>
              <p className="text-sm text-muted-foreground">
                You're all caught up! New notifications will appear here.
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`relative p-4 rounded-lg border-l-4 transition-all duration-200 hover:shadow-md cursor-pointer ${
                    !notification.isRead 
                      ? getPriorityColor(notification.priority)
                      : 'border-l-gray-300 bg-gray-50 dark:bg-gray-900/20'
                  }`}
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="flex-shrink-0 mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-sm font-semibold text-foreground">
                            {notification.title}
                          </h4>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              notification.priority === 'high' 
                                ? 'border-red-200 text-red-700 dark:border-red-800 dark:text-red-300'
                                : notification.priority === 'medium'
                                ? 'border-yellow-200 text-yellow-700 dark:border-yellow-800 dark:text-yellow-300'
                                : 'border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300'
                            }`}
                          >
                            {notification.priority} priority
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        onRemoveNotification(notification.id)
                      }}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-destructive/10 ml-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {notifications.length > 0 && (
          <>
            <Separator />
            <div className="p-4 bg-muted/30">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Total: {notifications.length} notifications</span>
                <span>Last updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}