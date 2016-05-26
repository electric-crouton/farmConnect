const express = require ('express');
const app = express();
const productsController = ('./products/')

app.use(express.static(__dirname + '/../public'));

app.get('api/products', productsController.search);
app.push('api/products', productsController.post);

app.listen(1337);