const express = require('express');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('combined'));

app.get('/', (req, res) => {
  const response = {
    response: 'OK',
    message: 'Hello World!',
  };
  res.send(response);
});

app.listen(port, () => console.log('started'));