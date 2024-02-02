const template = (name: string, code: string) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 20px;
      }
      .container {
        max-width: 600px;
        margin: auto;
        text-align: left;
      }
      .code {
        font-size: 18px;
        font-weight: bold;
        background-color: #f4f4f4;
        padding: 10px;
        margin-top: 10px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Password Reset for Your Application's Account</h2>
      <p>Dear ${name},</p>
      <p>
        We received a request to reset your password for your account. To
        proceed with the password reset, please use the following code:
      </p>
      <div class="code">Reset Code: ${code}</div>
      <p>To reset your password, follow these steps:</p>
      <ol>
        <li>
          Visit the Your Application login page:
          <a href="https://my-app.com">My App</a>
        </li>
        <li>Click on the "Forgot Password" or "Reset Password" link.</li>
        <li>Enter your email associated with your account.</li>
        <li>Use the provided alphanumeric code when prompted.</li>
        <li>Create a new strong and secure password for your account.</li>
      </ol>
      <p>
        If you did not initiate this password reset request, please ignore this
        email. Your account security is important to us, and no changes will be
        made without your action.
      </p>
      <p>
        This code will expire in 10 minutes, so please reset your
        password promptly.
      </p>
      <p>Thank you,<br />The My App Team</p>
    </div>
  </body>
</html>
`;

export default template;
