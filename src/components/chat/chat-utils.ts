export const formatToolTitle = (toolName: string) =>
  toolName.replace(/[_-]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
