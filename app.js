const dotenv = require("dotenv")
dotenv.config();
const db = require('./config/database');
const express = require('express');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/admin", require("./src/routes/admin/admin_route"));
app.use("/user", require("./src/routes/admin/user_route"));
app.use("/customer", require("./src/routes/public/customer_route"));

// Test DB
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err))


app.get("/", (req, res) => {
    res.send("Hello form API");
});

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}...`);
});