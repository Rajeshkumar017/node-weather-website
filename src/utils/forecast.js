const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=5202bebefb1b368e72b236175c0913d8&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude) +
    "&units=m";
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${response.body.current.weather_descriptions[0]}. The temperature  is ${response.body.current.temperature} degrees celsius and it feels like ${response.body.current.feelslike} degrees celsius`
      );
    }
  });
};
module.exports = forecast;
