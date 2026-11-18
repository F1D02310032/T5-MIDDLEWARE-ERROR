require('dotenv').config();

const express = require('express');
const menuRouter = require('./routes/menu');
const { logger } = require('./middleware/logger');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

app.use(logger);
app.use(express.json());
app.use('/menu', menuRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
