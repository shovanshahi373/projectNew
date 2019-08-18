const sendGrid = require("@sendgrid/mail");
sendGrid.setApiKey(
  "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"
);

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
