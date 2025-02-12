export const checkBlankInKeyword = (text: string): boolean => {
  const cleaned = removeControlCharacter(text);
  var blank = false;

  if (cleaned === '') {
    blank = true;
  }
  if (cleaned.trim() === '') {
    blank = true;
  }
  return blank;
};

export const removeControlCharacter = (text: string): string => {
  return text.replace(/[\u200E\u200F\u202A-\u202E]/g, '');
};
