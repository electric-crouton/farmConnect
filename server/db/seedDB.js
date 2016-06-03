var productsCollection = require('../products/productsCollection.js');

var dummyData = [
  {
    farmName: "Old McDonald's Farm",
    farmLocation: "Marin",
    farmPhone: "2223334444",
    productName: "apples",
    pricePerPound: 10,
    poundsAvailable: 5
  },
  {
    farmName: "Old McDonald's Farm",
    farmLocation: "Marin",
    farmPhone: "2223334444",
    productName: "carrots",
    pricePerPound: 3,
    poundsAvailable: 20
  },
  {
    farmName: "Uncle Bob's Farm",
    farmLocation: "Marin",
    farmPhone: "5556667777",
    productName: "carrots",
    pricePerPound: 4.99,
    poundsAvailable: 40
  },
  {
    farmName: "Uncle Bob's Farm",
    farmLocation: "Marin",
    farmPhone: "5556667777",
    productName: "lettuce",
    pricePerPound: 3.99,
    poundsAvailable: 30
  },
];

dummyData.forEach((post, index) => {
  setTimeout(() => productsCollection.handlePost({body: post}, null), index * 200);
});

setTimeout(process.exit, dummyData.length * 200);

//this is quite hacky. But the less hacky solutions I can think of are much more complicated and require making changes to productsCollection.js.