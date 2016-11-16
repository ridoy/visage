# VandyHacks 3 Project

For the curious, I have added some setup instructions below for testing out Visage:

# Setting up the server

1. Have node.js installed
2. `cd visage/server/`
3. `npm install`
4. Make a Twilio account and get auth credentials: account SID, auth token, and a Twilio number. Set these as `ACCOUNT_SID`, `ACCOUNT_TOKEN`, and `TWILIO_PHONE` in your environment variables respectively.
5. Grab the AT&T Database of Faces from http://www.cl.cam.ac.uk/research/dtg/attarchive/facedatabase.html and unzip it
6. Move the folder of pictures of Matts face (in `visage/server/s41/`) into `visage/server/att_faces/`
7. Run `./create_csv att_faces/ > faces.csv`
8. Create an `upload` directory: `mkdir upload`
9. `npm start` to run the server
10. In order for the Chrome extension to make POST requests to the server, the server needs to have a public URL. I recommend using ngrok for this: https://ngrok.com/.
11. Install ngrok and run `ngrok http 8080`. Copy the URL that is outputted for setting up the chrome extension.

# Setting up the Chrome extension

1. Open `visage/extension/js/main.js` and initialize the `serverURL` variable on line 1 to the ngrok URL from before.
2. Open Google Chrome and navigate to `chrome://extensions/`
3. If not checked already, select "Developer Mode" and click the "Load unpacked extension..." button which appears. This opens a file browser.
4. Navigate to visage and select the `extension/` directory.

Now you should be ready to run Visage. Click the icon and see if you can log in as Matt >:)

# Need help?

If you have any questions feel free to email me at ridoy@gatech.edu :)
