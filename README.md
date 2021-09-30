# Weather-Journal App Project

## Table of Contents
* [Project Title](#project-title)
* [Table of contents](#table-of-contents)
* [Instructions](#instructions)
* [Installation](#installation)
* [Extras](#extras)
* [Features](#features)
* [License](#license)
* [Footer](#footer)

## Overview
[(Back to top)](#table-of-contents)

* This project uses an asynchronous web app that uses Web API and user data to dynamically update the UI. 

## Instructions
[(Back to top)](#table-of-contents)

* basic tests run on page load or refresh
* handling of errors is deployed
* 5 test cases are used to check availability and usablility
* each request are debugged by console logging and folding
* empty zip code prompt the user to re-enter without making any updates on the server
* wrong zip code makes the first retrieval but fails then prompt the user that there is an error - without completing the post request
* data object in the server is updated only on successful chaining of requests


## Installation
[(Back to top)](#table-of-contents)

* run `npm install express`
* run `npm install body-parser`
* run `npm install cors`
* run `node server.js`
* open browser on `localhost:3000`

## Extras
[(Back to top)](#table-of-contents)

* `tests.js`: total of 5 tests were provided to crusial facilities of the web app clientside and serverside
* spreaded comments were provided to make code understandable and easy to trace
* console debugging and folding were used to make requests tracable

# Features
[(Back to top)](#table-of-contents)
* `server.js` was modified to provide some basic features that are used by the client side app
* `website/app.js` was modified to create requests for user to a remote server and our local server.
* `index.html` was enhanced by auto-hidden navbar for notifications and warnings
* `style.css` was modified to add some features and to make the layout of the html structure more reliable to be and to style the application to customized perfection.
* design
    * css file was updated to allow extra features
    * html file was updated to provide warnings and messages
    * html and css files were updated to target both mobile and normal browsers

# License
[(Back to top)](#table-of-contents)

&copy Udacity

# Footer
[(Back to top)](#table-of-contents)

finalized By [Hashim Hossam](mailto://computetional.h@gmail.com)