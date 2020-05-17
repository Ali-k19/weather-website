const request = require('request');


const forecast = (latitude,longitude,callback)=>{
    url = 'http://api.weatherstack.com/current?access_key=fba8577afab086b80ef4ed0296c5ec36&query='+ encodeURIComponent(latitude)+','+ encodeURIComponent(longitude)

    request({ url ,json: true}, (error,{body})=>{
        if(error){
            callback('Unable to connect to the internet',undefined)
        } else if(body.error){
            callback('Unable to fetch the data',undefined)
        } else{
            callback(undefined,body.current.weather_descriptions[0]+". It is currently " + body.current.temperature+ " degrees out. It feels like " + body.current.feelslike +" degrees out, with a humidity of " + body.current.humidity + '        '+'('+ 'Wind Speed: ' + body.current.wind_speed + ", " + 'Wind direction: ' + body.current.wind_dir + ')')
        }
    })
    
}

module.exports = forecast;