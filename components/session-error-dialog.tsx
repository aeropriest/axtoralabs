"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface SessionErrorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  errorMessage: string;
  errorHint?: string;
}

export function SessionErrorDialog({
  isOpen,
  onClose,
  errorMessage,
  errorHint,
}: SessionErrorDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Connection Error
          </DialogTitle>
          <DialogDescription className="text-base font-medium">
            {errorMessage}
          </DialogDescription>
        </DialogHeader>
        
        {errorHint && (
          <div className="text-sm text-muted-foreground">
            <p>{errorHint}</p>
          </div>
        )}
        
        {errorMessage.includes("location") && (
          <div className="rounded-md bg-amber-50 p-4 border border-amber-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-amber-800">Location Restriction</h3>
                <div className="mt-2 text-sm text-amber-700">
                  <p>
                    OpenAI services are not available in your current location. This could be due to regional restrictions.
                  </p>
                  <ul className="list-disc pl-5 mt-2">
                    <li>Try using a VPN service to connect from a supported region</li>
                    <li>Check if your network has any restrictions</li>
                    <li>Contact support if you believe this is an error</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <DialogFooter className="sm:justify-center">
          <Button variant="default" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
