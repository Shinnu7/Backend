const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
var corsOptions = {
    origin: 'http://localhost:5173',
    method: "GET,POST,PUT,DELETE",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
const router = require('./router')
app.use('/things', router)
app.get('/', (req, res) => {
    res.send("hello ji ...")
})
app.listen(4001, () => {
    console.log(`server is running at http://localhost:4001`)
})