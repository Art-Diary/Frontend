export const checkBlankInKeyword = (text: string): boolean => {
  var blank = false;
  if (text === '') {
    blank = true;
  }
  if (text.trim() === '') {
    blank = true;
  }
  return blank;
};

export const removeControlCharacter = (text: string): string => {
  return text.replace(/[\u200E\u200F\u202A-\u202E]/g, '');
};
