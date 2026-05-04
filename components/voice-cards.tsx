import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useTranslations } from "@/components/translations-context"

interface VoiceCardsProps {
  value: string;
  onValueChange: (value: string) => void;
}

interface Voice {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export function VoiceCards({ value, onValueChange }: VoiceCardsProps) {
  const { t } = useTranslations();

  const voices: Voice[] = [
    {
      id: "alloy",
      name: t('alloy') || "Alloy",
      description: "Versatile and balanced",
      icon: "⚙️"
    },
    {
      id: "ash",
      name: t('ash') || "Ash",
      description: "Gentle and measured",
      icon: "🌫️"
    },
    {
      id: "ballad",
      name: t('ballad') || "Ballad",
      description: "Melodic and expressive",
      icon: "🎵"
    },
    {
      id: "coral",
      name: t('coral') || "Coral",
      description: "Warm and inviting",
      icon: "🐚"
    },
    {
      id: "echo",
      name: t('echo') || "Echo",
      description: "Resonant and clear",
      icon: "🔊"
    },
    {
      id: "sage",
      name: t('sage') || "Sage",
      description: "Wise and thoughtful",
      icon: "🧠"
    },
    {
      id: "shimmer",
      name: t('shimmer') || "Shimmer",
      description: "Light and melodic",
      icon: "🌈"
    },
    {
      id: "verse",
      name: t('verse') || "Verse",
      description: "Poetic and rhythmic",
      icon: "📜"
    }
  ];

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex gap-4 px-2 justify-center">
        {voices.map((voice) => (
          <motion.div
            key={voice.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card 
              className={`w-[140px] cursor-pointer transition-all ${
                value === voice.id 
                  ? "bg-primary/10 dark:bg-primary/20" 
                  : "hover:bg-muted"
              }`}
              onClick={() => onValueChange(voice.id)}
            >
              <CardContent className="p-4 flex flex-col items-center gap-2 text-center">
                <span className="text-4xl">{voice.icon}</span>
                <div>
                  <h3 className="font-bold">{voice.name}</h3>
                  <p className="text-xs text-muted-foreground">{voice.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
