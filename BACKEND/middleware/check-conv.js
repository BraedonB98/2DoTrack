const HttpError = require("../models/http-error");

const client = require("twilio")(
  process.env.TwilioApi_SID,
  process.env.TwilioApi_Key
);
const MessagingResponse = require("twilio").twiml.MessagingResponse;

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SendGridApi_Key);

const userController = require("../controllers/user-controller");

module.exports = async (req, res, next) => {
  const twiml = new MessagingResponse();
  let phoneNumber = req.body.From;
  const user = await userController.getUserByProp("phoneNumber", phoneNumber);

  if (!!user.error) {
    twiml.message(
      `Hi , I see you are contacting us from ${phoneNumber}, Unfortunately we cant seem to locate you in our database from this phone number, We look forward to having you as a customer. Please sign up at www.2dotask.com`
    );
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
    return next(new HttpError("user phone number not found in db", 404));
  }

  //adding conversation if the user hasnt started one

  // if(!user.conversationSID){
  // console.log("----------------creating conversation --------------------------")
  // let conversation = await client.conversations.conversations.create({
  //     friendlyName: `${user.name} conversation`})
  // console.log(conversation.sid);
  // try{
  //     user.conversationSID = conversation.sid;
  //     user.save();
  // }
  // catch(error){
  //     twiml.message(`Hi ${user.name} , I see you are contacting us from ${phoneNumber}, Unfortunately we failed to create a new conversation. We apologize and are working hard to fix this issue`);
  //     res.writeHead(200, {'Content-Type': 'text/xml'});
  //     res.end(twiml.toString());
  //     return(next(new HttpError("Could not update user", 500)))
  // }
  // }
  //fetching conversation
  // let conversation = await client.conversations.conversations(user.conversationSID)
  // conversation = await conversation.fetch();
  //  console.log(conversation.chatServiceSid);

  req.userData = user;
  //req.userConversation = conversation;
  next();
};
