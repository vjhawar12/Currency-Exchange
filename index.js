import express from "express";
import bodyParser from "body-parser";
import axios from "axios"; 

const port = 3000; 
const api_key = "1d8a22844f9902c24d831ec2";  

var app = express();

app.use(express.static("public")); 
app.use(bodyParser.urlencoded({ extended: true })); 

var currencies = [
    "USD", "EUR", "JPY", "GPB", "CNY", 
    "AUD", "CAD", "CHF", "HKD", "SGD", 
    "MYR", "THB", "TWD", "PLN", "DKK",
    "ZAR", "BRL", "RUB", "INR", "KRW"
]; 


app.get("/", async (req, res) => {
    try {
        res.render("index.ejs", { 
            "currencies" : currencies, 
        }); 
    } catch (err) {
        console.log(err); 
    }
}); 

function round(value, decimalPlaces) {
    return Math.round(value * (10 ** decimalPlaces)) / (10 ** decimalPlaces); 
}

app.post("/", async (req, res) => {
    try {
        var currencyFrom = req.body["from"]; 
        var currencyTo = req.body["to"]; 
        var amount = parseInt(req.body["value"]);

        var response = await axios.get(`https://v6.exchangerate-api.com/v6/${api_key}/latest/${currencyFrom}`); 
        var rates = response.data["conversion_rates"];  

        var value = rates[currencyTo]; 
        var convertedAmount = round(amount * value, 3); 

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
