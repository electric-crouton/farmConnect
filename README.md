# Farm Connect

> Farm Connect is a marketplace application that allows small farmers to sell locally grown produce to the public at large. When  farmer lists an item to sell, it becomes available for purchase, and users can buy directly from those farms.

## Team

  - __Product Owner__: [Tegan Duong](https://github.com/teganduong)
  - __Scrum Master__: [Nathanael Ligon](https://github.com/nligon)
  - __Development Team Members__: [Ben Rachbach](https://github.com/brachbach), [Veena Sridhar](https://github.com/veena-sridhar)

## Table of Contents

1. [Installation](#Installation)
    1. [PostgreSQL](#PostgreSQL)
2. [Requirements](#Requirements)
3. [File Structure: Directory Layout](#File-Structure-Directory-Layout)
4. [Setup](#Setup)
    1. [Installing Dependencies](#Installing-Dependencies)
5. [Usage](#Usage)
6. [Roadmap](#Roadmap)
7. [Contributing](#contributing)

##Installation

###PostgreSQL

PostgreSQL supports Mac OS X, Ubuntu, and Windows. To install postgres with Homebrew, run the following command from terminal or any command line interface:

```sh
brew install postgres
```
If using Mac OS X, install the Postgres App by following [this link](http://postgresapp.com/). On Mac, Postgres runs best if you run it using the app, as opposed to running it from the terminal.

## Requirements

- Node 4.4.4
- PostgreSQL 9.5.3

## File Structure: Directory Layout

```sh
client/                                     #client entry point, imports all client code
  app/                                      
    assets/
      css/
        style.css
      img/
        grass-field.jpg
        shopping-cart.png
    controllers/                            
      AddProductsCtrl.js                    #controls addition of products to the marketplace
      AuthCtrl.js                           #controls client side authentication
      CartCtrl.js                           #controls addition and removal for items in shopping cart
      CheckoutCtrl.js                       #controls payment functionality
      ProductsCtrl.js                       #controls item addition to cart
    
    views/                                  #entry point for all presentational components
      about.html                            #about page
      addProductForm.html                   #form for the addition of products to the marketplace
      cart.html                             #shopping cart summary page
      checkoutModal.html                    #payment pop up modal in checkout of cart summary page 
      navBar.html                           #navigation bar
      signin.html                           #sign in page
      signup.html                           #sign up page
    app.js                                  #initializes and loads all angular modules on clientside
    index.html                              
    routes.js                               #client side routing
    services.js                             
                         
server/                                     #entry point for all server code
  auth/                                     #entry point for authentication control
    authController.js                       #controls authentication
  config/
    middlewares/                            
      initialization.js                     #initializes server connection with client
    
    routes.js                               #server-side routing

        initialization.js                   #initializes server connection with client
    assets.json                             #manages dependencies
    routes.js                               #directs various routes within the back end
    utils.js                                #utility function that escapes unwanted characters
  db/                                       #entry point for database and connection
    connection.js                           #establishes connection between server and database
    postsData.js                            #dummy data for posts
    schema.sql                              #defines all tables and relations within the database
    seedDB.js                               #seeds the database with dummy data
  products/
    productsCollection.js                   #controls addition of products to the database
  server.js                                 #entry point file for running the server
```

## Setup

### Installing Dependencies

Clone this repo to your local work station and from within the root directory:

```sh
./install
```
This will install all the necessary dependencies in the client and serverside directories

To seed your database with dummy data, run:
```sh
node server/db/seedDB.js
```


## Usage

Once the dependencies are installed, you can start the application with the following commands. Both the database and the server must be running properly in order for the app to run. First, within the postgres app:

```sh
psql < ABSOLUTE_PATH_ON_YOUR_MACHINE_TO_/Farm-Connect/server/db/schema.sql;
```

And then in a separate tab in your terminal, run this command in the root directory:

```sh
node server/server.js
```

Open your web browser and go to `http://localhost:1337` to see the app running.


##Roadmap

View the project roadmap [here](https://github.com/electric-crouton/Farm-Connect/issues)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
