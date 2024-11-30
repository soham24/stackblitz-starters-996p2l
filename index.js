const express = require('express');
const cors = require('cors');
const app = express();
const port = 3010;

app.use(cors());

const discountPercentage = 10;
const taxRate = 5;
const loyaltyRate = 2;

app.get('/cart-total', (req, res) => {
  const newItemPrice = parseFloat(req.query.newItemPrice);
  const cartTotal = parseFloat(req.query.cartTotal);
  const totalCartValue = newItemPrice + cartTotal;
  res.send(totalCartValue.toString());
});

app.get('/membership-discount', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  const isMember = req.query.isMember === 'true';
  let finalPrice = cartTotal;
  if (isMember) {
    finalPrice = cartTotal - (cartTotal * discountPercentage) / 100;
  }
  res.send(finalPrice.toString());
});

app.get('/calculate-tax', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  const tax = (cartTotal * taxRate) / 100;
  res.send(tax.toString());
});

app.get('/estimate-delivery', (req, res) => {
  const shippingMethod = req.query.shippingMethod.toLowerCase();
  const distance = parseFloat(req.query.distance);
  let deliveryDays = 0;

  if (shippingMethod === 'standard') {
    deliveryDays = Math.ceil(distance / 50);
  } else if (shippingMethod === 'express') {
    deliveryDays = Math.ceil(distance / 100);
  } else {
    return res.status(400).send('Invalid shipping method');
  }

  res.send(deliveryDays.toString());
});

app.get('/shipping-cost', (req, res) => {
  const weight = parseFloat(req.query.weight);
  const distance = parseFloat(req.query.distance);
  const shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

app.get('/loyalty-points', (req, res) => {
  const purchaseAmount = parseFloat(req.query.purchaseAmount);
  const loyaltyPoints = purchaseAmount * loyaltyRate;
  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
