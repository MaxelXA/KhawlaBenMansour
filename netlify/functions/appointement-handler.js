const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    const formData = JSON.parse(event.body);
    const { name, email, phone, date, time, message } = formData;

    // Create a transporter object using your email service
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cabinetdrbenmansourkhawla@gmail.com', // your email
            pass: 'benmansour24061990'   // your email password
        }
    });

    // Set up email data
    let mailOptions = {
        from: '"Appointment Form" <cabinetdrbenmansourkhawla@gmail.com>',
        to: 'cabinetdrbenmansourkhawla@gmail.com', // list of receivers
        subject: 'New Appointment Request',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${date}\nTime: ${time}\nMessage: ${message}`
    };

    // Send mail
    try {
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Appointment request sent successfully' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to send appointment request', error: error.message })
        };
    }
};
