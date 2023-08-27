import express from "express";
import bodyParser from "body-parser";
import axios from "axios"; 

const port = 3000; 
var app = express();
const api_key = "1d8a22844f9902c24d831ec2";  

app.use(express.static("public")); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/", async (req, res) => {
    try {
        var response = await axios.get(`https://v6.exchangerate-api.com/v6/${api_key}/latest/USD`); 
        var rates = response.data["conversion_rates"]; 
        // console.log(rates); 
        var currencies = Object.keys(rates).slice(0, 20); 
        console.log(currencies); 
        res.render("index.ejs", { "currencies" : currencies }); 
    } catch (err) {
        console.log(err); 
    }
}); 

app.post("/submit", async (req, res) => {
    try {
        var response = await axios.get(`https://v6.exchangerate-api.com/v6/${api_key}/latest/USD`); 
        var rates = response.data["conversion_rates"]; 
        // console.log(rates); 
        var currencies = Object.keys(rates).slice(0, 20); 
        console.log(currencies); 
        res.render("index.ejs", { "currencies" : currencies }); 
    } catch (err) {
        console.log(err); 
    }
}); 

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`); 
}); 