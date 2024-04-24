const express = require("express");
const APIController = require('../controllers/APIController');
// const identityMiddleware = require('../middlewares/identity');
let router = express.Router();

const initAPIRoute = (app) => {
    router.get('/category', APIController.getAllCategories); // method GET -> READ data
    // router.get('/category', identityMiddleware, APIController.getAllCategories); // method GET -> READ data
    router.post('/create-category', APIController.createCategory); // method POST -> CREATE data
    router.put('/update-category', APIController.updateCategory); //method PUT -> UPDATE data
    router.delete('/delete-category/:id', APIController.deleteCategory); //method DELETE -> DELETE data

    router.get('/sanpham', APIController.getAllSanpham);

    return app.use('/api/v1/', router)
}

module.exports = initAPIRoute; 
