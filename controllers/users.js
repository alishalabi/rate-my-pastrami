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
    const page = req.query.page || 1
    User.paginate({}, {page: page})
      .then((results) => {
        // var i = 1
        res.render('users-index', { users: results.docs, pagesCount: results.pages, currentPage: page });
  })
      .catch(err => {
        console.log(err)
      })
  })

  app.get("/users/search", (req, res) => {
    term = new RegExp(req.query.term, "i")

    User.find({"name": term})
      .exec((err, users) => {
        res.render("users-index", { users })
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
