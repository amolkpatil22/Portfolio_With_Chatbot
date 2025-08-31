export const convertGoogleDriveUrl = (url: string, type: 'image' | 'download' = 'image'): string => {
  if (!url || !url.includes('drive.google.com')) return url;
  
  const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (!fileIdMatch) return url;
  
  const fileId = fileIdMatch[1];
  
  if (type === 'image') {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  } else {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }
};