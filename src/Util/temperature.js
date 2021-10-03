export const TemperatureUnits = {
  Fahrenheit: 'F',
  Celsius: 'C',
};

export function convertKelvinToFahrenheit(kelvin) {
  if (undefined || null) {
    return null;
  }
  return Math.ceil(((kelvin - 273.15) * 9) / 5 + 32);
}

export function convertKelvinToCelsius(kelvin) {
  if (undefined || null) {
    return null;
  }
  return Math.ceil(kelvin - 273.15);
}

export function kelvinConverter(kelvin, convertTo) {
  switch (convertTo) {
    case TemperatureUnits.Fahrenheit:
      return convertKelvinToFahrenheit(kelvin);
    case TemperatureUnits.Celsius:
      return convertKelvinToCelsius(kelvin);
    default:
      return kelvin;
  }
}

export function getUnits(unit) {
  switch (unit) {
    case TemperatureUnits.Fahrenheit:
      return '°F';
    case TemperatureUnits.Celsius:
      return '°C';
    default:
      return unit;
  }
}
