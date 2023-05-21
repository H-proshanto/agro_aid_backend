const { createTransport } = require('nodemailer');

const options = {
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
    service: "hotmail",
};

const transporter = createTransport(options);

const sendEmail = async (options) => {
    try{
        options.from = `"E-commerce" <${process.env.EMAIL_ADDRESS}>`;
        
        const info = await transporter.sendMail(options);

        console.log({
            messeage: "Mail sent",
            messeageId: info.messageId
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = { sendEmail };