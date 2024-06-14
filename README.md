# fastify-nodejs-application

[![Node CI](https://github.com/hexlet-boilerplates/fastify-nodejs-application/workflows/Node%20CI/badge.svg)](https://github.com/hexlet-boilerplates/fastify-nodejs-application/actions)

[![Maintainability](https://api.codeclimate.com/v1/badges/2b89897de437d3b8cb00/maintainability)](https://codeclimate.com/github/SvetlanaZinovkina/fullstack-javascript-project-6/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/2b89897de437d3b8cb00/test_coverage)](https://codeclimate.com/github/SvetlanaZinovkina/fullstack-javascript-project-6/test_coverage)

# Task Manager Project

This project is a task manager built using Fastify and Pug.

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Linting](#linting)
- [Deployment](#deployment)
- [Built With](#built-with)
- [License](#license)

## Installation

Clone the repository and install dependencies:
```
git clone git@github.com:SvetlanaZinovkina/fullstack-javascript-project-6.git
cd <project-folder>
npm install
```
## Setup

Create a `.env` file based on `.env.example`:
```
cp .env.example .env
```
Update the `.env` file with your configuration.

## Running the Application

### Development

Start the backend (API):
```
npm run start-backend
```
This will start the Fastify server:
```
fastify start server/plugin.js -l debug -P -o -a 0.0.0.0
```
In another terminal, start the frontend (Webpack):
```
npm run start-frontend
```
This will run Webpack in watch mode:
```
npx webpack --watch --progress
```
### Production

To run the application in production mode:
```
npm start
```
This will start the Fastify server in production mode.

## Testing

To run tests:
```
npm test
```
## Linting

Lint your code:
```
npm run lint
```
## Deployment

The application is deployed at https://taskmanagerz.onrender.com

## Built With

- Fastify
- Pug
- Webpack
- Jest
