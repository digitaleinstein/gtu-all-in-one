"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Bell, CheckCheck, ExternalLink, Sparkles, AlertCircle, Award, BookOpen, Clock } from "lucide-react";
import { formatTimeAgo } from "@/lib/utils";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: string;
  link?: string | null;
  isRead: boolean;
  createdAt: string;
}

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // 30s auto polling
    return () => clearInterval(interval);
  }, []);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = async () => {
    try {
      await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "markAllRead" }),
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  const markSingleRead = async (id: string) => {
    try {
      await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "markRead", id }),
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((c) => Math.max(0, c - 1));
    } catch (e) {
      console.error(e);
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "RESULT":
        return <Award className="w-4 h-4 text-emerald-500" />;
      case "EXAM":
        return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case "ACADEMIC":
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) fetchNotifications();
        }}
        className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-border bg-card/60 backdrop-blur text-foreground hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-sm shrink-0"
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4 text-foreground/80" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-[1rem] px-1 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-background animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-border bg-card shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between p-3.5 border-b border-border bg-muted/40">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">Notifications & Alerts</span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                title="Mark all as read"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          <div className="max-h-[380px] overflow-y-auto divide-y divide-border/50">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Bell className="w-8 h-8 mx-auto mb-2 text-muted-foreground/40 stroke-1" />
                <p className="text-xs font-medium">No notifications right now</p>
                <p className="text-[11px] text-muted-foreground/70 mt-0.5">
                  Result alerts and GTU updates will appear here.
                </p>
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => !item.isRead && markSingleRead(item.id)}
                  className={`p-3.5 text-xs transition-colors hover:bg-muted/40 flex gap-3 ${
                    !item.isRead ? "bg-primary/5 dark:bg-primary/10" : ""
                  }`}
                >
                  <div className="mt-0.5 p-1.5 rounded-lg bg-background border border-border shrink-0 self-start shadow-xs">
                    {getIconForType(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <p className={`font-semibold leading-snug truncate ${!item.isRead ? "text-foreground" : "text-muted-foreground"}`}>
                        {item.title}
                      </p>
                      {!item.isRead && (
                        <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="text-muted-foreground line-clamp-2 mt-1 leading-relaxed text-[11px]">
                      {item.message}
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-border/40 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTimeAgo(item.createdAt)}
                      </span>
                      {item.link && (
                        <Link
                          href={item.link}
                          onClick={() => {
                            markSingleRead(item.id);
                            setIsOpen(false);
                          }}
                          className="font-medium text-primary hover:underline flex items-center gap-0.5"
                        >
                          View Details
                          <ExternalLink className="w-2.5 h-2.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-2.5 border-t border-border bg-muted/20 text-center flex items-center justify-between px-3">
            <Link
              href="/results"
              onClick={() => setIsOpen(false)}
              className="text-xs text-primary font-medium hover:underline"
            >
              Configure Result Alerts →
            </Link>
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Preferences
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
