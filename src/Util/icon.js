const baseUrl = 'https://openweathermap.org/img/wn/';
export function getIcon(code) {
  return baseUrl + code + '@2x.png';
}
