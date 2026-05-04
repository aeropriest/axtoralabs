import { Message } from "@/types"

interface TokenUsageDisplayProps {
  messages: Message[]
}

export function TokenUsageDisplay({ messages }: TokenUsageDisplayProps) {
  return (
    <>
    { messages.length > 0 && (
    <div className="flex items-center justify-end text-[10px] text-muted-foreground/70 py-1 px-2 tracking-tight">
      {messages
        .filter((msg) => msg.type === 'response.done')
        .slice(-1)
        .map((msg) => {
          const total = msg.response?.usage?.total_tokens || 0;
          const input = msg.response?.usage?.input_tokens || 0;
          const output = msg.response?.usage?.output_tokens || 0;
          return (
            <div key="token-usage" className="flex items-center gap-1">
              <span>{input}</span>
              <span className="opacity-40">·</span>
              <span>{output}</span>
              <span className="opacity-40">·</span>
              <span className="font-medium text-foreground/80">{total}</span>
              <span className="opacity-40 ml-0.5 tracking-normal">tokens</span>
            </div>
          );
        })}
    </div>
    )
  }
  </>
  )
} 