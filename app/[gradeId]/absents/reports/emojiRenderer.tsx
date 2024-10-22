import React from 'react';
import { EMOJIS } from 'app/utils/common.util';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EmojiRenderer: React.FC = (props: any) => {
  const { node } = props;
  const percentage = (node.data.absents * 100) / node.data.allBells;

  const getEmoji = (value): string => {
    if (value > 40) return EMOJIS.enraged;
    if (value > 25) return EMOJIS.explodingHead;
    if (value > 10) return EMOJIS.flushedFace;
    if (value > 5) return EMOJIS.cryingFace;
    return EMOJIS.downcastFace;
  };

  return <div className="text-24 mt-1 text-center">{getEmoji(percentage)}</div>;
};

export default EmojiRenderer;
