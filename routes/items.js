let express = require('express');
let router = express.Router();
const models = require('../models')

router.get('/', (req, res) => {
    models.Item.findAll({ 
        order: [
            ['name', 'ASC']
        ] 
    })
    .then(data_item => {
        res.render('item/items', {data_item: data_item, title: 'Items'})
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/add', (req,res) => {
    models.Item.findAll()
    .then(item => {
        res.render('item/item_add', {data_item: item, title: 'New Item'})
    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/add', (req, res) => {
    models.Item.create({
        name: `${req.body.name}`,
        brand: `${req.body.brand}`,
        codeitem: `${req.body.codeitem}`,
        // SupplierId: req.body.SubjectId,
        createdAt: new Date(),
        udpatedAt: new Date()
    })
    .then(items => {
        res.redirect('/items')
    })
    .catch(err => {
        console.log(err)
    })
})

//delete
router.get('/delete/:id', (req,res) => {
    models.Item.destroy({
        where: {
            id: `${req.params.id}`
        }
    })
    .then((rowDeleted) => {
        res.redirect('/items')
    })
    .catch(err => {
        console.log(err)
    })
})

//edit
router.get('/edit/:id', (req,res) => {
    models.Item.findAll({
        where: {
            id: `${req.params.id}`
        }
    })
    .then(item => {
        res.render('item/item_edit',{item: item, title: 'Items Data Edit', })
    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/edit/:id',(req, res) => {
    models.Item.update({
        name: `${req.body.name}`,
        brand: `${req.body.brand}`,
        codeitem: `${req.body.codeitem}`,
        // SupplierId: req.body.SubjectId,
        createdAt: new Date(),
        udpatedAt: new Date()
    }, {
        where: {id: `${req.params.id}`}
    })
    .then(item => {
        res.redirect('/items')
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router