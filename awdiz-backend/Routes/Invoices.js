// routes/invoices.js
const express = require('express');
const calculateInvoice = require('../utils/calculateInvoice');

const router = express.Router();

let invoiceItems = [
    { id: 1, quantity: 0, costPrice: 0, margin: 0, discount: 0, tax: 0, totalAmount: 0 },
];

// GET all invoices
router.get('/', (req, res) => {
    res.json(invoiceItems);
});

// POST add a new invoice item
router.post('/', (req, res) => {
    const newItem = req.body;
    newItem.id = invoiceItems.length + 1;
    invoiceItems.push(newItem);
    res.json(newItem);
});

// GET calculate and get the total sales price
router.get('/total-sales-price', (req, res) => {
    const totalAmount = invoiceItems.reduce((total, item) => total + calculateInvoice(item), 0);
    res.json({ totalSalesPrice: totalAmount.toFixed(2) });
});

module.exports = router;
