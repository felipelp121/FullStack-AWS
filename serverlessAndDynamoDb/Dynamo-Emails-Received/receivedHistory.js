module.exports.handler = async (event) => {
  try {
    const AWS = require("aws-sdk");
    const docClient = new AWS.DynamoDB.DocumentClient();
    // const data = JSON.parse(event.body);
    const userEmail = event.pathParameters.email;

    // const userEmail = "felipelopesprog@gmail.com";

    if (!userEmail) throw "Login is required";

    const output = await docClient
      .query({
        TableName: "dynamoReceivedEmail",
        ExpressionAttributeValues: {
          ":e": userEmail,
        },
        KeyConditionExpression: "emailTo = :e",
      })
      .promise();

    if (!output.Items) throw "Received emails not found";
    console.log("OUTUPUT: ", output);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(output.Items),
    };
  } catch (err) {
    if (err === "Login is required" || err === "Received emails not found") {
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(err),
      };
    }
    return {
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(err),
    };
  }
};
