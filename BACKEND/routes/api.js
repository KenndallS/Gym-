var express = require('express');
var router = express.Router();

var customerController = require('../controllers/customer-controller');
// var healthConditionController = require('../controllers/healthcondition-controller');
// var inscriptionController = require('../controllers/inscription-controller');
// var paymentController = require('../controllers/payment-controller');
// var trainingPlanController = require('../controllers/trainingplan-controller');
// var userController = require('../controllers/user-controller');

/* Rutas del api */
router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.get('/customer/all', (req, res) => {
  customerController.getCustomers(res);
});

router.get('/customer/:id', (req, res) => {
  customerController.getCustomer(res, req.params.id);
});

router.post('/customer/save', (req, res) => {
  customerController.saveCustomer(res, req.body);
});

router.put('/customer/put', (req, res) => {
  customerController.putCustomer(res, req.body);
});

module.exports = router;
