const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    console.log('Received event:', event); // Log the incoming event

    try {
        if (!event.body) {
            throw new Error('Missing request body');
        }

        const formData = JSON.parse(event.body);
        const { name, email, phone, date, time, message } = formData;

        if (!name || !email || !phone || !date || !time || !message) {
            throw new Error('Missing form fields');
        }

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
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Appointment request sent successfully' })
        };
    } catch (error) {
        console.error('Error in function:', error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to send appointment request', error: error.message })
        };
    }
};
