let express = require('express');
let router = express.Router();
const models = require('../models')

router.get('/', (req, res) => {
    models.Suppliers.findAll({ 
        order: [
            ['name', 'ASC']
        ] 
    })
    .then(data_supplier => {
        res.render('supplier/suppliers', {data_supplier: data_supplier, title: 'Suppliers'})
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/add', (req,res) => {
    models.Suppliers.findAll()
    .then(supplier => {
        res.render('supplier/supplier_add', {data_supplier: supplier, title: 'New Supplier'})
    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/add', (req, res) => {
    models.Suppliers.create({
        name: `${req.body.name}`,
        kota: `${req.body.kota}`,
        // ItemId: req.body.ItemId,
        createdAt: new Date(),
        udpatedAt: new Date()
    })
    .then(suppliers => {
        res.redirect('/suppliers')
    })
    .catch(err => {
        console.log(err)
    })
})

//delete
router.get('/delete/:id', (req,res) => {
    models.Suppliers.destroy({
        where: {
            id: `${req.params.id}`
        }
    })
    .then((rowDeleted) => {
        res.redirect('/suppliers')
    })
    .catch(err => {
        console.log(err)
    })
})

//edit
router.get('/edit/:id', (req,res) => {
    models.Suppliers.findAll({
        where: {
            id: `${req.params.id}`
        }
    })
    .then(supplier => {
        res.render('supplier/supplier_edit',{supplier: supplier, title: 'Suppliers Data Edit', })
    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/edit/:id',(req, res) => {
    models.Suppliers.update({
        name: `${req.body.name}`,
        kota: `${req.body.kota}`,
        // ItemId: req.body.ItemId,
        createdAt: new Date(),
        udpatedAt: new Date()
    }, {
        where: {id: `${req.params.id}`}
    })
    .then(supplier => {
        res.redirect('/suppliers')
    })
    .catch(err => {
        console.log(err)
    })
})

//routes related to item
router.get('/:id/additem', (req,res) => {
    models.Suppliers.findAll({
        where: {
            id: `${req.params.id}`
        }
    })
    .then(supplier => {
        models.Item.findAll()
        .then(item => {
            res.render('supplier/supplier_add_item', {data_supplier: supplier, data_item: item, title: 'Add Item To Supplier'})
        })
        .catch(err => {
            console.log(err)
        })
    })
    .catch(err => {

    })
})

router.post('/:id/additem', (req,res) => {
    models.SupplierItem.create({
        SupplierId: `${req.params.id}`,
        ItemId: `${req.body.ItemId}`,
        createdAt: new Date(),
        updateAt: new Date()
    })
    .then(supplier => {
        res.redirect('/suppliers')
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router