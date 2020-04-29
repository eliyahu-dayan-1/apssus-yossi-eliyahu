// eslint-disable-next-line import/prefer-default-export
export const utilService = {
  makeId,
  getCurrencySign,
};

export function makeId(length = 3) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function getCurrencySign(currencyCode) {
  let currencySign = '';
  switch (currencyCode) {
    case 'ILS':
    default:
      currencySign = '₪';
      break;
    case 'USD':
      currencySign = '$';
      break;
    case 'EUR':
      currencySign = '€';
  }
  return currencySign;
}
