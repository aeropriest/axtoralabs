import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { AuthDialog } from "@/components/auth-dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function AnonymousUserBanner() {
  const { isAnonymous } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (!isAnonymous || dismissed) {
    return null;
  }

  return (
    <>
      <Alert className="mb-4 bg-muted/50 border-muted">
        <AlertDescription className="flex items-center justify-between">
          <span>Login now to improve the answers and save your conversations</span>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setDismissed(true)}
            >
              Dismiss
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => setShowAuthDialog(true)}
            >
              Login
            </Button>
          </div>
        </AlertDescription>
      </Alert>

      <AuthDialog 
        isOpen={showAuthDialog} 
        onClose={() => setShowAuthDialog(false)} 
        onSuccess={() => {}}
      />
    </>
  );
}
