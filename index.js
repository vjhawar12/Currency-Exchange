import express from "express";
import bodyParser from "body-parser";
import axios from "axios"; 

const port = 3000; 
var app = express();
const api_key = "1d8a22844f9902c24d831ec2";  

app.use(express.static("public")); 
app.use(bodyParser.urlencoded({ extended: true })); 

function call(from) {
    return `https://v6.exchangerate-api.com/v6/${api_key}/latest/${from}`
}

function getIndex(array, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == value) {
            return i;
        }
    }
    return -1; 
}

app.get("/", async (req, res) => {
    try {
        var response = await axios.get(call("USD")); 
        var rates = response.data["conversion_rates"]; 
        var currencies = Object.keys(rates).slice(0, 20); 
        res.render("index.ejs", { "currencies" : currencies }); 
    } catch (err) {
        console.log(err); 
    }
}); 

app.post("/submit", async (req, res) => {
    try {
        console.log(req.body); 
        var currencyFrom = req.body["currency"][0]; 
        var currencyTo = req.body["currency"][1]; 
        var amount = parseInt(req.body["amount"]);


        var response = await axios.get(call(currencyFrom)); 
        var rates = response.data["conversion_rates"]; 
        var currencies = Object.keys(rates).slice(0, 20); 
        var values = Object.values(rates).slice(0, 20); 

        console.log(currencies); 
        console.log(currencyTo); 
        
        var indexOfCurrency = getIndex(currencies, currencyTo); 
        var convertedAmount = amount * parseInt(values[indexOfCurrency]); 

        console.log(convertedAmount); 

        res.render("index.ejs", { 
            "currencies" : currencies, 
            "convertedAmount" : convertedAmount, 
        }); 

    } catch (err) {
        console.log(err); 
    }
}); 

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`); 
}); 
