import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { apiURL2 } from '../settings';
import { epocToDate } from '../Util/date';
import {
  TemperatureUnits as Units,
  kelvinConverter,
} from '../Util/temperature';

class WeatherStore {
  unit = Units.Fahrenheit;
  report = [];
  loading = false;
  isError = false;
  errorMessage = '';
  selectedDayTemp = [];
  labels = [];
  graphDataset = [];

  constructor() {
    makeAutoObservable(this);
  }

  setUnit(unit) {
    this.unit = unit;
  }

  setSelectedDayTemp(value) {
    this.selectedDayTemp = value.data;
    const label = [];
    const max = [];
    const min = [];
    value.data.map((e) => {
      label.push(e.hour);
      max.push(kelvinConverter(e.main.temp_max, this.unit));
      min.push(kelvinConverter(e.main.temp_min, this.unit));
    });
    this.graphDataset = {
      labels: label,
      dataset: [
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
      //const key = epocToDate(dt);

      const [key, hour] = dt_txt.split(' ');
      const [h] = hour.split(':');

      report.hour = h;

      let currentAvgTemp = (temp_max + temp_min) / 2;

      let list = [];

      if (map.has(key)) {
        let value = map.get(key);
        list = value.data;
        currentAvgTemp = (currentAvgTemp + value.avgTemp) / 2;
      }

      list.push(report);

      map.set(key, { avgTemp: currentAvgTemp, data: list });
    });

    this.report = Array.from(map, ([date, value]) => ({
      date,
      value,
    }));
  }
}

export default WeatherStore;
