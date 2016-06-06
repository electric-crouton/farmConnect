# Project Name

> Farm Connect is a marketplace application that allows small farmers to sell locally grown produce to the public at large. When  farmer lists an item to sell, it becomes available for purchase, and users can buy directly from those farms.

## Team

  - __Product Owner__: Tegan Duong
  - __Scrum Master__: Nathanael Ligon
  - __Development Team Members__: Ben Rachbach, Veena Sridhar

## Table of Contents

1. [Installation](#Installation)
    a. [PostgreSQL](#PostgreSQL)
2. [Requirements](#Requirements)
3. [File Structure: Directory Layout](#File-Structure-Directory-Layout)
4. [Setup](#Setup)
    a. [Installing Dependencies](#Installing-Dependencies)
5. [Usage](#Usage)
6. [Contributing](#contributing)

##Installation

###PostgreSQL

PostgreSQL supports Mac OS X, Ubuntu, and Windows. To install postgres with Homebrew, run the following command from terminal or any command line interface:

```sh
brew install postgres
```
If using Mac OS X, install the Postgres App by following [this link](http://postgresapp.com/). On Mac, Postgres runs best on the app, as opposed to regular terminal.

## Requirements

- Node 4.4.4
- Angular 1.0
- PostgreSQL 9.5.3

## File Structure: Directory Layout

```sh
client/                                     #client entry point, imports all client code
  app/                                      #contains all styling and images that are used in the app
    assets/
      css/
        style.css
      img/
        grass-field.jpg
        shopping-cart.png
    controllers/                            #controllers for each feature on the client side
      AddProductsCtrl.js                    #controls addition of products to the marketplace
      AuthCtrl.js                           #controls client side authentication
      CartCtrl.js                           #controls addition and removal for items in shopping cart
      CheckoutCtrl.js                       #controls payment functionality
      ProductsCtrl.js                       #controls item addition to cart
    lib/                                    #contains important client side dependencies
    views/                                  #entry point for all presentational components
      about.html                            #markup for the about page
      addProductForm.html                   #markup for the addition of products to the marketplace
      cart.html                             #markup for the shopping cart
      checkoutModal.html                    #markup for the payment pop up modal 
      navBar.html                           #markup for the navigation bar
      signin.html                           #markup for the sign in page
      signup.html                           #markup for the sign up page
    app.js                                  #initializes all angular modules on front end
    index.html                              #main markup that includes all controller js files
    routes.js                               #implements client side routing
    services.js                             #responsible for sending get and post requests from client
    bower.json                              #manages angular and bootstrap dependencies 
    package.json                            #manages testing and protractor dependencies
server/                                     #entry point for all server code
  auth/                                     #entry point for authentication control
    authController.js                       #controls authentication
  config/
    middlewares/                            #initializes server connection with client
        initialization.js
        logging.js
    assets.json                             #manages dependencies
    routes.js                               #directs various routes within the back end
    utils.js                                #utility function that escapes unwanted characters
  db/                                       #entry point for database and connection
    connection.js                           #establishes connection between server and database
    data.js                                 #dummy data for users
    postsData.js                            #dummy data for posts
    schema.sql                              #defines all tables and relations within the database
    seedDB.js                               #seeds the database with dummy data
  products/
    productsCollection.js                   #controls addition of products to the database
  package.json                              #manages server side dependencies
  server.js                                 #entry point file for running the server
```

## Setup

### Installing Dependencies

Clone this repo to your local work station and from within the root directory:

```sh
./install
```

## Usage

Once the dependencies are installed and configuration keys are setup, you can start the application with the following commands. First, within the postgres app:

```sh
psql < <FILE_PATH_TO_YOUR_SCHEMA.SQL_FILE>
```

And then from inside the command line in the root directory:

```sh
node server/server.js
```

Open your web browser and go to `http://localhost:1337` to see the app running.


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
