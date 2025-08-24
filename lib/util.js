export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  const truncated = text.substring(0, maxLength).trim();
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace === -1) {
    return truncated + '...';
  }
  return truncated.substring(0, lastSpace) + '...';
};