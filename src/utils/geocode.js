const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoicmFqZXNoa3VtYXIxIiwiYSI6ImNrcGx3NHlheTAxNTMyb281ZG9oaWw5a2MifQ.rXWIIpJtM_vSOcqgvooEwA&limit=1";
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to Weather service", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find your address", undefined);
    } else {
      callback(undefined, {
        location: response.body.features[0].place_name,
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
      });
    }
  });
};
module.exports = geocode;
