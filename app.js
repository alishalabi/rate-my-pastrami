const express = require("express")
const app = express()
const http = require("http")
const exphbs = require("express-handlebars")
const Yelp = require("yelp")

// var yelp = new Yelp({
//   consumer_key: "YoETtuuDdq_-aGWyTvzQAO1aM8Up4L-NoHaWI39BphK_hFJtM2n0Jyfbtm0aUNkNGDCJLirNlYo4L71WlC--Cg-wCrnCGpNArNMRwBEuws7cGNKQd4Ie6_400vvEW3Yx"
//   consumer_secret: "pkClYmkwqzFdCbvKB6Y0nA"
//   // token:
//   // token_secret:
// })

app.engine("handlebars", exphbs({defaultLayout: "main"}))
app.set("view engine", "handlebars")

// // Welcome image
// app.get("/", (req, res) =>{
//   var picUrl = "https://jbf-media.s3.amazonaws.com/production/recipe/2017/8/29/Original_19_Hot_Pastrami_Sandwich_00076%20copy.jpg"
//   res.render("welcome-pastrami", {picUrl: picUrl})
// })

app.get("/", (req, res) => {
  res.render("home")
})
// app.get("/", (req, res) => {
//   console.log(req.query.term)
//   var queryString = "San Francisco"
//   // Encode the query string to remove white spaces and restricted characters
//   var location = encodeURIComponent(queryString)
//   // Pass search location into Yelp Fusion API
//   var url = "http://api.yelp.com/v3/businesses/search?term=pastrami&location=${location}"
//
//   http.get(url, (response) => {
//     response.setEncoding("utf8")
//     var body = " "
//
//     response.on("data", (d) => {
//       body += d;
//
//     })
//     response.on("end", () => {
//       console.log(body)
//       var parsed = JSON.parse(body)
//       res.render("results", {restaurants: parsed.data})
//     })
//   })
// })

app.get("/results/:city", (req,res) => {
  var city = req.params.city;
  res.render("results", {city: city})
})


// CRUDing Users Resource

// Mock Array for testing
let users = [
  { name: "Albert", bio: "Loves Pastrami" },
  { name: "Barney", bio: "REALLY loves Pastrami" }
]

// HTTP Action: Index
app.get("/users", (req, res) => {
  res.render("users-index", { users, users})
})



app.listen(3000, (req, res) => {
  console.log("Listening at port 3000!")
})
