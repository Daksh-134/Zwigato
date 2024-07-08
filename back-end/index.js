require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const MongoDB=require("./db")
MongoDB();
app.get('/', (req, res) => {
  res.send('Hello World!')
})
// Cross Origin Resource Sharing
app.use(cors({
  origin: 'https://zwigato-nine.vercel.app'
}));

app.use(express.json())
app.use('/', require("./Routes/DisplayData"));
app.use('/', require("./Routes/CreateUser"));
app.use('/', require("./Routes/OrderData"));
app.listen(port, () => {
  console.log(`Example app listening at port ${port}`)
})