const sesAccessKey = process.env.ACESS_KEY_EMAIL;
const sesSecretKey = process.env.SECRET_KEY_EMAIL;

module.exports.handler = async (event) => {
  try {
    const nodemailer = require("nodemailer");
    const AWS = require("aws-sdk");
    const docClient = new AWS.DynamoDB.DocumentClient();

    const data = JSON.parse(event.body);
    const text = data.text;
    const email = data.email;
    const subject = data.subject;
    const userEmail = data.userEmail;
    const userName = data.userName;

    if (!(text && email && subject)) throw "Need Params";
    if (!(userEmail && userName)) throw "Login is required";

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: sesAccessKey,
        pass: sesSecretKey,
      },
    });

    const mailOptions = {
      from: "felipelopesdev14@gmail.com",
      to: `${email}`,
      subject: `${subject}`,
      text: `${text}`,
    };

    const response = await transporter.sendMail(mailOptions);
    const responseId = response.messageId;
    console.log("EVENT: ", JSON.stringify(event));
    console.log("EMAIL: ", JSON.stringify(response));

    await docClient
      .put({
        TableName: "projectDynamo",
        Item: {
          userId: userEmail,
          emailTo: responseId,
          userName: userName,
          subject: subject,
          message: text,
          emailTo2: email,
        },
      })
      .promise();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(responseId),
    };
  } catch (err) {
    if (err === "Need Params" || err === "Login is required") {
      return {
        statusCode: 401,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(err),
      };
    }
    return {
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: "Error unexpected",
    };
  }
};
