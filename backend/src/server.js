const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const routes = require('./routes')

const app = express()
const port = 3333

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack9-pzby4.mongodb.net/semana09?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
