const path = require("path");
const express = require("express");
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();
const publicHTMLdirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicHTMLdirectory));
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Rajesh",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Rajesh",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "Rajesh",
    message: "Hello this is help page",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "please provide address",
    })
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error: error,
      });
    } else {
      forecast(latitude, longitude, (error, forecast) => {
        if (error) {
          return res.send({
            error: error,
          });
        } else {
          res.send({
            forecast: forecast,
            location: location,
          })
        }
      });
    }
  });
  // res.send({
  //   forecast: "50 degrees celsius",
  //   location: req.query.address,
  // });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    message: "Help article not found",
    name: "Rajesh",
  })
})
app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    message: "Page not found",
    name: "Rajesh",
  })
})
app.listen(3000, () => {
  console.log("server is up on port 3000");
});
