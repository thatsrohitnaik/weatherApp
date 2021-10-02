import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { apiURL2 } from '../settings';
import { epocToDate } from '../Util/date';

class WeatherStore {
  unit = 'F';
  report = [];
  loading = false;
  isError = false;
  errorMessage = '';

  constructor() {
    makeAutoObservable(this);
  }

  setUnit(unit) {
    this.unit = unit;
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
      const { dt, main } = report;
      const { temp_max, temp_min } = main;
      const key = epocToDate(dt);
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
