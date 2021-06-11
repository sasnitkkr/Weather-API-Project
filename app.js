const { response } = require("express");
const express = require("express");
const app = express();
const port = 3000;

// native node https module
const https = require("https");
const { send } = require("process");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){

    res.sendFile(__dirname+"/index.html");
    
})

app.post("/", (req, res) =>{
    // console.log(req.body.userInput);
    let query = req.body.userInput;
    // include https also
    let url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=f10b760a0ce0173cdb013f5d972a57df&units=metric";
    https.get(url, (response)=>{

        response.on("data", (data) => {
            
            let weatherDataObject = JSON.parse(data);

            let temp = weatherDataObject.main.temp;
            let weatherDescription = weatherDataObject.weather[0].description;
            let iconId = weatherDataObject.weather[0].icon;
            let imageURL = "http://openweathermap.org/img/wn/"+iconId+".png";
            
            res.write("<h3>Hello! "+query+"</h3>");
            res.write("<h2>Status is " + weatherDescription + "</h2>");
            res.write("<h1>Temprature is "+temp+"degree celcius</h1>");
            res.write("img<src="+imageURL+">");
            res.send();


        });

    });
});

app.listen(port, function(){
    console.log("App listening to port " + port);
})