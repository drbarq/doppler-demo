import React from 'react';
import { cn } from "@/lib/utils";

interface EmojiReactionProps {
  emoji: string;
  count: number;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const EmojiReaction = ({
  emoji,
  count,
  isActive = false,
  onClick,
  className,
}: EmojiReactionProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1.5 rounded-full transition-all",
        "text-sm font-medium",
        "hover:scale-105 active:scale-95",
        isActive
          ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200",
        className
      )}
    >
      <span className="text-base leading-none">{emoji}</span>
      <span className="leading-none">{count}</span>
    </button>
  );
}; 