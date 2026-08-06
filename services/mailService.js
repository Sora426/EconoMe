const nodemailer = require("nodemailer");
console.log("SMTP_HOST =", process.env.SMTP_HOST);
console.log("SMTP_PORT =", process.env.SMTP_PORT);
console.log("SMTP_USER =", process.env.SMTP_USER);
console.log("EMAIL_FROM =", process.env.EMAIL_FROM);
const transporter = nodemailer.createTransport({

    host: process.env.SMTP_HOST,

    port: Number(process.env.SMTP_PORT),

    secure: false,

    auth: {

        user: process.env.SMTP_USER,

        pass: process.env.SMTP_PASS

    }

});

console.log(transporter.options);
module.exports = transporter;