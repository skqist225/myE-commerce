const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const path = require('path');

const emailTemplate = require('../utils/emailTemplate');

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = process.env;

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendEmail(options) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const smtpTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'thuan.leminhthuan.10.2@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken,
            },
        });

        const mailOptions = {
            from: 'myE-commerce ❤❤❤ <thuan.leminhthuan.10.2@gmail.com>',
            to: options.email,
            subject: options.subject,
            html: emailTemplate(options.email),
            attachments: [
                {
                    filename: 'Logo.png',
                    path: path.join(
                        path.dirname(__dirname),
                        '/uploads/images/Logo.png'
                    ),
                    cid: 'logo',
                },
                {
                    filename: 'illo_welcome_1.png',
                    path: path.join(
                        path.dirname(__dirname),
                        '/uploads/images/illo_welcome_1.png'
                    ),
                    cid: 'thumbnail',
                },
                {
                    filename: 'bee.png',
                    path: path.join(
                        path.dirname(__dirname),
                        '/uploads/images/bee.png'
                    ),
                    cid: 'beeLogo',
                },
                {
                    filename: 'facebook2x.png',
                    path: path.join(
                        path.dirname(__dirname),
                        '/uploads/images/facebook2x.png'
                    ),
                    cid: 'facebookLogo',
                },
                {
                    filename: 'twitter2x.png',
                    path: path.join(
                        path.dirname(__dirname),
                        '/uploads/images/twitter2x.png'
                    ),
                    cid: 'twitterLogo',
                },
                {
                    filename: 'instagram2x.png',
                    path: path.join(
                        path.dirname(__dirname),
                        '/uploads/images/instagram2x.png'
                    ),
                    cid: 'instagramLogo',
                },
                {
                    filename: 'pinterest2x.png',
                    path: path.join(
                        path.dirname(__dirname),
                        '/uploads/images/pinterest2x.png'
                    ),
                    cid: 'pinterestLogo',
                },
            ],
        };

        const result = await smtpTransport.sendMail(mailOptions);

        return result;
    } catch (error) {
        return error;
    }
}

module.exports = sendEmail;
