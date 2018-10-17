const User = require("../models/user")

module.exports = function (app) {

  // CRUDing Users Resource

  // Mock Array for testing
  // let users = [
  //   { name: "Albert", bio: "Loves Pastrami" },
  //   { name: "Barney", bio: "REALLY loves Pastrami" }
  // ]

  // HTTP Action: Index
  app.get("/users", (req, res) => {
    User.find()
      .then(users => {
        res.render("users-index", { users, users})
      })
      .catch(err => {
        console.log(err)
      })
  })

  // HTTP Action: New
  app.get("/users/new", (req, res) => {
    res.render("users-new", {})
  })

  // HTTP Action: Create
  app.post("/users", (req, res) => {
    User.create(req.body)
      .then((user) => {
        // console.log(user)
        res.redirect(`/users/${user._id}`)
      }).catch((err) => {
        console.log(err.message)
      })
  })

  // HTTP Action: Show
  app.get("/users/:id", (req, res) => {
    User.findById(req.params.id)
      .then(user => {
        res.render("users-show", { user: user })
      }).catch((err) => {
        console.log(err.message)
      })
  })

  // HTTP Action: Edit
  app.get("/users/:id/edit", (req, res) => {
    User.findById(req.params.id, function(err, user) {
      res.render("users-edit", { user: user })
    })
  })

  // HTTP Action: Update
  app.put("/users/:id", (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
      .then(user => {
        res.redirect(`/users/${user._id}`)
      })
      .catch(err => {
        console.log(err.message)
      })
  })

  // HTTP Action: Delete
  app.delete("/users/:id", function(req, res) {
    console.log("DELETE user")
    User.findByIdAndRemove(req.params.id)
      .then((user) => {
        res.redirect("/users")
      }).catch((err) => {
        console.log(err.message)
      })
  })


}
