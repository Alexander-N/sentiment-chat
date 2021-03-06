import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const language = require("@google-cloud/language");

admin.initializeApp();
const client = new language.LanguageServiceClient();

exports.addSentimentInfo = functions
  .region("europe-west2")
  .firestore.document("messages/{messageId}")
  .onCreate(async message => {
    const messageData = message.data();
    let messageText;
    if (messageData) {
      messageText = messageData.text;
    } else {
      console.error("No data could be retrieved from message:", message);
    }
    console.log("Retrieved message content: ", messageText);

    const document = {
      content: messageText,
      type: "PLAIN_TEXT"
    };

    const [result] = await client.analyzeSentiment({
      document: document,
      encodingType: "UTF8"
    });
    const sentiment = result.documentSentiment;

    return message.ref.update({
      sentiment: sentiment.score
    });
  });
