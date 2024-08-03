import nodemailer from 'nodemailer';

export interface EmailData {
    to: string | string[];
    subject: string;
    text: string;
    html: string;
}

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const templateMailOrder = (data: any) => /*html*/ `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
        }

        .header {
            background-color: #4CAF50;
            color: white;
            padding: 10px 0;
            text-align: center;
        }

        .content {
            padding: 20px;
        }

        .footer {
            text-align: center;
            font-size: 0.9em;
            color: #777;
            padding: 10px;
            border-top: 1px solid #ddd;
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Thank You!</h1>
        </div>
        <div class="content">
            <p>Dear ${data.name},</p>
            <p>Thank you for placing an order with us. We truly
                appreciate your support and hope you had a great experience.</p>
            <p>If you have any questions or need further assistance, please do not hesitate to contact us.</p>
            <p>Best regards,</p>
            <p>Quoc Bao / QB Group</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 QB Group. All rights reserved.</p>
        </div>
    </div>
</body>

</html>
`;
const mailOptions = ({ to, subject, text, html }: EmailData) => ({
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    text: text,
    html: html,
});

export async function sendEmail(data: EmailData) {
    try {
        const info = await transporter.sendMail(mailOptions(data));
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

const templateChangepass = (code: string) => /*html*/ `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
        }

        .header {
            background-color: #007BFF;
            color: white;
            padding: 10px 0;
            text-align: center;
        }

        .content {
            padding: 20px;
        }

        .footer {
            text-align: center;
            font-size: 0.9em;
            color: #777;
            padding: 10px;
            border-top: 1px solid #ddd;
            margin-top: 20px;
        }

        .code {
            display: flex;
            justify-content: center;
            margin: 20px 0;
        }

        .code div {
            width: 40px;
            height: 40px;
            border: 1px solid #007BFF;
            margin: 0 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2em;
            font-weight: bold;
            color: #007BFF;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Password Reset</h1>
        </div>
        <div class="content">
            <p>Dear [Recipient's Name],</p>
            <p>We received a request to reset your password. Please use the following code to reset your password:</p>
            <div class="code">
                ${code
                    .split('')
                    .map((item) => {
                        return `<div>${item}</div>`;
                    })
                    .join('')}
            </div>
            <p>If you did not request a password reset, please ignore this email or contact support if you have
                questions.</p>
            <p>Best regards,</p>
            <p>[Your Name/Company]</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 [Your Company]. All rights reserved.</p>
        </div>
    </div>
</body>

</html>
`;
export const sendMailChangePass = async (to: string, code: string) => {
    try {
        const option = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: 'Change Password',
            text: 'Change Password',
            html: templateChangepass(code),
        };
        const send = await transporter.sendMail(option);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
