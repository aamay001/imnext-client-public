# imNext.online Client

This repository contains the client side code for the imNext.online project. The imNext.online project is a self-service appointment scheduling system that enables users to schedule appointments directly with their service providers. The client is written in JavaScript and uses **React and Redux** as the front-end framework.

The API for this project can be found here: [imNext.online API Repository](https://github.com/aamay001/imnext-api)

# Key Features

## Responsive Design

``` https://imnext.online/ ```

![Landing Page](http://andyamaya.com/downloads/imnext.online-Landing1.png)

The imNext.online client features a pure CSS responsive design. The application is designed to work best on a mobile device however, it is fully functional and adapts to larger screens.

## Minimalist Design focused on Functionality and Usability

``` https://imnext.online/appointment ```

![Appointment Scheduling Page](http://andyamaya.com/downloads/imnext.online-Appointment.png)

As an MVP for an appointment scheduling application, the front end is designed to be as user friendly as possible. Service providers can create an account and start taking appointments in as little as a few minutes. Additionally, clients of service providers do not need to create an account to schedule an appointment. 

## Dashboard

``` https://imnext.online/dashboard ```

![Dashboard Page](http://andyamaya.com/downloads/imNext.online-Dashboard1.png)

The service provider dashboard gives a quick view of the appointments for the current day. As time progresses throughout a day, the dashboard automatically displays the next appointment with quick actions to call the client, cancel the appointment, and confirm the appointment. 

## Schedule

``` https://imnext.online/schedule ```

![Service Provider Schedule Page](http://andyamaya.com/downloads/imnext.online-Schedule1.png)

Service providers can see their schedule into the future to see what their upcoming days look like. While in the schedule, the service provider can also use quick actions to call, cancel, or confirm an appointment.

## Quick Setup

``` https://imnext.online/user/settings ```

![Service Provider Settings Page](http://andyamaya.com/downloads/imnext.online-Settings.png)

Service Providers can setup their availability by answering a few questions about their work day. Time slots are made available based on the answers to the settings survey; the Settings page can be accessed after the Service Provider account has been activated.

# Packages and Technologies

+ create-react-app
+ babel-polyfill
+ date-fns
+ react
+ react-autosuggest
+ react-fontawesome
+ react-recaptcha
+ react-redux
+ react-router
+ react-swipeable-views
+ redux
+ redux-thunk
+ enzyme
+ jest
+ redux-logger
+ react-test-renderer
+ netlify
+ travisci

# Clone & Run

``` git clone https://github.com/aamay001/imnext-client.git ```

``` npm install ```

### Optional Environment Variables

Create a **.env** file with the following:

```
REACT_APP_ENV=dev
```

If you don't want to use the .env file, open src\config\settings.js and set the URL property inside of the API object to localhost or your local IP address (do this to access from a mobile device; see also CLIENT_ORIGIN in API project).

### Server

Goes without saying but if you want the app to function, you'll need to have the API server running. See [this](https://github.com/aamay001/imnext-api).

 ### Commands
 
 ```
//Typical create-react-app commands.
npm start | build | test 

// Use this command to apply code style
npm run prettier

 ```
