const express = require('express')
const app = express()
const bodyParser = require('body-parser');  


app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(express.static('public'))

//==================Call Routes===============================//
let index = require('./routes/index.js')
let items = require('./routes/items.js')
let suppliers = require('./routes/suppliers.js')
// let students = require('./routes/students.js')

// ===================== routing =================================//
app.use('/', index)
app.use('/items', items)
app.use('/suppliers', suppliers)
// app.use('/students', students)
// =================== end of routing  ========================== //


app.listen(process.env.PORT || 3020, function () {
    console.log('Example app listening on port 3020!')
})