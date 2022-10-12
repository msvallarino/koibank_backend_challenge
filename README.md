# Introduction

This are some notes for running the application locally and play with it, plus some notes and points of improvements.

# Requirements

1. Need to have [Node.js](https://nodejs.org/en/) to be installed. The version used is `16.17.0`.
2. Need to have [MongoDB](https://www.mongodb.com/docs/v6.0/administration/install-community/) installed. The version used is `6.0`. Another option is to use MongDB Atlas, to do so please update the DB values on the file `.env`
3. In the repo root directory, run `npm install` to gather all dependencies.
4. Create a file in the root call `.env` to inject variables to the app, you can use `.env.example` that has all needed values for start playing.
5. Then run `npm start` which should start the server.

# How to test it

The API routes are documented with a OpenAPI definition on a Swagger page that you can find http://localhost:3000/swagger/, there you will find the required Authentication, Query params, Body and Responses. Remember that you need to authenticate using Basic Auth with the following credentials:
```
username: 'test@koibanx.com'
password: 'admin1234'
```

# Improvements

For simplicity of this demo the code was made with room for improvements, those are:

+ Add unit and functional test, only for the Business Logic not all implementation (using Jest and Supertest).
+ Add path aliases (to avoid using imports like '../../')
+ Add dependency injection (could be using a lib like TSyringe).
+ Add Pub/Sub patterns for complex services.
+ Add more logs using the Logger.
+ Create custom errors.
+ Add automatic swagger documentation functionality (opinionated).
