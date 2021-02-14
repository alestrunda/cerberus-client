# Cerberus Client

Web app to track financial operations. Everyone should track incomes and expenses. The app tracks also debts and that's vital for freelancing.

This is the front-end part, there is also back-end [cerberus-server](https://github.com/alestrunda/cerberus-server) using mongoDB to store the data. Web app is build on react - typescrip, apollo - graphql and sass for styling.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Design inspiration from: pixelbuddha.net

## App sample

Online [client](https://cerberus-client.netlify.com/), [server](https://cerberus-server2.herokuapp.com/) (with sample data).

![screen](http://files.alestrunda.cz/cerberus/screen.jpg)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run cypress:open` and `npm run cypress:run`

Run Cypress for E2E tests. It makes changes in the db, so you better run them isolated - I recommend running new mongodb just for the test purpose, set one up by using docker - something like `docker run -d -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin -p 27017:27017 mongo`.

### `npm run build`

Builds the app for production to the `build` folder.
