import { makeAutoObservable } from 'mobx';
import axios from 'axios';

const apiURL =
  'http://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40';
const apiURL2 = '/data.json';
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

class WeatherStore {
  showTempIn = 'F';
  weatherData = [];
  loading = false;
  isError = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggelShowTempIn() {}

  fetchWeatherReport() {
    this.loading = true;
    axios.get(apiURL2).then((res) => {
      this.reArrangeDataToSuitOurNeed(res.data);
      this.loading = false;
    });
  }

  reArrangeDataToSuitOurNeed(json) {
    // At the UI front we need data as per date base
    // Since we get data from API in intervals of 3 hours
    // We need tp process this data as raw data and
    // convert it into Date wise data
    // To do so the i am using Map object

    // Note that we get epoc time in each entry
    // I am using this epoc time and converting it into
    // Date format i.e Year Month Date
    // This combination forms the Key of the Map object
    // value of this is the 8 entries that we have for a day
    // While doing the above process we are also calculating
    // Average temperature for that day
    // the value of the key is Average day Temprature and Temperature for 3 hours

    let dateMap = new Map();

    json.list.map((data) => {
      const { dt, main } = data;

      const date = new Date(0);
      date.setUTCSeconds(dt);

      const key =
        date.getFullYear() +
        ' ' +
        months[date.getMonth()] +
        ' ' +
        date.getDate();

      let newAvgTemp = (main.temp_max + main.temp_min) / 2;
      let list = [];

      if (dateMap.has(key)) {
        let data = dateMap.get(key);
        list = data.data;
        newAvgTemp = (newAvgTemp + data.avgTemp) / 2;
      }

      list.push(data);

      dateMap.set(key, { avgTemp: newAvgTemp, data: list });
    });

    // dateMap.forEach((values, keys) => {
    //   console.log(keys, values.avgTemp);
    // });
    this.weatherData = Array.from(dateMap, ([date, value]) => ({
      date,
      value,
    }));
  }
}

export default WeatherStore;
