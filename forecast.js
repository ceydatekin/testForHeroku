const request = require('request');
const API_KEY = '31819cd7ef252830f88146e91246b6ff'

const forecast = (enlem, boylam, callback) => {
    const URL = 'http://api.weatherstack.com/current?access_key='+API_KEY+'&query=' + enlem + ',' + boylam + '&units=m';
    request({ url : URL, json: true}, (err, res, body) => {
        if(err){
            callback('The service is down', undefined);
        }
        // console.log(body.current)
        callback(undefined, body.current)
    })
}

module.exports = forecast