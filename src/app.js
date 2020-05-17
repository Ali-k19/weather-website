const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup Handelbars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(path.join(__dirname, '../public'))) 

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Ali'
    })
})

app.get('/about', (req,res) =>{
    res.render('about',{
        title: 'About Me',
        name: 'Ali.k'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        name: 'Ali.h.k',
        helpMessage: 'How can I help you?'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    const data = req.query.address;
geocode(data, (error, {latitude, longitude, location} = {}) => {
    if(error){
        return res.send({error})
    } else{
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
                
    res.send({
        address: req.query.address,
        location,
        forecast: forecastData
    })
            
        })
    }
})

})

app.get('/products', (req, res)=> {
    if(!req.query.search){
       return res.send({
            error: 'You must provide a search term'
        })    
    }


    console.log(req.query)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMessage: 'Help article not found',
        title: '404',
        name: 'Ali'
    })
})

app.get('*',(req, res) => {
    res.render('error', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Ali'
    })
})

app.listen(3000, ()=>{
    console.log('server is up on port 3000. ')
})