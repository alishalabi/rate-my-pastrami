module.exports = function (app) {
  app.get("/newsletter", (req, res) => {
    res.render("newsletter")
  })
}
