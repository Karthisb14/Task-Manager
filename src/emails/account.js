const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to:  email,
        from: 'karthikeyanvj.kk@gmail.com',
        subject: 'Welcome to Kirikalan Show',
        text: `Welcome to Kirikalam Show, ${name}. Hope You Have wonderfully Today`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from:'karthikeyanvj.kk@gmail.com',
        subject:'Cancellation Show ',
        text: `Sorry to Bother You ${name}. May I know Reason for Cancelled Your Account, and Hope we will do Better`
    })
}
module.exports ={
   sendWelcomeEmail,
   sendCancellationEmail
}
