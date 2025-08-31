import React from 'react';

export const linkifyText = (text: string): React.ReactNode[] => {
  // Handle markdown links first
  const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)/g;
  const urlRegex = /(https?:\/\/[^\s.,!?;)]+)/g;
  
  let processedText = text;
  const links: { [key: string]: { text: string; url: string } } = {};
  let linkCounter = 0;
  
  // Replace markdown links with placeholders
  processedText = processedText.replace(markdownLinkRegex, (match, linkText, url) => {
    const placeholder = `__LINK_${linkCounter}__`;
    links[placeholder] = { text: linkText, url };
    linkCounter++;
    return placeholder;
  });
  
  // Split by URLs and placeholders
  const parts = processedText.split(/(https?:\/\/[^\s.,!?;)]+|__LINK_\d+__)/g);
  
  return parts.map((part, index) => {
    // Handle markdown link placeholders
    if (part.startsWith('__LINK_')) {
      const linkData = links[part];
      return (
        <a
          key={index}
          href={linkData.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {linkData.text}
        </a>
      );
    }
    
    // Handle plain URLs
    if (urlRegex.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline break-all"
        >
          {part}
        </a>
      );
    }
    
    return part;
  });
};