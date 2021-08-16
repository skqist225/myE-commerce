const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const path = require('path');

const emailTemplate = require('../utils/emailTemplate');
// const { CLIENT_SECRET, REDIRECT_URI,CLIENT_ID,REFRESH_TOKEN } = process.env;

const CLIENT_SECRET = 'l_RDniKNXqGKVqb6awWsjDQg';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const CLIENT_ID =
    '503314583762-bcpm6ocsci7ni3p931ms0tetuh53j3ji.apps.googleusercontent.com';

const REFRESH_TOKEN =
    '1//04Mx-Hlqq-ut7CgYIARAAGAQSNwF-L9IryOof-HoUFZkT4JLsm0WuiCRlVaRMfHp1k0KA5Q5gmPwu7RWEVgaLsBRtCH0dx6w0p40';

// const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendEmail(options) {
    try {
        // const accessToken = await oAuth2Client.getAccessToken();

        const smtpTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'thuan.leminhthuan.10.2@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken:
                    'ya29.a0ARrdaM8cF4CywKRS0gyMbp8-r53tcu_sREAV2A9yRU1wDytrvepfVUCJ_TAKkGAaYdlBMesTOlFWLFD3jJvPSPd7P9hbd1RZlSWUgtBHEiYikMr-ROObQsVyM2YsbxxBweqmGaJQT-PxQMm5WfIZ9wCaqaRJ',
            },
        });

        const mailOptions = {
            from: 'skqist2205 ❤❤❤ <thuan.leminhthuan.10.2@gmail.com>',
            to: options.email,
            subject: 'Email with no subject',
            html: emailTemplate,
            attachments: [
                {
                    filename: 'Logo.png',
                    path: path.join(path.dirname(__dirname), '/uploads/images/Logo.png'),
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
                    path: path.join(path.dirname(__dirname), '/uploads/images/bee.png'),
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

        return new Promise((resolve, reject) => {
            resolve(result);
        });
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
}

module.exports = sendEmail;
