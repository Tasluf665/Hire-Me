const dotenv = require('dotenv');

// Load env vars
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: envFile });

const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

console.log(process.env.JWT_PRIVATE_KEY);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
