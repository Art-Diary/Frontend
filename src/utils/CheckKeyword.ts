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
