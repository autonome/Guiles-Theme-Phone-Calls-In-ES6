var express = require('express');
var Twilio = require('twilio');

// Account SID and auth token are stored in environment variables.

var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;

var twilio = new Twilio(accountSid, authToken);

var app = express();

app.use('/static', express.static('www'));

app.post('/voice', function(req, res) {
  console.log('Call received.');

  // Set the url of the song we are going to play
  var songUrl = 'https://' + req.headers.host + '/static/hello-it.mp3';

  // Generate a TwiML response
  var VoiceResponse = Twilio.twiml.VoiceResponse;
  var voiceResponse = new VoiceResponse();
  
  // Set the response type as XML.
  res.header('Content-Type', 'text/xml');

  // Play mp3 over the phone.
  voiceResponse.play(songUrl);

  // Send the TwiML as the response.
  res.send(voiceResponse.toString());
});

// Make our Express server listen on port 3000.
app.listen(3000, function() {
  console.log('Listening at http://localhost:3000')
});
