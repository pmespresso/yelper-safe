# Yelper **DEVELOPMENT**
A series of ways to use Yelp as an Alexa Skill for the Amazon Echo/Tap/Dot. 


## Introduction

Yelper is a series of ways to use Yelp on your Amazon Echo device. It is meant as a foundation to keep building more and more convenient uses for Yelp on a brand new platform that is neither web nor mobile. 

### Example Dialog

User: "Alexa, open Yelper"

Echo: "For a Yelp reviewed restaurant recommendation, tell me you are hungry"

User: "I am hungry"

Echo: "You should check out Tadu Ethiopian. They have Ethiopian food. Would you like to hear more about Tadu Ethiopian?"

---------------------- TO DO ------------------------------
User: "Nah"

Echo: "You could also try Da Lian. They have Chinese food."

User: "Show me more"

Echo: "Today's specials at Da Lian are Sweet and Sour Chicken and Siu Mai. Would you like a menu?"

User: "Yes"

Da Lian's menu get's sent to the user's phone. 

Echo: "Would you like to give them a call?"

User: "Yes"

Echo: "Calling...." 

Call is routed between the user and the Echo with Twilio. 


## Setup

To run on local server, 

0.5 Have the latest versions of npm and node installed on your system. 

1. Set up alexa-app-server from 
https://github.com/matt-kruse/alexa-app-server

  * This will allow for quick local development before testing with an actual Echo.

2. Pull my entire repo and save it in alexa-app-server/examples/apps/

3. Run npm install

4. Create your own api_key.js file and set your unique Yelp API credentials as module.exports variables. This just keeps my key safe. 

5 (Optional). Now to test locally, change directories to alexa-app-server/ and run node server.js from terminal.  

## For AWS Lambda Functions

To try the skill on your own Echo device, set up a AWS Lambda Function. 

1. Sign in to AWS console on http://aws.amazon.com/ 
2. On top right of the nav bar in the console, select US East (N. Virginia) as your location.
3. Select Lambda under *Compute* in the console. It should be orange. 
4. Click *Create a Lambad function*. It should be blue. 
5. Skip the *Select blueprint* part. 
6. Give this a name. I named it something very dull to spur the imagination.
  * Give it a description. "Do crazy Yelp stuff with Echo"
  * Select Runtime as Node.js
  * Select the Upload zip file option in *Code entry type*
  * Leave Handler as index.handler
  * Set Role as Basic execution role
  * Select Next. Another blue button
7. Now go to the Event Sources tab. 
  * Select Add event source
  * Our event source here is Alexa Skills Kit
  * Hit save. 
8. Copy and save the ARN on the top right corner. We'll need it to create our Alexa Skill. 

## To Create and Alexa Skill

1. Go to https://developer.amazon.com/edw/home.html#/
  * Select Alexa Skills Kit

2. Click the Add a New Skill button. Should be a big yellow button.

3. Here we give the skill a name. It needs to be set to Yelper, unless you decided to change the name in the code. 
  * Invocation Name is also yelper
  * EndPoint should be set to the ARN we copied earlier. 
  * Hit Save. Go on to next.

4. Intent Schema
``` 
{
	"intents": [
		{
			"intent": "hungry",
			"slots": []
		}
	]
}
```

5. Sample Utterances

``` 
hungry hungry
hungry I'm hungry
hungry I am hungry
hungry show me more
hungry so hungry
hungry I'm starving

 ```
6. Go to Test.
  * Enter Utterance: "ask yelper". 

7. If the test passes, you should be able to try it on your device to. 
  * Say, "Alexa, open yelper"
  * Dialogue begins



