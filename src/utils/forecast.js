const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=855bb625ad872ae6519060e99cf4de8c&query=" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude) + "&units=f";

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connet server.', undefined);
        } else if (body.error) {
            callback(response.body.error.info, undefined);
        } else {
            callback(undefined, 
                `It is currently ${body.current.temperature} degrees out.
                It feels like ${body.current.feelslike} degrees out.
                And the weather is ${body.current.weather_descriptions}.`);
        }
    });
};

module.exports = forecast;