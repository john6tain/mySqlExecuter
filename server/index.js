const express = require('express');

const app = express();
require('./express')(app);
require('./router')(app);
const port = process.env.PORT || 1337;

app.listen(port, () => console.log(`Server is running on ${port}`));


