import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    console.log(this);
    this.state = {
      // tet: props
      locationName: "",
      temperature: "",
      weather: null,
    };
    this.geolocation = this.geolocation.bind(this);
  }

  componentDidMount = (latitude, longitude) => {
    console.log('I come from componentDidMount()');
    const API_KEY = "c2208474ff924d1599bbcaf6ccb07f06";
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + parseFloat(latitude) + "&lon=" + parseFloat(longitude) + "&appid=" + API_KEY)
      .then(res => {
        console.log(res);
        if (res.ok) {
          console.log(res);
          return res.json();
        }
        else {
          // let error = new Error(`Error ${res.status} is ${res.statusText}`);
          // throw error;
        }
      }).then(data => this.setState({
        locationName: data.name,
        temperature: data.main.temp,
        weatherDescription: data.weather[0].description,
      })).catch(error => {
        console.log(error);
        alert(`Data could not be fetched ${error.message}`)
      });
  }
  geolocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let { latitude, longitude } = position.coords;
      this.componentDidMount(latitude, longitude);
    });

  }

  render() {
    console.log('I come from render()');
    // this.geolocation();
    const { locationName, temperature, weatherDescription } = this.state;
    let temperatureC = parseFloat(temperature) - 273.15;
    let temperatureF = ((parseFloat(temperature) - 273.15) * 9) / 5 + 32;
    return (
      <div className="container-fluid text-white my-auto">
        <div className="container mx-auto my-4 py-4">
          <div className="row justify-content-center text-center">
            <h1 className="col-12 display-4 my-2 py-3 text-success">
              Awesome Weather App
          </h1>
            <div>
              <h2 className="col-12">{locationName}</h2>
              <h3 className="col-12 text-danger">
                {temperature && `${temperatureC} °C / ${temperatureF} °F`}
              </h3>
              <h3 className="col-12">{weatherDescription}</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
