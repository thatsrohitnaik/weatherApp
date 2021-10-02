export function convertKelvinToFahrenheit(kelvin) {
  if (undefined || null) {
    return null;
  }
  return Math.ceil(((kelvin - 273.15) * 9) / 5 + 32) + 'F';
}

export function convertKelvinToCelsius(kelvin) {
  if (undefined || null) {
    return null;
  }
  return Math.ceil(kelvin - 273.15) + 'C';
}

export const TemperatureUnits = {
  Fahrenheit: 'F',
  Celsius: 'C',
};
