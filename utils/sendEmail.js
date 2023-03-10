const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const sendEmail = async (email, subject, payload, template) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        auth: {
          user: process.env.USER_NAME,
          pass: process.env.PASS_USER
        }
    });

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    const options = () => {
      return {
        from: process.env.USER_NAME,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };

    // Send email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(info);
      }
    });

    return true; // return a boolean value to indicate that the email was sent successfully
    } catch (error) {
    console.log(error); // log the error for debugging purposes
    return false; // return a boolean value to indicate that the email was not sent successfully
  }
};

/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze" },
  "./templates/layouts/main.handlebars"
);
*/

module.exports = sendEmail;
