/* handler.js */

"use strict";

module.exports.hello = async (event) => {
  try {
    const response = {
      statusCode: 200,
      body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
  } catch (error) {
    return {
      statusCode: 400,
    };
  }
};