import cron from 'node-cron';
import dotenv from 'dotenv';
import twilio from 'twilio';
import messages from './messages.js';
dotenv.config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const currentMessage = 0;

function sendMessage() {
  client.messages
    .create({
      body: messages[currentMessage],
      from: '+17707623141',
      to: process.env.PHONE_NUMBER,
    })
    .then((message) => {
      currentMessage++;
      console.log(message.sid);
    });
}

cron.schedule('* * * * ', () => {
  //   sendMessage();
  console.log('Message sent!');
});
