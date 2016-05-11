Dealership Demo
---------------

[![Build Status](https://travis-ci.org/agco-fuse/dealership-demo.svg?branch=master)](https://travis-ci.org/agco-fuse/dealership-demo)
[![Code Climate](https://codeclimate.com/github/agco-fuse/dealership-demo/badges/gpa.svg)](https://codeclimate.com/github/agco-fuse/dealership-demo)
[![License](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://github.com/agco-fuse/dealership-demo/blob/master/LICENSE)

This is a sample application showing how to use the AGCO Fuse API.
It is an web application that displays information about equipements, like the model and the engine hour.

The frontend part of the application is written in [Angular](https://angularjs.org/), which requests the information to our Node webserver.

The [apiservice.js](app/scripts/services/apiservice.js) is the core part that coordinates the information retrieval on the frontend.
It has a set of methods that requests each of the information for a specific equipment.

The [index.js](index.js) is our server entrypoint.
It is called by node to start a webserver listening on http://localhost:8000 by default, and serves our asset files.
It is also responsible to inject the configuration of the endpoints and credentials when rendering the application.

## Setup the development environment

This application requires [node](https://nodejs.org/en/) to be installed.

After cloning the project, run `npm install` and it should get the dependencies installed.

This web application requires a webserver with some environment variables setup to retrieve the informations on the API.

### Environment variables

The following environment variables must be set

- **OPENAM_USERNAME**: Your dev@agco login email
- **OPENAM_PASSWORD**: Your dev@agco password
- **API_ID**: Your dev@agco API id
- **API_SECRET**: Your dev@agco API secret

## Running the application

The following command can be used to run the demo app:

```
$ OPENAM_USERNAME=your_email OPENAM_PASSWORD=your_password API_ID=your_id API_SECRET=your_secret npm start
```

## Deploying on Heroku PAAS

For a simpler example run, you can deploy this application on Heroku just by clicking on the button bellow:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Or by visiting this [URL](https://heroku.com/deploy?template=https://github.com/agco-fuse/dealership-demo-node)

It will prompt you for the credential information to access the API, and it will deploy a new application just for you.
