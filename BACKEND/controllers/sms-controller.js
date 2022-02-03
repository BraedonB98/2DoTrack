//--------------------API imports-------------------------
const client = require('twilio')(process.env.TwilioApi_SID, process.env.TwilioApi_Key);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SendGridApi_Key);

//-------------------imports--------------------------
const userController = require('../controllers/user-controller');
//------------------Models------------------------------
const HttpError = require('../models/http-error');
const User = require('../models/user-model');

//const util = require('util')

const smsManager = async (req,res,next)=>{
    const twiml = new MessagingResponse();
    //const phoneNumber = twiml.from;
    phoneNumber = req.body.From;
    console.log(phoneNumber)
    const user = await userController.getUserByProp('phoneNumber',phoneNumber) ;
    console.log(user)
    if(!!user.error){return(next(new HttpError(user.error.message, user.error.code)))}
    //console.log(util.inspect(req.body, {showHidden: false, depth: null, colors: true}))
    console.log(req.body.Body);
    

    twiml.message(`Hi ${user.name}, I see you are contacting us from ${phoneNumber}, thank you for contacting 2do finance we value your business and will try to contact you shortly about your issue with" ${req.body.Body}"`);
  
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
}


exports.smsManager = smsManager;