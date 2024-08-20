const express = require("express");
const app = express();

const productRoute = require('./Routes/Products')
app.use(express.json());

app.use('/categories', productRoute);

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log(`I'm listing at 3000`);
});
