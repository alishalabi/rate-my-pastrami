// Allow Hidden Leys
require("dotenv").config()

// Middleware
const express = require("express")
const http = require("http")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")
const yelp = require("yelp-fusion")
const client = yelp.client("YoETtuuDdq_-aGWyTvzQAO1aM8Up4L-NoHaWI39BphK_hFJtM2n0Jyfbtm0aUNkNGDCJLirNlYo4L71WlC--Cg-wCrnCGpNArNMRwBEuws7cGNKQd4Ie6_400vvEW3Yx")
const helper = require("handlebars-helpers")()


// Starting up express
const app = express()


// Installing MongoDB:
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/rate-my-pastrami")



const timesHelper = function(n, block) {
                         let accum = "";
                         for(var i = 1; i <= n; ++i)
                           accum += block.fn(i);
                         return accum;
                       };

const hbs = exphbs.create({
  defaultLayout: "main",
  helpers: {
    times: timesHelper
  }
})



// Sample newsletter recipient to test mailgun
const user = {
  email: "ali.shalabi@students.makeschool.com",
  name: 'Ali Baba',
  bio: 'Loves Pastrami!'
}



app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

//Controllers
const users = require("./controllers/users")(app)
const newsletter = require("./controllers/newsletter")(app)


// nodemailerMailgun.sendMail({
//   from: 'no-reply@ratemypastrami.com',
//   to: user.email, // An array if you have multiple recipients.
//   subject: 'The Daily Pickle',
//   template: {
//     // TODO: clean up path fpr email.handlebars (put in views)
//     name: 'email.handlebars',
//     engine: 'handlebars',
//     context: user
//   }
// })
// .then(info => {
//   console.log('Response: ' + info);
// })
// .catch(err => {
//   console.log('Error: ' + err);
// })
// // Welcome image
// app.get("/", (req, res) =>{
//   var picUrl = "https://jbf-media.s3.amazonaws.com/production/recipe/2017/8/29/Original_19_Hot_Pastrami_Sandwich_00076%20copy.jpg"
//   res.render("welcome-pastrami", {picUrl: picUrl})
// })

app.get("/", (req, res) => {
  var city = req.query.city;
  if (city !== undefined) {
    client.search({
    term:'Pastrami',
    location: city
  }).then(response => {
    var biz = response.jsonBody.businesses;
    res.render("results", {businesses: biz, city: city})
  }).catch(e => {
    console.log(e);
  });
}
else {
  res.render("home")
}
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

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("Listening at port 3000!")
})
