// eslint-disable-next-line import/prefer-default-export
export const utilService = {
  makeId,
  getJsonFromUrl,
}

export function makeId(length = 3) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function getJsonFromUrl(url) {
  if (!url) url = location.search;
  var query = url.substr(1);
  var result = {};
  query.split("&").forEach(function (part) {
      var item = part.split("=");
      result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}