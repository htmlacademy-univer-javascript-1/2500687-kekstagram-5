function checkStringLength(string, length) {
  return (string.length <= length);
}

function isPalindrome (string) {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    let curSymbol = normalizedString[i];
    reversedString += curSymbol;
  }
  return (reversedString === normalizedString);
}
