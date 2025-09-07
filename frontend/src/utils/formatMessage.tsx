import React from 'react';
import { linkifyText } from './linkify';

export const formatMessage = (text: string) => {
  // Split text by **bold** patterns
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  
  return parts.map((part, index) => {
    // Check if this part is bold (wrapped in **)
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2); // Remove ** from both ends
      return (
        <strong key={index} className="font-semibold text-gray-900">
          {linkifyText(boldText)}
        </strong>
      );
    }
    
    // Regular text with links
    return <span key={index}>{linkifyText(part)}</span>;
  });
};