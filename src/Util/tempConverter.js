export function convertKelvinToFahrenheit(kelvin) {
  if (undefined || null) {
    return null;
  }
  return ((kelvin - 273.15) * 9) / 5 + 32;
}

export function convertKelvinToCelsius(kelvin) {
  if (undefined || null) {
    return null;
  }
  return kelvin - 273.15;
}
