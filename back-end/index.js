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
  origin: 'http://localhost:5173'
}));

app.use(express.json())
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/OrderData"));
app.listen(port, () => {
  console.log(`Example app listening at port ${port}`)
})