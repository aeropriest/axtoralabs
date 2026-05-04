"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, History } from "lucide-react";
import Link from "next/link";
import { AuthDialog } from "@/components/auth-dialog";

export function UserHeader() {
  const { user, signOut, isAnonymous } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user) return "?";
    if (user.displayName) {
      return user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
    }
    return user.email ? user.email[0].toUpperCase() : "U";
  };

  return (
    <div className="w-full flex justify-between items-center py-4 px-6 border-b">
      <div className="flex items-center">
        <Link href="/" className="text-xl font-bold">
          AxarSoft
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  {user.photoURL ? (
                    <AvatarImage src={user.photoURL} alt={user.displayName || "User"} />
                  ) : null}
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                {user.displayName || user.email || "User"}
                {isAnonymous && <span className="ml-2 text-xs text-muted-foreground">(Anonymous)</span>}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/history">
                <DropdownMenuItem>
                  <History className="mr-2 h-4 w-4" />
                  <span>Conversation History</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={handleSignOut} disabled={isLoggingOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>{isLoggingOut ? "Signing out..." : "Sign out"}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button variant="outline" size="sm" onClick={() => setShowAuthDialog(true)}>
              <User className="mr-2 h-4 w-4" />
              Sign In
            </Button>
            
            <AuthDialog 
              isOpen={showAuthDialog} 
              onClose={() => setShowAuthDialog(false)} 
              onSuccess={() => setShowAuthDialog(false)} 
            />
          </>
        )}
      </div>
    </div>
  );
}
