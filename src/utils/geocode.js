const request = require('request');

const geocode = (address, callback) => {
    const url = "http://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiemVybzJmdWxsIiwiYSI6ImNrYXp3OXlsdzAycWoyc3F1a3ExMWNmMDkifQ.HpxhrjCKpMirkkkrn-FvTg&limit=1";

    request({url, json: true}, (error, {body: {features: [data]}}) => {
        if(error) {
            callback('Unable to connet server.', undefined);
        } else if (!data) {
            callback('Unable to find location, please change your word for searching!', undefined);
        } else {
            callback(undefined, {
                latitude: data.center[1],
                longitude: data.center[0],
                location: data.place_name
                // latitude: response.body.features[0].center[1],
                // longitude: response.body.features[0].center[0],
                // location: response.body.features[0].place_name
            });
        }
    })
}

module.exports = geocode;