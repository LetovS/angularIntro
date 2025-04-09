export interface IWeatherResponse{
  current: IWeatherCurrent,
  hourly: IWeatherHourly
}
export type WeatherCurrentValue = 0 | 1;

export interface IWeatherCurrent {
  is_day: WeatherCurrentValue,
  rain: WeatherCurrentValue,
  snowFall: WeatherCurrentValue
}

export interface IWeatherViewModel {
  isDay: number,
  snowFall: number,
  rain: number,
  currentWeather: number;
}

export interface ISwitchViewModel {
  coords: Coords;
  weather: IWeatherViewModel;
}

export interface IWeatherHourly{
  temperature_2m: number []
}

export type Coords = {
  latlng: [number, number];
}
