import React from 'react';

export const linkifyText = (text: string): React.ReactNode[] => {
  const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
  const parts = text.split(markdownLinkRegex);
  
  return parts.map((part, index) => {
    if (index % 3 === 1) {
      // This is link text
      return (
        <a
          key={index}
          href={parts[index + 1]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {part}
        </a>
      );
    }
    if (index % 3 === 2) {
      // This is URL, skip it (already used above)
      return null;
    }
    // Regular text
    return part;
  });
};