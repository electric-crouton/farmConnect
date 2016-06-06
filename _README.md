# Project Name

> Farm Connect is a marketplace application that allows small farmers to sell locally grown produce to the public at large. When  farmer lists an item to sell, it becomes available for purchase, and users can buy directly from those farms.

## Team

  - __Product Owner__: Tegan Duong
  - __Scrum Master__: Nathanael Ligon
  - __Development Team Members__: Ben Rachbach, Veena Sridhar

## Table of Contents

1. [Installation](#Installation)
    1. [PostgreSQL](#PostgreSQL)
2. [Requirements](#Requirements)
3. [File Structure: Directory Layout](#File-Structure-Directory-Layout)
4. [Development](#development)
    a. [Installing Dependencies](#installing-dependencies)
    b. [Tasks](#tasks)
5. [Team](#team)
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
  auth/
  config/
  db/
  products/
  package.json
  server.js
```

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
