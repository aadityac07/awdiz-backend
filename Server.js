// server.js
const express = require('express');
const path = require('path');
// const invoicesRouter = require('./routes/Invoices');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

app.use('/api/invoices', invoicesRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
