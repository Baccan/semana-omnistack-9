const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()
const port = 3333

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack9-pzby4.mongodb.net/semana09?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(express.json())
app.use(routes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
