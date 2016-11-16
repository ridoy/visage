# VandyHacks 3 Project

# Setting up the server

1. Have node.js installed
2. `cd visage/server/`
3. `npm install`
4. Make a Twilio account and get auth credentials: account SID, auth token, and a Twilio number. Set these as `ACCOUNT_SID`, `ACCOUNT_TOKEN`, and `TWILIO_PHONE` in your environment variables respectively.
5. Grab the AT&T Database of Faces and unzip it
6. Move the folder of pictures of Matts face (in `visage/server/s41/`) into `visage/server/att_faces/`
7. Run `./create_csv att_faces/ > faces.csv`
8. `npm start` to run the server
9. In order for the Chrome extension to make POST requests to the server, the server needs to have a public URL. I recommend using ngrok for this: https://ngrok.com/.

# Setting up the Chrome extension

1. Install ngrok and run `ngrok http 8080`. Copy the URL that is outputted.
2. Open `visage/extension/js/main.js` and initialize the `serverURL` variable on line 1 to the ngrok URL.
3. Open Google Chrome and navigate to `chrome://extensions/`
4. If not checked already, select "Developer Mode" and click the "Load unpacked extension..." button which appears. This opens a file browser.
5. Navigate to visage and select the `extension/` directory.

# Help me lol

If you have any questions feel free to email me at ridoy@gatech.edu :)
