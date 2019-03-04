const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");

const mailAuth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.EMAIL_DOMAIN
  }
}

const nodemailerMailgun = nodemailer.createTransport(mg(mailAuth))

module.exports = function (app) {

  app.get("/newsletter", (req, res) => {
    res.render("newsletter")
  })

  app.get("/newsletter-confirmation", (req, res) => {
    nodemailerMailgun.sendMail({
      from: 'no-reply@example.com',
      to: 'ali.shalabi@students.makeschool.com', // An array if you have multiple recipients.
      subject: 'The Daily Pickle!',
      template: {
        name: 'email.handlebars',
        engine: 'handlebars',
        // context: user
      }
      })
      .then(info => {
        console.log('Response: ' + info);
        res.redirect("newsletter-confirmation");
      })
      .catch(err => {
        console.log('Error: ' + err);
        res.redirect("newsletter-confirmation");
      })

      .catch(err => {
        console.log('Error: ' + err);
    });
  })


}
