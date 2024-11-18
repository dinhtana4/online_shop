# npm init
This is a command-line instruction used to create a package. json file for a Node. js package.

# npm i express
This is a command-line to install the Express module

# npm i dotenv
Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.

# npm i nodemon -D
nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

# npm i mongoose
Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.

# npm i express-validator
express-validator is a set of express.js middlewares that wraps the extensive collection of validators and sanitizers offered by validator.js.

# npm i bcrypt
bcrypt is a library to help you hash password

# npm i jsonwebtoken
JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object

# npm i concurrently
Run multiple commands concurrently. Like npm run watch-js & npm run watch-less but better.

# npm install cors
CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

# npm install formidable
A Node.js module for parsing form data, especially file uploads.

# npm install uuid
To create a random UUID

# npm install stripe
https://docs.stripe.com/payments/accept-a-payment?lang=node
Register webhook to receive payment progress status from Stripe
https://docs.stripe.com/webhooks/quickstart
stripe login
stripe listen --forward-to localhost:5000/api/payment/webhook
Note: Middlewares like express.json() or body-parser.json() should not be applied globally if they interfere with the Stripe webhook endpoint. You can limit raw body parsing to the webhook route as shown above.