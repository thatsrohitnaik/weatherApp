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

  reStructureResponse(json) {
    let dateMap = new Map();

    json.list.map((data) => {
      const { dt, main } = data;
      const key = epocToDate(dt);
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

    this.report = Array.from(dateMap, ([date, value]) => ({
      date,
      value,
    }));
  }
}

export default WeatherStore;
