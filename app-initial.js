const { response } = require("express");
const express = require("express");
const app = express();
const port = 3000;

// native node https module
const https = require("https");
const { send } = require("process");

app.get("/", function(req, res){
    let url = "https://api.openweathermap.org/data/2.5/weather?q=Nagpur&appid=f10b760a0ce0173cdb013f5d972a57df&units=metric";
    // passed url got response back
    https.get(url, function(response){
        // console.log(response);
        console.log(response.statusCode);

        // tap into event when we get some data and call a callback function that receives data
        response.on("data", function(data){

            // console.log(data); outputs in hexa
            // process.stdout.write(data);
            // Parse the data with JSON.parse(), and the data becomes a JavaScript object.
            let weatherDataObject = JSON.parse(data); 
            // console.log(obj);
            // console.log(obj.main.temp);
            // console.log(obj.weather[0].description)
            // send(obj[0]);
            let temp = weatherDataObject.main.temp;
            let weatherDescription = weatherDataObject.weather[0].main;
            res.write("<h1>Temprature in Nagpur is " + temp + " degree celcius.</h1>");
            res.write("<h2>Status is " + weatherDescription + "</h2>");
            let icon = weatherDataObject.weather[0].icon;
            let imgURL = "http://openweathermap.org/img/wn/" + icon +".png";
            let imageSend = "<img src="+imgURL+">";
            res.write(imageSend);
            res.send(); // send it once you have written everything you want
            // let myObj = {   --- Converting obj into string 
            //     name: "Sahil",
            //     colour: "Blue"
            // }

            // let str = JSON.stringify(myObj);
            // console.log(str);
        })
    })

    // res.send("Hi"); there should be only one send
})

app.listen(port, function(){
    console.log("App listening to port " + port);
})