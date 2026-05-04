import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { useTranslations } from "@/components/translations-context";
import { SessionErrorDialog } from "@/components/session-error-dialog";

import "./broadcast-button.css";

interface BroadcastButtonProps {
  isSessionActive: boolean
  onClick: () => void
  sessionStatus?: string
  sessionError?: string
  showErrorDialog?: boolean
  onErrorDialogClose?: () => void
}

export function BroadcastButton({ 
  isSessionActive, 
  onClick, 
  sessionStatus, 
  sessionError,
  showErrorDialog: externalShowErrorDialog,
  onErrorDialogClose
}: BroadcastButtonProps) {
  const { t } = useTranslations();
  const [internalShowErrorDialog, setInternalShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorHint, setErrorHint] = useState('');
  
  // Use either external or internal error dialog state
  const showErrorDialog = externalShowErrorDialog !== undefined ? externalShowErrorDialog : internalShowErrorDialog;
  
  // Monitor session status for errors
  useEffect(() => {
    if (sessionError && sessionError.length > 0) {
      setErrorMessage(sessionError);
      
      // Set helpful hints based on error type
      if (sessionError.toLowerCase().includes('location') || 
          sessionError.toLowerCase().includes('country') || 
          sessionError.toLowerCase().includes('region') || 
          sessionError.toLowerCase().includes('territory')) {
        setErrorHint('Try using a VPN service to connect from a supported region.');
      } else if (sessionError.includes('API key')) {
        setErrorHint('Check your OpenAI API key configuration.');
      } else {
        setErrorHint('Please try again later or contact support.');
      }
      
      // Only set internal state if external state is not provided
      if (externalShowErrorDialog === undefined) {
        setInternalShowErrorDialog(true);
      }
    }
  }, [sessionError, externalShowErrorDialog]);
  
  const handleClick = () => {
    onClick();
  };

  const handleErrorDialogClose = () => {
    if (onErrorDialogClose) {
      onErrorDialogClose();
    } else {
      setInternalShowErrorDialog(false);
    }
  };

  return (
    <>
      <Button
        variant={isSessionActive ? "destructive" : "default"}
        size="lg"
        className={`
          h-48 w-48 rounded-full text-lg font-medium 
          flex flex-col items-center justify-center gap-1
          transition-all duration-300
          ${isSessionActive ? '[animation:subtle-pulse_2s_ease-in-out_infinite] bg-destructive/80' : 'hover:scale-105'}
          [--pulse-scale:1.02]
        `}
        onClick={handleClick}
        disabled={sessionStatus === 'Error' || sessionStatus?.includes('Error')}
      >
        <span className="text-2xl">
          {isSessionActive ? '🤫' : sessionStatus === 'Error' ? '⚠️' : '🎤'}
        </span>
        <span className="text-sm">
          {isSessionActive 
            ? t('broadcast.end') 
            : sessionStatus === 'Error' 
              ? 'Connection Error' 
              : t('broadcast.start')}
        </span>
        {sessionStatus && sessionStatus !== 'Error' && sessionStatus !== 'Session stopped' && !isSessionActive && (
          <span className="text-xs opacity-75 mt-1">{sessionStatus}</span>
        )}
      </Button>

      <SessionErrorDialog
        isOpen={showErrorDialog}
        onClose={handleErrorDialogClose}
        errorMessage={errorMessage || 'Connection Error'}
        errorHint={errorHint}
      />
    </>
  )
} 