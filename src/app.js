const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// set up handlebars engine and views locaion
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
            title: 'Weahter',
            name: 'John'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'John'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'John',
        message: 'this is help page'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must include address.'
        });
    }

    geocode(req.query.address, (error, geoData) => {
        if (error) {
            return res.send({error});
        } else {
            forecast(geoData.latitude, geoData.longitude, (error, forecastData) => {
                if(error) {
                    return res.send({error});
                } else {
                    return res.send({
                        address: req.query.address,
                        location: geoData.location,
                        forecast: forecastData
                    });
                }
            });
        }
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'John',
        errorMessage: 'Help article not found!'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'John',
        errorMessage: 'Page not found!'
    })
})

app.listen(port, () => {
    console.log('Server up on port ' + port + '!');
});