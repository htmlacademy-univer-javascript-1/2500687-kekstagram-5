function checkStringLength(string, length) {
  return (string.length <= length);
}
checkStringLength();

function isPalindrome (string) {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }
  return (reversedString === normalizedString);
}
isPalindrome();
