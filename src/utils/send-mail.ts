import nodemailer from "nodemailer";

const sendEmail = ({
  subject,
  text,
  html,
  email,
}: {
  subject: string;
  text: string;
  html: string;
  email?: string;
}) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    secure: process.env.EMAIL_SECURE === "true",
    port: parseInt(process.env.EMAIL_PORT!),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email || process.env.TO_EMAIL,
    subject,
    text,
    html,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.error(err);
    else console.log("Email sent: " + info.response);
  });
};

export default sendEmail;
