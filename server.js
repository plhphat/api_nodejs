const express = require('express');
const initAPIRoute = require('./routes/api');
const app = express();
app.use(express.json());
const port = 3000;

initAPIRoute(app);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
