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

const calculateInMinutes = (time) => parseInt(time.split(':')[0], 10) * 60 + parseInt(time.split(':')[1], 10);
function isMeetingInWorkingHours(begginingWorkingDay, endingWorkingDay, meetingStart, meetingDuration) {
  begginingWorkingDay = calculateInMinutes(begginingWorkingDay);
  endingWorkingDay = calculateInMinutes(endingWorkingDay);
  meetingStart = calculateInMinutes(meetingStart);
  if (meetingStart < begginingWorkingDay || meetingStart > endingWorkingDay) { //не укладываемся, если время начала встречи раньше начала рабочего дня или позже конца рабочего дня
    return false;
  } else if (meetingStart + meetingDuration > endingWorkingDay) { //также не укладываемся, если время конца встречи позже времени конца рабочего дня
    return false;
  }
  return true; //во всех остальных случаях укладываемся
}
isMeetingInWorkingHours('08:00', '17:30', '14:00', 90);
isMeetingInWorkingHours('8:0', '10:0', '8:0', 120);
isMeetingInWorkingHours('08:00', '14:30', '14:00', 90);
isMeetingInWorkingHours('14:00', '17:30', '08:0', 90);
isMeetingInWorkingHours('8:00', '17:30', '08:00', 900);
