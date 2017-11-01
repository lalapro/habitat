const convertCalendar = (string) => {
  let year = string.split(' ')[0].split('-')[0]
  let month = string.split(' ')[0].split('-')[1]
  let day = string.split(' ')[0].split('-')[2]
  let hour = string.split(' ')[1].split(':')[0]
  let minute = string.split(' ')[1].split(':')[1]


  if (day.split('')[day.length-1] !== '1' && day.split('')[day.length-1] !== '2' &&
  day.split('')[day.length-1] !== '3' && Number(day) > 3) {
    day += 'th';
  } else if (day.split('')[day.length-1] === '2') {
    day += 'nd';
  } else if (day.split('')[day.length-1] === '3') {
    day += 'rd';
  } else if (day.split('')[day.length-1] === '1' && day !== '11' ) {

    day += 'st'
  }

  let newDay = undefined;
  if (day.split('')[0] === '0') {
    newDay = day.split('');
    newDay.shift();
    newDay = newDay.join('')
  }

  let converter = 'am'
  if (Number(hour) > 12) {
    hour = Number(hour) - 12;
    converter = 'pm'
  }

  day = newDay || day;

  let converted = `${Months[month]} ${day} ${year}, ${hour}:${minute} ${converter}`;
  return converted;
}

const Months = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December'
}

module.exports = convertCalendar;
