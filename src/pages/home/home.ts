import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';

import moment from 'moment';

import { Camera, CameraOptions } from '@ionic-native/camera';

//import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  latitude;
  longitude;
  weatherInfo;
  cityName;
  location;
  bgImage;

  cities = [
    {name: "Chihuahua", latitude: 28.6028598, longitude:-106.1754819},
    {name: "Cuauhtemoc", latitude: 28.3969315, longitude:-106.8988611},
    {name: "Mexico City", latitude: 19.3660656, longitude:-99.182763},

  ];
  city;
  constructor(
    public navCtrl: NavController,
    public weatherProvider: WeatherProvider,
    //private geolocation: Geolocation,
    private camera: Camera
  ) {

  }

  ngAfterViewInit(){
      this.latitude = this.cities[1].latitude;
      this.longitude = this.cities[1].longitude;
      this.onFingWeather();
    }

    onChange(city){
      console.log("onChange", city);
      this.latitude = city.latitude;
      this.longitude = city.longitude;
      this.onFingWeather();
    }

    onFingWeather(){
      this.weatherProvider.currentWeather(this.longitude, this.latitude).subscribe(res => {
          console.log(res)
          this.weatherInfo = res;
          this.cityName = this.weatherInfo.name;
          this.bgImage = this.BgImage(this.weatherInfo.weather[0].main);
          this.location = {
            id: this.weatherInfo.id,
            icon: `http://openweathermap.org/img/w/${this.weatherInfo.weather[0].icon}.png`,
            current: this.weatherInfo,
          }
        });
    }

    GetDay = (time: number) => {
        let day = new Date(time*1000).toISOString();
        let d = new Date(day);
        let weekday = [];
        weekday[0] = "Sun";
        weekday[1] = "Mon";
        weekday[2] = "Tues";
        weekday[3] = "Wed";
        weekday[4] = "Thurs";
        weekday[5] = "Fri";
        weekday[6] = "Sat";

        let n = weekday[d.getDay()];
        return n;
    }

    GetDate = (time: number) => {
        let day = moment(time*1000).format("DD/MM");
        return day;
    }

    windDirection = (deg) => {
        if (deg > 11.25 && deg < 33.75){
          return "NNE";
        }else if (deg > 33.75 && deg < 56.25){
          return "ENE";
        }else if (deg > 56.25 && deg < 78.75){
          return "E";
        }else if (deg > 78.75 && deg < 101.25){
          return "ESE";
        }else if (deg > 101.25 && deg < 123.75){
          return "ESE";
        }else if (deg > 123.75 && deg < 146.25){
          return "SE";
        }else if (deg > 146.25 && deg < 168.75){
          return "SSE";
        }else if (deg > 168.75 && deg < 191.25){
          return "S";
        }else if (deg > 191.25 && deg < 213.75){
          return "SSW";
        }else if (deg > 213.75 && deg < 236.25){
          return "SW";
        }else if (deg > 236.25 && deg < 258.75){
          return "WSW";
        }else if (deg > 258.75 && deg < 281.25){
          return "W";
        }else if (deg > 281.25 && deg < 303.75){
          return "WNW";
        }else if (deg > 303.75 && deg < 326.25){
          return "NW";
        }else if (deg > 326.25 && deg < 348.75){
          return "NNW";
        }else{
          return "N";
        }
    }

    BgImage = (val) => {
      //let val = this.navParams.get("weatherInfo")
      if(val == "Rain"){
        return './assets/imgs/rain.jpg';
      } else if(val == "Clear"){
        return './assets/imgs/clear.jpg';
      } else if(val == "Clouds"){
        return './assets/imgs/clouds.jpg';
      } else if(val == "Drizzle"){
        return './assets/imgs/drizzle.jpg';
      } else if(val == "Snow"){
        return './assets/imgs/snow.jpg';
      } else if(val == "ThunderStorm"){
        return './assets/imgs/thunder.jpg';
      } else {
        return './assets/imgs/clear.jpg';
      }
    }


}
