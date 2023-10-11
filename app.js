const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// const mailchimpRouter = require('./routes/mailchimp');

const app = express();
const cors = require('cors');

const PORT = 5000; // Change this to your desired port

app.use(bodyParser.json());
app.use(cors())

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "74df6a46eabda8",
    pass: "bc4b9f038bb166"
  }
});

app.post('/send-email', (req, res) => {
  const { name, email } = req.body;

  const mailOptions = {
    from: "your-email@example.com",
    to: email,
    subject: "Subject of your email",
    text: `Hi ${name}, we're glad that you've joined our community. we're also proud of you for being interested in learning about endangered marine species. Great work, ${name} `,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});


app.use(bodyParser.json());

// ... other middleware and routes ...

// const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port heeey ${PORT}`);
});
