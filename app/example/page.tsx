"use client";

import { useState } from 'react';
import { EmojiReaction } from '@/components/ui/emoji-reaction';

export default function ExamplePage() {
  const [reactions, setReactions] = useState({
    thumbsUp: { count: 5, active: false },
    party: { count: 3, active: false },
    heart: { count: 0, active: false },
  });

  const handleReaction = (type: keyof typeof reactions) => {
    setReactions(prev => ({
      ...prev,
      [type]: {
        count: prev[type].active ? prev[type].count - 1 : prev[type].count + 1,
        active: !prev[type].active,
      },
    }));
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Emoji Reactions Example</h1>
      
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="prose max-w-none mb-6">
          <h2>Example Content</h2>
          <p>This is an example of how the emoji reactions look with different states and interactions.</p>
        </div>

        <div className="flex gap-2 items-center">
          <EmojiReaction
            emoji="👍"
            count={reactions.thumbsUp.count}
            isActive={reactions.thumbsUp.active}
            onClick={() => handleReaction('thumbsUp')}
          />
          <EmojiReaction
            emoji="🎉"
            count={reactions.party.count}
            isActive={reactions.party.active}
            onClick={() => handleReaction('party')}
          />
          <EmojiReaction
            emoji="❤️"
            count={reactions.heart.count}
            isActive={reactions.heart.active}
            onClick={() => handleReaction('heart')}
          />
        </div>
      </div>
    </div>
  );
} 