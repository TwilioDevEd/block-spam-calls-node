<a href="https://www.twilio.com">
  <img src="https://static0.twilio.com/marketing/bundles/marketing/img/logos/wordmark-red.svg" alt="Twilio" width="250" />
</a>

# Block Spam Calls. Powered by Twilio - Node.js/Express
[![Build
Status](https://travis-ci.org/TwilioDevEd/block-spam-calls-node.svg?branch=master)](https://travis-ci.org/TwilioDevEd/block-spam-calls-node)

Learn how to use Twilio add-ons to block spam calls.

## Local development

First you need to install either [Node.js](http://nodejs.org/), which
should also install [npm](https://www.npmjs.com/).

To run the app locally, clone this repository and `cd` into its directory:

1. First clone this repository and `cd` into its directory:
   ```
   git clone https://github.com/TwilioDevEd/block-spam-calls-node.git
   cd block-spam-calls-node
   ```

1. Install dependencies:

    ```
    npm install
    ```

1. Run the application.

    ```
    npm start
    ```

To actually forward incoming calls, your development server will need to be publicly accessible. [We recommend using ngrok to solve this problem](https://www.twilio.com/blog/2015/09/6-awesome-reasons-to-use-ngrok-when-testing-webhooks.html).

Once you have started ngrok, update your TwiML app's voice URL setting to use your ngrok hostname, so it will look something like this:

```
http://88b37ada.ngrok.io/
```

## Run the tests

You can run the tests locally by typing

```
npm test
```

## Meta

* No warranty expressed or implied. Software is as is. Diggity.
* [MIT License](http://www.opensource.org/licenses/mit-license.html)
* Lovingly crafted by Twilio Developer Education.