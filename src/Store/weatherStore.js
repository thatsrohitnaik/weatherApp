import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { apiURL2 } from '../settings';
import { epocToDate } from '../Util/date';
import {
  TemperatureUnits as Units,
  kelvinConverter,
} from '../Util/temperature';

class WeatherStore {
  unit = Units.Celsius;
  report = [];
  loading = false;
  isError = false;
  errorMessage = '';
  selectedDay = [];
  graphDataset = [];
  city = {};
  currentSildeIndex = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setUnit(unit) {
    this.unit = unit;
    this.selectedDay.length && this.setSelectedDay(this.selectedDay);
  }

  setSelectedDay(value, index) {
    this.selectedDay = value;
    this.currentSildeIndex = index;
    const label = [];
    const max = [];
    const min = [];
    value.map((e) => {
      label.push(e.hour);
      max.push(kelvinConverter(e.main.temp_max, this.unit));
      min.push(kelvinConverter(e.main.temp_min, this.unit));
    });
    this.graphDataset = {
      labels: label,
      datasets: [
        { label: 'max', data: max, backgroundColor: 'green' },
        { label: 'min', data: min, backgroundColor: 'orange' },
      ],
    };
  }

  fetchWeatherReport() {
    this.loading = true;
    this.isError = false;
    this.errorMessage = '';
    axios
      .get(apiURL2)
      .then((res) => {
        this.city = res.data.city;
        this.reStructureResponse(res.data);
        this.loading = false;
      })
      .catch(() => {
        this.isError = true;
        this.errorMessage =
          'There was a error while fetching data. Please click refresh to try again';
      });
  }

  reStructureResponse(response) {
    let map = new Map();

    response.list.map((report) => {
      const { dt, main, dt_txt } = report;
      const { temp_max, temp_min } = main;
      const [key, hour] = dt_txt.split(' ');

      let currentAvgTemp = (temp_max + temp_min) / 2;

      let list = [];

      if (map.has(key)) {
        let value = map.get(key);
        list = value.data;
        currentAvgTemp = (currentAvgTemp + value.avgTemp) / 2;
      }

      report.hour = hour.substr(0, hour.lastIndexOf(':'));

      list.push(report);

      map.set(key, { avgTemp: currentAvgTemp, data: list });
    });

    this.report = Array.from(map, ([date, value]) => ({
      date,
      value,
    }));

    this.setSelectedDay(this.report[0].value.data, 0);
  }
}

export default WeatherStore;
