import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider {

  apiKey = '5f386d0eea792de8e4b3a55cbe7680e4';
  url;

  constructor(public http: HttpClient) {
    console.log('Hello WeatherProvider Provider');
  }

  currentWeather(lon: number, lat: number): Observable<any> {
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${this.apiKey}`);
  }

}
