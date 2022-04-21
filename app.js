const express = require('express');
const geocode = require('./geocode')
const forecast = require('./forecast')

const PORT = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
    res.send('Home Page is here!')
})

app.get('/weather', (req, res) => {
    // res.send(req.query.city)
    const city = req.query.city;
    geocode(city, (err, {enlem, boylam, konum}) => {
        // res.send("Enlem : " + enlem + "Boylam " + boylam)
        if(err){
            return res.send(err)
        }
        forecast(enlem, boylam, (err, data) => {
            if(err) {
                return res.send(err);
            }
            const showData = {
                konum : konum,
                sicaklik : data.temperature,
                nem : data.humidity,
                hava_durumu : data.weather_descriptions[0]
            }
            res.send(showData)
        })
    })
})

app.get('/info', (req, res) => {
    const jsonData = {
        name : req.query.name,
        surname : req.query.surname,
        age : req.query.age
    }
    res.send(jsonData)
})



app.listen(PORT, () => {
    console.log('Server is up on port : ' + PORT)
})