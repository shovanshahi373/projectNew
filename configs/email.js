const sendGrid = require("@sendgrid/mail");
// if (process.env.NODE_ENV == "production") {
// }
const key = process.env.SENDGRID_API_KEY;
sendGrid.setApiKey(key);

module.exports = function(to, from, subject, html) {
  const msg = {
    to,
    from,
    subject,
    html
  };
  sendGrid
    .send(msg)
    .then(() => {
      console.log("message sent successfully");
    })
    .catch(err => console.log("message sending failed...\n" + err));
};
