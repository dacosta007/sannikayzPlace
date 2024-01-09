/* @Desc:
  - This help format phone number(i.e: (234) 902 4475 406)
*/

function formatPhoneNumber(str) {
  // Filter only numbers from the input
  let cleaned = (str.toString()).replace(/\D/g, '');
  let phoneNum = '';

  // check if input is less than 10 digit phone number
  if (cleaned.length < 10) {
    return null;
  }
  
  // Check if the input is of correct length(10 or 13 degits)
  let match = cleaned.length === 10 ? cleaned.match(/^(\d{3})(\d{4})(\d{3})$/) : cleaned.match(/^(\d{3})(\d{3})(\d{4})(\d{3})$/);
  
  switch (match) {
    case match[0].length === 13:
      phoneNum = `(+${match[1]}) ${match[2]} ${match[3]} ${match[4]}`
    break;

    case match[0].length === 10:
      phoneNum = `${match[1]} ${match[2]} ${match[3]} ${match[4]}`
    break;

    default:
      phoneNum = null
    break;
  }

  return phoneNum;
};

export default formatPhoneNumber;