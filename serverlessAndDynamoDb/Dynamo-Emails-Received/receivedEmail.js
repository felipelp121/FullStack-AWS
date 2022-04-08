module.exports.handler = async (event) => {
  try {
    const AWS = require("aws-sdk");
    const docClient = new AWS.DynamoDB.DocumentClient();

    const data = JSON.parse(event.body);
    const text = data.text;
    const email = data.email;
    const subject = data.subject;
    const userEmail = data.userEmail;
    const userName = data.userName;
    const messageId = data.messageId;

    if (!(text && email && subject)) throw "Need Params";
    if (!(userEmail && userName)) throw "Login is required";

    console.log("EVENT2: ", JSON.stringify(event));
    console.log(
      "EMAIL2: ",
      JSON.stringify(text, email, subject, userEmail, userName)
    );

    await docClient
      .put({
        TableName: "dynamoReceivedEmail",
        Item: {
          emailTo: email,
          messageId: messageId,
          emailFrom: userEmail,
          userName: userName,
          subject: subject,
          message: text,
        },
      })
      .promise();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify("Email processed succesfully!"),
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
      body: err,
    };
  }
};
