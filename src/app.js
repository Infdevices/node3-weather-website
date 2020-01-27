const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()

//Define paths for express config
const publicDirectorypath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectorypath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather', 
        name: 'vicky'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
    title: 'About me',
    name: 'vicky1'
})
})

app.get('/help', (req, res) => {
    res.render('help', {
    title: 'Help',
    name: 'vicky2'
})
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: `you must Provide an addrs`
        })
    }


    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error})
            }

res.send({
    forcast: forecastData,
    location,
    address: res.query.address
})

        })
    })
    // res.send({
    //     forecast: 'It`s snowing',
    //     location: 'india',
    //     address: req.query.address
    // })
}) 

app.get('/products' , (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: `you must provide a search term`
        })
    } 

    console.log(req.query.search)
    res.send({
       products: [] 
    })
})


app.get('/help/*', (req, res) => {
    res.send('help article not found')
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'vikram',
        errorMessage: 'page not found'
        
    })
})

app.listen(3001, () => {
    console.log('Server is up on port 3001.')
})